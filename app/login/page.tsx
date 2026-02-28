"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, Cpu } from "lucide-react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
        } else {
            setError("ACCESS DENIED: INVALID CREDENTIALS");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-primary font-mono flex items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20 pointer-events-none"></div>

            <div className="w-full max-w-sm p-8 border border-primary/30 bg-black/80 backdrop-blur-md relative z-20">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <div className="p-4 bg-primary/10 rounded-full border border-primary/50">
                        <Lock className="w-8 h-8 animate-pulse" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-widest text-center">SYSTEM_AUTH</h1>
                    <p className="text-xs text-primary/60">RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider">Passcode</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-primary/30 p-3 text-center text-lg tracking-[0.5em] focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(255,0,60,0.3)] transition-all"
                            placeholder="••••••"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-xs text-center border border-red-500/50 bg-red-900/10 p-2 animate-pulse">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-primary text-black font-bold hover:bg-primary/80 h-12 rounded-none group relative overflow-hidden"
                        disabled={loading}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? "VERIFYING..." : "AUTHENTICATE"} <Cpu className="w-4 h-4" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-primary/30">
                        SECURE CONNECTION ESTABLISHED<br />
                        IP LOGGED: ::1
                    </p>
                </div>
            </div>
        </div>
    );
}
