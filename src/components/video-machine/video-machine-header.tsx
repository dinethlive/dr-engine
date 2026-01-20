"use client";

import { motion } from "framer-motion";

export function VideoMachineHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left space-y-4"
        >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
                <span className="text-[#1A99CE]">#</span>
                <span className="text-[#F2474D]">video</span>
                <span className="text-[#1A99CE]">machine</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl font-light max-w-2xl">
                Tested & proven workflow of creating high-quality educational videos by Malinda Alahakoon
            </p>
        </motion.div>
    );
}
