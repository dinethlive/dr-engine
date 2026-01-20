"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface StandardNavItemProps {
    item: {
        title: string;
        href: string;
        icon: LucideIcon;
    };
    isCollapsed: boolean;
    isActive: boolean;
}

export function StandardNavItem({ item, isCollapsed, isActive }: StandardNavItemProps) {
    return (
        <Link href={item.href} className={cn(isCollapsed && "w-full flex justify-center")}>
            <Button
                variant="ghost"
                className={cn(
                    "w-full justify-start gap-3 h-9 font-normal text-muted-foreground hover:text-foreground",
                    isCollapsed && "h-10 w-10 p-0 justify-center rounded-lg relative px-0",
                    isActive && "bg-accent text-accent-foreground font-medium"
                )}
            >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.title}</span>}
            </Button>
        </Link>
    );
}
