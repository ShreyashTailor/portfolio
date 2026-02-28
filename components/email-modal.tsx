"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Minus, Square, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sfx } from "@/lib/sfx";

interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EmailModal({ isOpen, onClose }: EmailModalProps) {
    const [subject, setSubject] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        if (isOpen) {
            sfx.playAccessGranted();
        }
    }, [isOpen]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        sfx.playAccessGranted();

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderEmail, subject, message }),
            });

            if (res.ok) {
                setStatus("success");
                sfx.playAccessGranted(); // Success sound
                setTimeout(() => {
                    onClose();
                    setSubject("");
                    setMessage("");
                    setSenderEmail("");
                    setStatus("idle");
                }, 1500);
            } else {
                setStatus("error");
                sfx.playAccessDenied();
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
            sfx.playAccessDenied();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[#050505] border border-primary/50 shadow-[0_0_30px_rgba(255,0,60,0.3)] flex flex-col font-mono relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

                {/* Title Bar */}
                <div className="h-8 bg-primary/10 border-b border-primary/30 flex items-center justify-between px-3 select-none">
                    <div className="flex items-center gap-2 text-primary text-xs tracking-widest">
                        <Mail className="w-4 h-4" />
                        <span>SECURE_TRANSMISSION</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <Minus className="w-4 h-4 cursor-pointer hover:text-white" onClick={onClose} />
                        <Square className="w-3 h-3 cursor-pointer hover:text-white" />
                        <X className="w-4 h-4 cursor-pointer hover:text-white" onClick={onClose} />
                    </div>
                </div>

                <div className="p-6 relative z-30">
                    <form onSubmit={handleSend} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-primary/70 uppercase tracking-wider">Target_Identity</label>
                            <div className="w-full bg-primary/5 border border-primary/20 p-2 text-primary text-sm font-mono cursor-not-allowed opacity-70">
                                shreyash@certiswift.in
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-primary/70 uppercase tracking-wider">Sender_Identity</label>
                            <input
                                type="email"
                                value={senderEmail}
                                onChange={(e) => setSenderEmail(e.target.value)}
                                onFocus={() => sfx.playHover()}
                                className="w-full bg-black/50 border border-primary/30 p-2 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,60,0.2)] transition-all font-mono text-sm"
                                placeholder="your_email@domain.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-primary/70 uppercase tracking-wider">Subject_Line</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                onFocus={() => sfx.playHover()}
                                className="w-full bg-black/50 border border-primary/30 p-2 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,60,0.2)] transition-all font-mono text-sm"
                                placeholder="Project Inquiry / Job Offer"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-primary/70 uppercase tracking-wider">Data_Payload</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onFocus={() => sfx.playHover()}
                                className="w-full h-32 bg-black/50 border border-primary/30 p-2 text-white focus:border-primary focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,60,0.2)] transition-all font-mono text-sm resize-none"
                                placeholder="Enter your encrypted message..."
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-primary text-black font-bold hover:bg-primary/80 border border-transparent rounded-none transition-all group relative overflow-hidden"
                            disabled={status !== "idle"}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {status === "idle" && <>INITIATE UPLINK <Send className="w-4 h-4" /></>}
                                {status === "sending" && "TRANSMITTING..."}
                                {status === "success" && "UPLOAD COMPLETE"}
                                {status === "error" && "TRANSMISSION FAILED"}
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </Button>
                    </form>
                </div>

            </div>
        </div>
    );
}
