"use client";

import { usePathname } from "next/navigation";
import { Sparkles, FileText, BarChart3, History, Settings, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { StandardNavItem } from "./standard-nav-item";
import { VideoMachineNavItem } from "./video-machine-nav-item";

interface SidebarNavigationProps {
    isCollapsed: boolean;
}

export function SidebarNavigation({ isCollapsed }: SidebarNavigationProps) {
    const pathname = usePathname();

    const navItems = [
        { title: "Workspace", href: "/workspace", icon: Sparkles },
        { title: "History", href: "/history", icon: History },
        { title: "Prompts", href: "/prompts", icon: FileText },
        { title: "Usage", href: "/usage", icon: BarChart3 },
        { title: "Settings", href: "/settings", icon: Settings },
        { title: "Video Machine", href: "/video-machine", icon: Video },
    ];

    return (
        <div className={cn("flex flex-col gap-0.5", isCollapsed && "w-full items-center")}>
            {navItems.map(item => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                if (item.title === "Video Machine") {
                    return (
                        <VideoMachineNavItem
                            key={item.title}
                            item={item}
                            isCollapsed={isCollapsed}
                            isActive={isActive}
                        />
                    );
                }

                return (
                    <StandardNavItem
                        key={item.title}
                        item={item}
                        isCollapsed={isCollapsed}
                        isActive={isActive}
                    />
                );
            })}
        </div>
    );
}
