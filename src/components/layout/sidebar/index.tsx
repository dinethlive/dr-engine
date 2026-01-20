"use client";

import { cn } from "@/lib/utils";
import { SidebarHeader } from "./header/sidebar-header";
import { SidebarNavigation } from "./navigation/sidebar-navigation";
import { SidebarRecents } from "./recents";
import { SidebarProfile } from "./profile";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-72"
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle} />

      {/* Main Navigation - Non-scrollable */}
      <div
        className={cn(
          "flex flex-col py-2 w-full",
          isCollapsed ? "px-0 items-center" : "px-3"
        )}
      >
        <SidebarNavigation isCollapsed={isCollapsed} />
      </div>

      {/* Recents - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:w-[2px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40">
        <div
          className={cn(
            "flex flex-col py-2 w-full",
            isCollapsed ? "px-0 items-center" : "px-3"
          )}
        >
          <SidebarRecents isCollapsed={isCollapsed} />
        </div>
      </div>

      {/* Profile - Sticky Bottom */}
      <div className="mt-auto border-t bg-card/50 backdrop-blur-sm">
        <SidebarProfile isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}
