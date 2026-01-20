"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcher } from "../theme/theme-switcher";
import { ProfileLinks } from "./profile-links";
import { ProfileAvatar } from "./profile-avatar";
import { ProfileInfo } from "./profile-info";

interface ProfileTriggerProps {
  user: { name: string; email: string } | null;
  isCollapsed: boolean;
}

export const ProfileTrigger = React.forwardRef<
  HTMLButtonElement,
  ProfileTriggerProps
>(({ user, isCollapsed, ...props }, ref) => (
  <Button
    variant="ghost"
    ref={ref}
    className={cn(
      "w-full justify-start gap-3 px-2 h-auto py-2 hover:bg-accent",
      isCollapsed && "h-10 w-10 p-0 justify-center rounded-lg"
    )}
    {...props}
  >
    <ProfileAvatar user={user} />
    {!isCollapsed && <ProfileInfo user={user} />}
  </Button>
));
ProfileTrigger.displayName = "ProfileTrigger";

interface ProfileDropdownContentProps {
  isCollapsed: boolean;
}

export function ProfileDropdownContent({
  isCollapsed,
}: ProfileDropdownContentProps) {
  return (
    <DropdownMenuContent
      className="w-56 p-2"
      align="start"
      side={isCollapsed ? "right" : "top"}
      sideOffset={8}
    >
      <DropdownMenuGroup>
        <ThemeSwitcher />
        <ProfileLinks />
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}
