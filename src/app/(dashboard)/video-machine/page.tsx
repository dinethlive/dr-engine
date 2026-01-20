"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { VideoMachineHeader } from "@/components/video-machine/video-machine-header";
import { VideoMachineHero } from "@/components/video-machine/video-machine-hero";
import { VideoMachineContent } from "@/components/video-machine/video-machine-content";

export default function VideoMachinePage() {
    return (
        <ScrollArea className="h-full">
            <div className="min-h-full bg-background text-foreground flex flex-col items-center justify-center p-4 md:p-8 pt-16 md:pt-8 overflow-hidden relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1A99CE]/10 via-background to-background pointer-events-none" />

                <div className="max-w-3xl w-full z-10 space-y-8 md:space-y-12">
                    <VideoMachineHeader />
                    <VideoMachineHero />
                    <VideoMachineContent />
                </div>
            </div>
        </ScrollArea>
    );
}
