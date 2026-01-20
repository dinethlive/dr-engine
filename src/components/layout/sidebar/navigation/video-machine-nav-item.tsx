"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface VideoMachineNavItemProps {
    item: {
        title: string;
        href: string;
        icon: LucideIcon;
    };
    isCollapsed: boolean;
    isActive: boolean;
}

export function VideoMachineNavItem({ item, isCollapsed, isActive }: VideoMachineNavItemProps) {
    return (
        <>
            {/* Top Divider */}
            <div className="mx-2 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-1" />

            <Link href={item.href} className={cn(isCollapsed && "w-full flex justify-center")}>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 h-9 font-normal transition-all duration-300",
                        isCollapsed && "h-10 w-10 p-0 justify-center rounded-lg relative px-0",
                        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                    )}
                >
                    {/* Icon - Always Red */}
                    <item.icon className={cn("h-4 w-4 flex-shrink-0 text-[#F3474B]")} />

                    {/* Label - Subtle Pulse Animation */}
                    {!isCollapsed && (
                        <motion.span
                            className="truncate flex items-center font-bold"
                            animate={{
                                opacity: [0.8, 1, 0.8],
                                scale: [1, 1.01, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <span className="text-[#1A99CE]">#</span>
                            <span className="text-[#F2474D]">video</span>
                            <span className="text-[#1A99CE]">machine</span>
                        </motion.span>
                    )}
                </Button>
            </Link>

            {/* Bottom Divider */}
            <div className="mx-2 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-50 my-1" />
        </>
    );
}
