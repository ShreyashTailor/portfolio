"use client";

class AudioController {
    private ctx: AudioContext | null = null;
    private gainNode: GainNode | null = null;

    constructor() {
        if (typeof window !== "undefined") {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.ctx = new AudioContextClass();
                this.gainNode = this.ctx.createGain();
                this.gainNode.connect(this.ctx.destination);
                this.gainNode.gain.value = 0.1; // Low volume by default
            }
        }
    }

    private ensureContext() {
        if (this.ctx && this.ctx.state === "suspended") {
            this.ctx.resume();
        }
    }

    playBeep(freq = 800, type: OscillatorType = "square", duration = 0.05) {
        if (!this.ctx || !this.gainNode) return;
        this.ensureContext();

        const osc = this.ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const envelope = this.ctx.createGain();
        envelope.connect(this.gainNode);
        envelope.gain.setValueAtTime(0.1, this.ctx.currentTime);
        envelope.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(envelope);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playKeystroke() {
        // Randomize slightly for realism
        const freq = 600 + Math.random() * 200;
        this.playBeep(freq, "sine", 0.03);
    }

    playAccessGranted() {
        setTimeout(() => this.playBeep(1200, "square", 0.1), 0);
        setTimeout(() => this.playBeep(1800, "square", 0.2), 100);
    }

    playAccessDenied() {
        setTimeout(() => this.playBeep(150, "sawtooth", 0.3), 0);
        setTimeout(() => this.playBeep(100, "sawtooth", 0.3), 150);
    }

    playHover() {
        this.playBeep(2000, "sine", 0.01);
    }
}

export const sfx = new AudioController();
