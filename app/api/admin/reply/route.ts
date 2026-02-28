import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import { saveEmail } from "@/lib/db";

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (session?.value !== "true") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { to, subject, message, originalId } = await req.json();

        // 1. Send via Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: subject,
            text: message,
        });

        // 2. Save to Sent Folder in JSON DB
        await saveEmail({
            id: Date.now().toString(),
            from: "ME (Admin)",
            subject: subject,
            message: message,
            date: new Date().toISOString(),
            folder: 'sent',
            read: true
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Reply Error:", error);
        return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
    }
}
