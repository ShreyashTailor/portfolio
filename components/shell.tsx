"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Terminal, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import BackgroundVideo from "@/components/background-video";
import TerminalModal from "@/components/terminal-modal";
import EmailModal from "@/components/email-modal";
import { sfx } from "@/lib/sfx";
import { usePathname } from "next/navigation";

export default function Shell({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [glitchIntensity, setGlitchIntensity] = useState(1);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
        let konamiIndex = 0;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    setGlitchIntensity(5);
                    alert("RELIC MALFUNCTION DETECTED // SYSTEM OVERRIDE INITIATED");
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-transparent font-sans text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden relative flex flex-col">

            <BackgroundVideo />

            {/* Cyberpunk Character Cutouts - Background Shards */}
            {/* Top Left: Johnny - Faded & Skewed */}
            <div className="hidden md:block fixed top-0 left-0 w-[500px] h-[600px] z-[-1] pointer-events-none overflow-hidden origin-top-left -skew-x-12 opacity-60 mix-blend-screen">
                <img
                    src="/characters/johnny.jpg"
                    alt="Johnny Silverhand"
                    className="w-full h-full object-cover mask-image-b-r"
                    style={{ maskImage: 'linear-gradient(to bottom right, black 40%, transparent 90%)' }}
                />
            </div>

            {/* Top Right: Judy */}
            <div className="hidden md:block fixed top-0 right-[-50px] w-[450px] h-[500px] z-[-1] pointer-events-none overflow-hidden origin-top-right skew-x-12 opacity-60 mix-blend-screen">
                <img
                    src="/characters/judy.jpg"
                    alt="Judy Alvarez"
                    className="w-full h-full object-cover"
                    style={{ maskImage: 'linear-gradient(to bottom left, black 40%, transparent 90%)' }}
                />
            </div>

            {/* Bottom Left: Jackie */}
            <div className="hidden md:block fixed bottom-0 left-[-50px] w-[600px] h-[500px] z-[-1] pointer-events-none overflow-hidden origin-bottom-left skew-x-12 opacity-50 grayscale-[30%] mix-blend-screen">
                <img
                    src="/characters/jackie.jpg"
                    alt="Jackie Welles"
                    className="w-full h-full object-cover"
                    style={{ maskImage: 'linear-gradient(to top right, black 40%, transparent 90%)' }}
                />
            </div>

            {/* Bottom Right: Panam */}
            <div className="hidden md:block fixed bottom-0 right-[-50px] w-[500px] h-[600px] z-[-1] pointer-events-none overflow-hidden origin-bottom-right -skew-x-12 opacity-60 mix-blend-screen">
                <img
                    src="/characters/panam.jpg"
                    alt="Panam Palmer"
                    className="w-full h-full object-cover"
                    style={{ maskImage: 'linear-gradient(to top left, black 40%, transparent 90%)' }}
                />
            </div>

            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-20 h-full w-full bg-[#050505] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,#ff003c20,transparent)]"></div>

            <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/80 backdrop-blur-md">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary md:hidden hover:text-primary hover:bg-primary/10"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <Link href="/" className="font-display text-2xl font-bold tracking-widest text-primary glitch-text" data-text="SHREYASH">
                            SHREYASH
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium font-mono text-muted-foreground">
                        <Link href="/" onMouseEnter={() => sfx.playHover()} className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}>_HOME</Link>
                        <Link href="/about" onMouseEnter={() => sfx.playHover()} className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/about' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}>_ABOUT</Link>
                        <Link href="/projects" onMouseEnter={() => sfx.playHover()} className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/projects' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}>_PROJECTS</Link>
                        <Link href="/contact" onMouseEnter={() => sfx.playHover()} className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/contact' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}>_CONTACT</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link href="https://github.com/ShreyashTailor" target="_blank" className="hidden md:block text-muted-foreground hover:text-primary transition-all">
                            <Github className="h-5 w-5" />
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:text-primary hover:bg-primary/10"
                            onClick={() => {
                                setIsTerminalOpen(true);
                                sfx.playAccessGranted();
                            }}
                            title="Launch Terminal"
                        >
                            <Terminal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 top-16 z-50 bg-black/95 backdrop-blur-xl border-t border-primary/20 md:hidden">
                        <nav className="container flex flex-col gap-4 p-8 text-lg font-mono text-muted-foreground">
                            <Link
                                href="/"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}
                            >
                                _HOME
                            </Link>
                            <Link
                                href="/about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/about' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}
                            >
                                _ABOUT
                            </Link>
                            <Link
                                href="/projects"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/projects' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}
                            >
                                _PROJECTS
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`transition-colors hover:text-primary hover:shadow-[0_0_10px_var(--primary)] ${pathname === '/contact' ? 'text-primary shadow-[0_0_10px_var(--primary)]' : ''}`}
                            >
                                _CONTACT
                            </Link>
                            <div className="h-px bg-primary/20 my-4" />
                            <Link
                                href="https://github.com/ShreyashTailor"
                                target="_blank"
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all"
                            >
                                <Github className="h-5 w-5" />
                                <span>GITHUB</span>
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
            <EmailModal isOpen={isEmailOpen} onClose={() => setIsEmailOpen(false)} />

            <main className="container mx-auto px-4 py-12 flex-1 relative">
                {children}
            </main>

            <footer className="w-full py-8 border-t border-primary/20 bg-black/80 backdrop-blur-md mt-auto">
                <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
                    <div className="flex items-center gap-4">
                        {/* ARCH LINUX LOGO */}
                        <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-[#1793d1]" xmlns="http://www.w3.org/2000/svg">
                            <title>Arch Linux</title>
                            <path d="M11.39.605C10.376 3.092 9.764 4.72 8.635 7.132c.693.734 1.543 1.589 2.923 2.554-1.484-.61-2.496-1.224-3.252-1.86C6.86 10.842 4.596 15.138 0 23.395c3.612-2.085 6.412-3.37 9.021-3.862a6.61 6.61 0 01-.171-1.547l.003-.115c.058-2.315 1.261-4.095 2.687-3.973 1.426.12 2.534 2.096 2.478 4.409a6.52 6.52 0 01-.146 1.243c2.58.505 5.352 1.787 8.914 3.844-.702-1.293-1.33-2.459-1.929-3.57-.943-.73-1.926-1.682-3.933-2.713 1.38.359 2.367.772 3.137 1.234-6.09-11.334-6.582-12.84-8.67-17.74zM22.898 21.36v-.623h-.234v-.084h.562v.084h-.234v.623h.331v-.707h.142l.167.5.034.107a2.26 2.26 0 01.038-.114l.17-.493H24v.707h-.091v-.593l-.206.593h-.084l-.205-.602v.602h-.091" />
                        </svg>
                        {/* NIXOS LOGO */}
                        <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-[#5277C3]" xmlns="http://www.w3.org/2000/svg">
                            <title>NixOS</title>
                            <path d="M7.352 1.592l-1.364.002L5.32 2.75l1.557 2.713-3.137-.008-1.32 2.34H14.11l-1.353-2.332-3.192-.006-2.214-3.865zm6.175 0l-2.687.025 5.846 10.127 1.341-2.34-1.59-2.765 2.24-3.85-.683-1.182h-1.336l-1.57 2.705-1.56-2.72zm6.887 4.195l-5.846 10.125 2.696-.008 1.601-2.76 4.453.016.682-1.183-.666-1.157-3.13-.008L21.778 8.1l-1.365-2.313zM9.432 8.086l-2.696.008-1.601 2.76-4.453-.016L0 12.02l.666 1.157 3.13.008-1.575 2.71 1.365 2.315L9.432 8.086zM7.33 12.25l-.006.01-.002-.004-1.342 2.34 1.59 2.765-2.24 3.85.684 1.182H7.35l.004-.006h.001l1.567-2.698 1.558 2.72 2.688-.026-.004-.006h.01L7.33 12.25zm2.55 3.93l1.354 2.332 3.192.006 2.215 3.865 1.363-.002.668-1.156-1.557-2.713 3.137.008 1.32-2.34H9.881Z" />
                        </svg>
                        {/* FEDORA LOGO */}
                        <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 fill-[#51A2DA]" xmlns="http://www.w3.org/2000/svg">
                            <title>Fedora</title>
                            <path d="M12.001 0C5.376 0 .008 5.369.004 11.992H.002v9.287h.002A2.726 2.726 0 0 0 2.73 24h9.275c6.626-.004 11.993-5.372 11.993-11.997C23.998 5.375 18.628 0 12 0zm2.431 4.94c2.015 0 3.917 1.543 3.917 3.671 0 .197.001.395-.03.619a1.002 1.002 0 0 1-1.137.893 1.002 1.002 0 0 1-.842-1.175 2.61 2.61 0 0 0 .013-.337c0-1.207-.987-1.672-1.92-1.672-.934 0-1.775.784-1.777 1.672.016 1.027 0 2.046 0 3.07l1.732-.012c1.352-.028 1.368 2.009.016 1.998l-1.748.013c-.004.826.006.677.002 1.093 0 0 .015 1.01-.016 1.776-.209 2.25-2.124 4.046-4.424 4.046-2.438 0-4.448-1.993-4.448-4.437.073-2.515 2.078-4.492 4.603-4.469l1.409-.01v1.996l-1.409.013h-.007c-1.388.04-2.577.984-2.6 2.47a2.438 2.438 0 0 0 2.452 2.439c1.356 0 2.441-.987 2.441-2.437l-.001-7.557c0-.14.005-.252.02-.407.23-1.848 1.883-3.256 3.754-3.256z" />
                        </svg>
                    </div>
                    <p className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors cursor-crosshair">
                        I use Arch, NixOS, and Fedora btw
                    </p>
                    <p className="text-xs text-muted-foreground/50 font-mono">
                        © 2077 Shreyash Tailor. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
