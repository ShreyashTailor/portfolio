"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Code2, Wifi, Shield, Terminal, FolderKanban } from "lucide-react";

const iconMap: Record<string, any> = {
    "Shield": Shield,
    "Cpu": Cpu,
    "Wifi": Wifi,
    "Code2": Code2,
    "Terminal": Terminal,
    "default": FolderKanban
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-4">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white">PROJECT_ARCHIVE</h2>
                <span className="font-mono text-primary animate-pulse hidden md:block">/// ACCESSING DATABASE...</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.length > 0 ? (
                    projects.map((project) => {
                        const Icon = iconMap[project.iconName] || iconMap["default"];
                        return (
                            <Card key={project.id} className="group bg-black/50 border-white/10 rounded-sm hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,60,0.15)] overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Icon className="w-8 h-8 text-primary" />
                                </div>
                                <CardHeader>
                                    <CardTitle className="font-display text-xl tracking-wide group-hover:text-primary transition-colors">
                                        {project.title}
                                    </CardTitle>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tags.map((tag, j) => (
                                            <span key={j} className="text-[10px] uppercase font-mono text-muted-foreground border border-white/10 px-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <CardDescription className="text-gray-400 font-mono text-xs leading-relaxed">
                                        {project.desc}
                                    </CardDescription>
                                    <Button size="sm" variant="outline" className="w-full border-white/20 hover:bg-white hover:text-black font-mono text-xs" asChild>
                                        <Link href={project.link} target="_blank">EXECUTE_DEMO</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="col-span-3 text-center text-muted-foreground font-mono">LOADING_PROJECTS...</div>
                )}
            </div>
        </div>
    );
}
