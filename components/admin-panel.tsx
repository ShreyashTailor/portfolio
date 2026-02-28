"use client";

import { useEffect, useState } from "react";
import { Email, Skill, Project } from "@/lib/db";
import { Mail, Send, Trash, RefreshCw, LogOut, Reply, Cpu, Plus, X, FolderKanban, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
    const router = useRouter();
    const [emails, setEmails] = useState<Email[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'skills' | 'projects'>('inbox');
    const [loading, setLoading] = useState(true);

    // Email State
    const [composeMode, setComposeMode] = useState(false);
    const [composeTo, setComposeTo] = useState("");
    const [composeSubject, setComposeSubject] = useState("");
    const [composeMessage, setComposeMessage] = useState("");
    const [replyMode, setReplyMode] = useState(false);
    const [replyText, setReplyText] = useState("");

    // Skills State
    const [newSkillName, setNewSkillName] = useState("");

    // Projects State
    const [newProject, setNewProject] = useState({ title: "", desc: "", link: "", tags: "", iconName: "Code2" });

    const fetchEmails = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/emails");
            const data = await res.json();
            setEmails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSkills = async () => {
        try {
            const res = await fetch("/api/skills");
            const data = await res.json();
            setSkills(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (activeTab === 'skills') fetchSkills();
        else if (activeTab === 'projects') fetchProjects();
        else fetchEmails();
    }, [activeTab]);

    const handleSelect = async (email: Email) => {
        setSelectedEmail(email);
        setReplyMode(false);
        if (!email.read && email.folder === 'inbox') {
            await fetch(`/api/admin/read?id=${email.id}`, { method: 'POST' });
            setEmails(prev => prev.map(e => e.id === email.id ? { ...e, read: true } : e));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete transmission?")) return;
        await fetch(`/api/admin/delete?id=${id}`, { method: 'DELETE' });
        if (selectedEmail?.id === id) setSelectedEmail(null);
        fetchEmails();
    };

    const handleAddSkill = async () => {
        if (!newSkillName) return;
        await fetch("/api/skills", {
            method: "POST",
            body: JSON.stringify({ name: newSkillName, category: 'other' })
        });
        setNewSkillName("");
        fetchSkills();
    };

    const handleDeleteSkill = async (id: string) => {
        if (!confirm("Delete skill?")) return;
        await fetch(`/api/skills?id=${id}`, { method: "DELETE" });
        fetchSkills();
    };

    const handleAddProject = async () => {
        if (!newProject.title) return;
        const tagsArray = newProject.tags.split(',').map(t => t.trim()).filter(Boolean);
        await fetch("/api/projects", {
            method: "POST",
            body: JSON.stringify({ ...newProject, tags: tagsArray })
        });
        setNewProject({ title: "", desc: "", link: "", tags: "", iconName: "Code2" });
        fetchProjects();
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Delete project?")) return;
        await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
        fetchProjects();
    };

    const handleSendNew = async () => {
        if (!composeTo || !composeSubject || !composeMessage) return;
        await fetch("/api/admin/reply", {
            method: "POST",
            body: JSON.stringify({ to: composeTo, subject: composeSubject, message: composeMessage, originalId: null })
        });
        alert("TRANSMISSION SENT");
        setComposeMode(false);
        setComposeTo("");
        setComposeSubject("");
        setComposeMessage("");
        fetchEmails();
    };

    const handleReply = async () => {
        if (!selectedEmail) return;
        await fetch("/api/admin/reply", {
            method: "POST",
            body: JSON.stringify({ to: selectedEmail.from, subject: `RE: ${selectedEmail.subject}`, message: replyText, originalId: selectedEmail.id })
        });
        alert("TRANSMISSION SENT");
        setReplyMode(false);
        setReplyText("");
        fetchEmails();
    };

    const filteredEmails = emails.filter(email => email.folder === activeTab);

    return (
        <div className="flex h-screen bg-[#020202] text-primary font-mono overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 border-r border-primary/20 bg-black/50 p-4 flex flex-col gap-4">
                <div className="font-bold text-xl tracking-widest mb-4 flex items-center gap-2">
                    <Mail className="w-6 h-6" /> NET_MAIL
                </div>

                <Button variant="default" className="w-full bg-primary text-black font-bold hover:bg-primary/80 mb-4" onClick={() => { setComposeMode(true); setSelectedEmail(null); setReplyMode(false); }}>
                    <Reply className="w-4 h-4 mr-2" /> COMPOSE
                </Button>

                <Button variant={activeTab === 'inbox' ? "secondary" : "ghost"} className="justify-start gap-2" onClick={() => { setActiveTab('inbox'); setSelectedEmail(null); setComposeMode(false); }}>
                    <Mail className="w-4 h-4" /> INBOX
                    <span className="ml-auto text-xs bg-primary/20 px-2 rounded-full">{emails.filter(e => e.folder === 'inbox' && !e.read).length}</span>
                </Button>

                <Button variant={activeTab === 'sent' ? "secondary" : "ghost"} className="justify-start gap-2" onClick={() => { setActiveTab('sent'); setSelectedEmail(null); setComposeMode(false); }}>
                    <Send className="w-4 h-4" /> SENT
                </Button>

                <Button variant={activeTab === 'skills' ? "secondary" : "ghost"} className="justify-start gap-2" onClick={() => { setActiveTab('skills'); setSelectedEmail(null); setComposeMode(false); }}>
                    <Cpu className="w-4 h-4" /> SKILLS
                </Button>

                <Button variant={activeTab === 'projects' ? "secondary" : "ghost"} className="justify-start gap-2" onClick={() => { setActiveTab('projects'); setSelectedEmail(null); setComposeMode(false); }}>
                    <FolderKanban className="w-4 h-4" /> PROJECTS
                </Button>

                <div className="mt-auto">
                    <Button variant="outline" className="w-full gap-2 border-red-500/50 text-red-500 hover:bg-red-900/20" onClick={() => router.push("/")}>
                        <LogOut className="w-4 h-4" /> LOGOUT
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            <div className={`border-r border-primary/20 flex flex-col bg-black/20 ${activeTab === 'projects' ? 'w-full' : 'w-96'}`}>
                <div className="p-4 border-b border-primary/20 flex justify-between items-center bg-primary/5">
                    <span className="text-sm font-bold uppercase tracking-wider">{activeTab}</span>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                        if (activeTab === 'skills') fetchSkills();
                        else if (activeTab === 'projects') fetchProjects();
                        else fetchEmails();
                    }}>
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>

                {activeTab === 'skills' ? (
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex gap-2 mb-6">
                            <input className="flex-1 bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" placeholder="NEW_SKILL_NAME..." value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()} />
                            <Button size="icon" onClick={handleAddSkill}><Plus className="w-4 h-4" /></Button>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {skills.map(skill => (
                                <div key={skill.id} className="flex items-center justify-between p-3 bg-black/40 border border-primary/10 hover:border-primary/50 transition-colors group">
                                    <span className="font-mono text-sm">{skill.name}</span>
                                    <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 hover:bg-transparent" onClick={() => handleDeleteSkill(skill.id)}><X className="w-4 h-4" /></Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'projects' ? (
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="bg-black/50 border border-primary/20 p-4 mb-6 space-y-3">
                            <h3 className="font-bold text-sm mb-2">NEW PROJECT</h3>
                            <input className="w-full bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" placeholder="TITLE..." value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                            <input className="w-full bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" placeholder="DESCRIPTION..." value={newProject.desc} onChange={(e) => setNewProject({ ...newProject, desc: e.target.value })} />
                            <div className="flex gap-2">
                                <input className="flex-1 bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" placeholder="LINK (URL)..." value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
                                <select className="bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" value={newProject.iconName} onChange={(e) => setNewProject({ ...newProject, iconName: e.target.value })}>
                                    <option value="Code2">Code2</option>
                                    <option value="Shield">Shield</option>
                                    <option value="Cpu">Cpu</option>
                                    <option value="Wifi">Wifi</option>
                                    <option value="Terminal">Terminal</option>
                                </select>
                            </div>
                            <input className="w-full bg-black/50 border border-primary/20 p-2 text-sm focus:border-primary focus:outline-none" placeholder="TAGS (comma separated)..." value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
                            <Button className="w-full" onClick={handleAddProject}><Plus className="w-4 h-4 mr-2" /> ADD PROJECT</Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map(project => (
                                <div key={project.id} className="p-4 bg-black/40 border border-primary/10 hover:border-primary/50 transition-colors relative group">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Code2 className="w-4 h-4 text-primary/70" />
                                        <span className="font-bold text-sm">{project.title}</span>
                                    </div>
                                    <p className="text-xs text-primary/60 mb-2 truncate">{project.desc}</p>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {project.tags.map(t => <span key={t} className="text-[10px] border border-primary/20 px-1">{t}</span>)}
                                    </div>
                                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 hover:bg-transparent" onClick={() => handleDeleteProject(project.id)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        {filteredEmails.map(email => (
                            <div key={email.id} onClick={() => { handleSelect(email); setComposeMode(false); }} className={`p-4 border-b border-primary/10 cursor-pointer hover:bg-primary/5 transition-colors ${selectedEmail?.id === email.id ? "bg-primary/10 border-l-2 border-l-primary" : ""} ${!email.read ? "font-bold text-white" : "text-primary/70"}`}>
                                <div className="flex justify-between text-xs mb-1 opacity-60"><span>{new Date(email.date).toLocaleDateString()}</span>{email.folder === 'inbox' && !email.read && <span className="text-secondary">NEW</span>}</div>
                                <div className="truncate text-sm mb-1">{email.from}</div>
                                <div className="truncate text-xs opacity-80">{email.subject}</div>
                            </div>
                        ))}
                        {filteredEmails.length === 0 && <div className="p-8 text-center text-primary/40 text-xs">NO TRANSMISSIONS</div>}
                    </div>
                )}
            </div>

            {/* Reading/Composing Pane - Only show if NOT in skills/projects mode */}
            {activeTab !== 'skills' && activeTab !== 'projects' && (
                <div className="flex-1 flex flex-col bg-black/10 relative">
                    {composeMode ? (
                        <div className="flex-1 flex flex-col p-8 max-w-2xl mx-auto w-full">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Reply className="w-6 h-6 rotate-180" /> COMPOSE_PACKET</h2>
                            <div className="space-y-4 flex-1 flex flex-col">
                                <input placeholder="RECIPIENT (TO)" value={composeTo} onChange={(e) => setComposeTo(e.target.value)} className="bg-black border border-primary/30 p-4 focus:border-primary focus:outline-none" />
                                <input placeholder="SUBJECT" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} className="bg-black border border-primary/30 p-4 focus:border-primary focus:outline-none" />
                                <textarea placeholder="DATA PAYLOAD (MESSAGE)..." value={composeMessage} onChange={(e) => setComposeMessage(e.target.value)} className="flex-1 bg-black border border-primary/30 p-4 resize-none focus:border-primary focus:outline-none min-h-[300px]" />
                                <div className="flex justify-end gap-4"><Button variant="ghost" onClick={() => setComposeMode(false)}>DISCARD</Button><Button onClick={handleSendNew} className="px-8">TRANSMIT</Button></div>
                            </div>
                        </div>
                    ) : selectedEmail ? (
                        <>
                            <div className="p-6 border-b border-primary/20 bg-black/40">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                                    <div className="flex gap-2">
                                        {selectedEmail.folder === 'inbox' && <Button size="sm" onClick={() => setReplyMode(!replyMode)}><Reply className="w-4 h-4 mr-2" /> REPLY</Button>}
                                        <Button size="icon" variant="destructive" onClick={() => handleDelete(selectedEmail.id)}><Trash className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-sm opacity-70 font-mono"><div><span className="text-primary/40 mr-2">FROM:</span>{selectedEmail.from}</div><div><span className="text-primary/40 mr-2">DATE:</span>{new Date(selectedEmail.date).toLocaleString()}</div></div>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed text-sm">{selectedEmail.message}</div>
                            {replyMode && (
                                <div className="border-t border-primary/20 bg-black p-4 absolute bottom-0 left-0 right-0 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
                                    <div className="flex gap-2 items-center mb-2 text-xs text-primary/60"><Reply className="w-3 h-3" /> REPLYING TO: {selectedEmail.from}</div>
                                    <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full h-32 bg-primary/5 border border-primary/30 p-4 text-white resize-none focus:outline-none focus:border-primary mb-4" placeholder="Construct reply packet..." autoFocus />
                                    <div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setReplyMode(false)}>CANCEL</Button><Button onClick={handleReply}>TRANSMIT</Button></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-primary/20 select-none">
                            <div className="text-center"><Mail className="w-16 h-16 mx-auto mb-4 opacity-20" /><p>SELECT_DATA_PACKET_OR_COMPOSE</p></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
