"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  user: { name: string; email: string } | null;
}

export function ProfileAvatar({ user }: ProfileAvatarProps) {
  return (
    <Avatar className="h-8 w-8 border shadow-sm">
      <AvatarImage src="/avatars/01.png" alt={user?.name || "User"} />
      <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
    </Avatar>
  );
}
