"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function VideoMachineHero() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#CAE1E9]/20 shadow-2xl shadow-[#1A99CE]/10 group cursor-pointer"
        >
            <Link href="https://www.malindaonline.me/" target="_blank">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
                <Image
                    src="/videomachine/vm-intro.jpg"
                    alt="Video Machine Intro"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                />
                <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="flex items-center gap-2 text-white/90 font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full w-fit text-sm border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-[#F3474B] animate-pulse" />
                        Exclusive Content
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
