import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getEmails, deleteEmail, markAsRead } from "@/lib/db";

// Middleware-like check
async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");
    return session?.value === "true";
}

export async function GET() {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const emails = await getEmails();
    return NextResponse.json(emails);
}

export async function DELETE(req: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    await deleteEmail(id);
    return NextResponse.json({ success: true });
}

export async function PATCH(req: Request) {
    if (!await isAuthenticated()) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await req.json();
    await markAsRead(id);
    return NextResponse.json({ success: true });
}
