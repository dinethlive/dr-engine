"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

export function VideoMachineContent() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 items-start"
        >
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Community Gift</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Full transparency: This <span className="underline font-medium text-foreground">[dr] engine isn't an official or sponsored tool</span>. It was created by someone who's been through Video Machine themselves and wanted to give back to the community by building something that would've helped them during the program.
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Evolving Content</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Deep researching is a core step of Video Machine content. Please note that prompts and methodologies may evolve as time goes on.
                    </p>
                </div>
            </div>

            <div className="bg-accent/50 rounded-xl p-6 border border-border/50 hover:border-[#F3474B]/30 transition-colors duration-300">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    Join the Movement
                    <ArrowRight className="w-4 h-4 text-[#F3474B]" />
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                    Interested in learning more about the Video Machine ecosystem? Check out the official resources.
                </p>
                <Link
                    href="https://www.malindaonline.me/"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1A99CE] to-[#2563eb] hover:from-[#1A99CE]/90 hover:to-[#2563eb]/90 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] w-full justify-center md:w-auto"
                >
                    Visit MalindaOnline.me
                    <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
