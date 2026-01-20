"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { PanelLeft, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewResearch = () => {
    router.push(`/workspace?reset=${Date.now()}`);
  };

  // Determine which logo to show. Default to dark theme logo during SSR.
  const logoSrc =
    mounted && resolvedTheme === "light"
      ? "/logo/logo-light-v1.svg"
      : "/logo/logo-v1.svg";

  return (
    <div
      className={cn(
        "flex flex-col gap-2 p-3 pb-2 flex-shrink-0",
        isCollapsed && "pt-3 px-2 pb-2 items-center"
      )}
    >
      {/* Header Row: Logo/Brand + Toggle */}
      <div
        className={cn(
          "flex items-center h-10 mb-2",
          !isCollapsed ? "px-2 font-semibold justify-between" : "justify-center"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image
              src={logoSrc}
              alt="DR-Engine Logo"
              width={120}
              height={24}
              className="h-6 w-auto transition-all"
              priority
            />
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(
            "h-6 w-6 text-muted-foreground hover:text-foreground",
            !isCollapsed && "ml-auto"
          )}
        >
          <PanelLeft className="h-4 w-4 hidden md:block" />
          <X className="h-4 w-4 md:hidden" />
        </Button>
      </div>

      <div className={cn(isCollapsed && "w-full flex justify-center")}>
        <Button
          onClick={handleNewResearch}
          className={cn(
            "w-full bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition-all",
            !isCollapsed ? "gap-2" : "gap-0",
            isCollapsed && "h-10 w-10 p-0 rounded-lg justify-center"
          )}
        >
          <Plus className="h-5 w-5" />
          <span
            className={cn(
              "whitespace-nowrap overflow-hidden transition-all duration-300",
              isCollapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
            )}
          >
            New Research
          </span>
        </Button>
      </div>
    </div>
  );
}
