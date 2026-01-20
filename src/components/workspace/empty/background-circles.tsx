"use client";

import { motion } from "framer-motion";

export function BackgroundCircles() {
    return (
        <>
            <motion.div
                className="absolute inset-0 rounded-full bg-orange-500/20 pointer-events-none"
                animate={{ scale: [1, 1.5, 2], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
                className="absolute inset-0 rounded-full bg-orange-500/20 pointer-events-none"
                animate={{ scale: [1, 1.5, 2], opacity: [0, 0.5, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1,
                }}
            />
        </>
    );
}
