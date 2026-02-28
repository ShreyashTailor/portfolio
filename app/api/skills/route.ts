import { getSkills, saveSkill, deleteSkill, Skill } from "@/lib/db";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
    const skills = await getSkills();
    return NextResponse.json(skills);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { name, category } = body;

    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const newSkill: Skill = {
        id: randomUUID(),
        name,
        category: category || 'other'
    };

    await saveSkill(newSkill);
    return NextResponse.json(newSkill);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await deleteSkill(id);
    return NextResponse.json({ success: true });
}
