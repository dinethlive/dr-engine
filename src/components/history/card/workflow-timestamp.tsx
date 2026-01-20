"use client";

import { Calendar } from "lucide-react";

function formatRelativeTime(dateString: string | Date): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

interface WorkflowTimestampProps {
  createdAt: string | Date;
}

export function WorkflowTimestamp({ createdAt }: WorkflowTimestampProps) {
  return (
    <span className="flex items-center gap-1.5">
      <Calendar className="h-3.5 w-3.5" />
      {formatRelativeTime(createdAt)}
    </span>
  );
}
