"use client";

export default function BackgroundVideo() {
    return (
        <div className="fixed inset-0 min-h-screen min-w-full overflow-hidden z-[-30]">
            <iframe
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-40 pointer-events-none scale-150"
                src="https://www.youtube.com/embed/P99qJGrPNls?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=P99qJGrPNls"
                title="Cyberpunk Background"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            <div className="absolute inset-0 bg-black/60 z-[-15] backdrop-blur-[2px]"></div>
        </div>
    );
}
