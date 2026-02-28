"use client";

import { useEffect, useState } from "react";
import { Skill } from "@/lib/db";

export default function AboutPage() {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await fetch("/api/skills");
                const data = await res.json();
                // If no skills in DB/API yet, fallbacks might be handled in API or just empty
                if (Array.isArray(data)) {
                    setSkills(data);
                }
            } catch (error) {
                console.error("Failed to fetch skills", error);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-sm blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative border border-primary/20 bg-black/90 p-8 rounded-sm">
                        <div className="flex items-center justify-between mb-6 border-b border-primary/20 pb-4">
                            <span className="text-primary font-mono text-sm">USER_PROFILE.EXE</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="space-y-4 font-mono text-sm md:text-base text-muted-foreground">
                            <p>
                                &gt; IDENTIFIER: Shreyash Tailor<br />
                                &gt; ROLE: DevOps Engineer<br />
                                &gt; LOCATION: India<br />
                                &gt; STATUS: Available for Hire
                            </p>
                            <p className="pt-4 border-t border-primary/10">
                                &gt; BIO: Cloud-native engineer and automation specialist.
                                I design secure, scalable infrastructure to keep systems online 24/7.
                                Optimizing pipelines, securing containers, and managing the cloud.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="font-display text-4xl font-bold text-white mb-8 border-l-4 border-primary pl-4">
                        SYSTEM_SKILLS
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.length > 0 ? (
                            skills.map((skill) => (
                                <span key={skill.id} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs font-mono hover:bg-primary hover:text-black transition-colors cursor-default">
                                    {skill.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-muted-foreground text-sm font-mono">LOADING_DATA...</span>
                        )}
                    </div>
                    <div className="p-4 border border-secondary/20 bg-secondary/5 rounded-sm">
                        <h3 className="text-secondary font-display text-xl mb-2">CURRENT_FOCUS</h3>
                        <p className="text-muted-foreground text-sm font-mono">
                            Mastering Kubernetes orchestration, Multi-Cloud Architecture, and DevSecOps workflows.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
