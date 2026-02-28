"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative animate-in fade-in zoom-in-95 duration-700">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <div className="mb-6 inline-flex items-center rounded border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-mono text-primary backdrop-blur-sm">
        <span className="animate-pulse mr-2">●</span> SYSTEM_ONLINE: V.2.0.77
      </div>

      <h1 className="font-display text-5xl md:text-8xl font-black tracking-tighter mb-6 relative z-10 select-none">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">WAKE UP</span>
        <span className="block text-primary drop-shadow-[0_0_15px_rgba(255,0,60,0.5)] glitch-text" data-text="SAMURAI">SAMURAI</span>
      </h1>

      <p className="max-w-[700px] text-lg md:text-xl text-muted-foreground font-mono mb-10 leading-relaxed">
        I am <span className="text-white font-bold">Shreyash Tailor</span>. A DevOps Engineer engineered to automate, scale, and secure cloud infrastructure.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Button size="lg" className="bg-primary text-black font-bold hover:bg-primary/80 border border-transparent skew-x-[-10deg] px-8 rounded-none transition-transform hover:scale-105" asChild>
          <Link href="/projects" className="skew-x-[10deg]">VIEW PROJECTS</Link>
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 skew-x-[-10deg] px-8 rounded-none transition-transform hover:scale-105" asChild>
          <Link href="/contact" className="skew-x-[10deg]">INITIATE_CONTACT</Link>
        </Button>
      </div>
    </div>
  );
}
