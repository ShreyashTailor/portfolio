"use client";

import { useState, useRef, useEffect } from "react";
import { X, Terminal as TerminalIcon, Minus, Square } from "lucide-react";
import { sfx } from "@/lib/sfx";

interface TerminalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([
        "CYBER_OS V.2.0.77",
        "INITIALIZING UPLINK...",
        "ACCESS GRANTED.",
        "Type 'help' to view available protocols.",
        ""
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Scroll to bottom when opening
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                inputRef.current?.focus();
            }, 100);
            sfx.playAccessGranted();
        }
    }, [isOpen]);

    useEffect(() => {
        // Auto-scroll on history update
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const parts = cmd.trim().split(" ");
        const lowerCmd = parts[0].toLowerCase();
        const rest = parts.slice(1).join(" ");
        let response = "";

        switch (lowerCmd) {
            case "help":
                response = "AVAILABLE COMMANDS: [neofetch] [ls] [cat <file>] [cowsay <text>] [rm -rf /] [whoami] [clear] [exit]";
                break;
            case "about":
                response = "DevOps Engineer based in India. Focused on Automation, Cloud, and Security.";
                break;
            case "skills":
                response = "Docker, Kubernetes, AWS, Terraform, Jenkins, Linux, Python, Go.";
                break;
            case "projects":
                response = "Listing: Konvexa (Cert Platform), Kube-Guard (Security), Pipeline-X (CI/CD).";
                break;
            case "contact":
                response = "Email: shreyash@certiswift.in | Discord: Uplink Established.";
                break;
            case "clear":
                setHistory([]);
                return;
            case "neofetch":
                const art = `
       /\\           OS: CyberOS (Arch Based)
      /  \\          Host: Mainframe
     /    \\         Kernel: 6.9.420-cybernetic
    /      \\        Uptime: 2077 hours
   /   ,,   \\       Packages: 1337 (pacman)
  /   |  |   \\      Shell: ZSH 5.9
 /_-''    ''-_\\     Theme: Neon Night (Dark)
                    CPU: Neural Link Processor
                    GPU: Arasaka MK-IV`;
                response = art;
                break;
            case "ls":
                response = "bio.txt  skills.md  projects.json  system_core.log  secret_keys.env";
                break;
            case "cat":
                if (rest) {
                    if (rest === "bio.txt") response = "DevOps Engineer. Automation Addict. Linux Enthusiast.";
                    else if (rest === "skills.md") response = "# Skills\n- Docker\n- K8s\n- Terraform\n- AWS";
                    else if (rest === "secret_keys.env") {
                        response = "ACCESS DENIED: ENCRYPTED FILE. NICE TRY.";
                        sfx.playAccessDenied();
                    }
                    else response = `cat: ${rest}: No such file or directory`;
                } else {
                    response = "usage: cat <filename>";
                }
                break;
            case "cowsay":
                const msg = rest || "Moo! I use Arch btw.";
                // Simple cow logic
                const line = "-".repeat(msg.length);
                const cow = `
 ${" " + "_".repeat(msg.length + 2)}
< ${msg} >
 ${" " + "-".repeat(msg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
                response = cow;
                break;
            case "rm":
                if (rest.includes("-rf") && rest.includes("/")) {
                    response = "⚠️ CRITICAL ALERT: IRON CLAD PROTOCOL ACTIVATED. SYSTEM DELETION PREVENTED.";
                    sfx.playAccessDenied();
                } else {
                    response = "rm: permission denied";
                }
                break;
            case "exit":
                onClose();
                return;
            case "whoami":
                response = "root@cyber-deck (ADMIN ACCESS GRANTED)";
                break;
            case "sudo":
                response = "USER IS ALREADY ROOT.";
                break;
            default:
                response = `COMMAND NOT RECOGNIZED: ${cmd}`;
                sfx.playAccessDenied();
        }

        if (lowerCmd !== "sudo" && lowerCmd !== "") {
            // Generic success sound for valid commands (except denied)
            if (!response.includes("NOT RECOGNIZED")) sfx.playBeep(800, "square", 0.05);
        }

        setHistory((prev) => [...prev, `> ${cmd}`, response, ""]);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        }
        sfx.playKeystroke();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-2xl h-[500px] bg-[#050505] border border-primary/50 shadow-[0_0_30px_rgba(255,0,60,0.3)] flex flex-col font-mono relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* CRT Scanline Overlay specifically for terminal */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

                {/* Title Bar */}
                <div className="h-8 bg-primary/10 border-b border-primary/30 flex items-center justify-between px-3 select-none">
                    <div className="flex items-center gap-2 text-primary text-xs tracking-widest">
                        <TerminalIcon className="w-4 h-4" />
                        <span>TERMINAL_UPLINK</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <Minus className="w-4 h-4 cursor-pointer hover:text-white" onClick={onClose} />
                        <Square className="w-3 h-3 cursor-pointer hover:text-white" />
                        <X className="w-4 h-4 cursor-pointer hover:text-white" onClick={onClose} />
                    </div>
                </div>

                {/* Console Content */}
                <div className="flex-1 p-4 overflow-y-auto text-primary/90 text-sm md:text-base space-y-1" onClick={() => inputRef.current?.focus()}>
                    {history.map((line, i) => (
                        <div key={i} className="whitespace-pre-wrap">{line}</div>
                    ))}
                    <div className="flex items-center gap-2">
                        <span className="text-secondary">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none flex-1 text-primary shadow-none ml-2"
                            autoFocus
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                    <div ref={bottomRef} />
                </div>
            </div>
        </div>
    );
}
