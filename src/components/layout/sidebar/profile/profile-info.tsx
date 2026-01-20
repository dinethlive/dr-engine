"use client";

import { ChevronsUpDown } from "lucide-react";

interface ProfileInfoProps {
  user: { name: string; email: string } | null;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <>
      <div className="flex flex-col items-start text-xs ml-0.5 flex-1 overflow-hidden">
        <span className="font-semibold truncate w-full text-left text-sm text-foreground">
          {user?.name || "Loading..."}
        </span>
        <span className="text-muted-foreground truncate w-full text-left text-[11px]">
          Unlimited Version
        </span>
      </div>
      <ChevronsUpDown className="h-3 w-3 text-muted-foreground/70 ml-auto flex-shrink-0" />
    </>
  );
}
