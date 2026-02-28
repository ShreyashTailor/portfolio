import { getProjects, saveProject, deleteProject, Project } from "@/lib/db";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, desc, link, tags, iconName } = body;

    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newProject: Project = {
        id: randomUUID(),
        title,
        desc: desc || '',
        link: link || '#',
        tags: tags || [],
        iconName: iconName || 'Code2'
    };

    await saveProject(newProject);
    return NextResponse.json(newProject);
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await deleteProject(id);
    return NextResponse.json({ success: true });
}
