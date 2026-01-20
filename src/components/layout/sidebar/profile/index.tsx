"use client";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProfile } from "@/hooks/use-user-profile";
import {
  ProfileTrigger,
  ProfileDropdownContent,
} from "./profile-components";

interface SidebarProfileProps {
  isCollapsed: boolean;
}

export function SidebarProfile({ isCollapsed }: SidebarProfileProps) {
  const { user } = useUserProfile();

  return (
    <div
      className={cn(
        "p-3 border-t bg-card/50",
        isCollapsed && "p-2 flex justify-center"
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ProfileTrigger user={user} isCollapsed={isCollapsed} />
        </DropdownMenuTrigger>
        <ProfileDropdownContent isCollapsed={isCollapsed} />
      </DropdownMenu>
    </div>
  );
}
