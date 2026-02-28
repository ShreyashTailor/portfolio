import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { senderEmail, subject, message } = await req.json();

        // Validate inputs
        if (!senderEmail || !subject || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Transporter (Requires env vars)
        // For now, if no env vars are present, we'll log it and pretend it succeeded for the demo
        // but strict mode would fail.
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or use 'host' and 'port' for custom SMTP
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Helps with some local dev issues, purely optional
            }
        });

        // Email Options
        const mailOptions = {
            from: senderEmail, // This might be overwritten by the SMTP server to the authenticated user
            to: 'shreyash@certiswift.in',
            subject: `[PORTFOLIO UPLINK] ${subject}`,
            text: `FROM: ${senderEmail}\n\nMESSAGE:\n${message}`,
            html: `
        <div style="font-family: monospace; background: #000; color: #0f0; p: 20px;">
          <h2>⚠️ SECURE TRANSMISSION RECEIVED</h2>
          <p><strong>UPLINK IDENTITY:</strong> ${senderEmail}</p>
          <p><strong>SUBJECT:</strong> ${subject}</p>
          <hr style="border-color: #0f0;">
          <pre>${message}</pre>
        </div>
      `,
        };

        // If env vars are missing, we simulate success for the user to see the UI flow
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("⚠️ EMAIL SIMULATION (Missing Credentials) ⚠️");
            console.log(mailOptions);
            return NextResponse.json({ success: true, message: 'Simulation: Email logged to console.' }, { status: 200 });
        }

        // Send Email
        await transporter.sendMail(mailOptions);

        // Save to Local DB (Backup/Admin Panel)
        const { saveEmail } = await import('@/lib/db');
        await saveEmail({
            id: Date.now().toString(),
            from: senderEmail,
            subject: subject,
            message: message,
            date: new Date().toISOString(),
            folder: 'inbox',
            read: false
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json(
            { error: 'Failed to transmit payload.' },
            { status: 500 }
        );
    }
}
