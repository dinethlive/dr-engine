"use client";

import { cn } from "@/lib/utils";
import {
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

type ArtifactStatus = "generating" | "complete" | "error" | "warning";

interface ArtifactCardProps {
  title: string;
  subtitle?: string;
  status: ArtifactStatus;
  onClick?: () => void;
  isSelected?: boolean;
  onRetry?: () => void;
}

const statusConfig = {
  generating: {
    icon: Loader2,
    iconClass: "animate-spin text-blue-500",
    borderClass: "border-blue-500/30",
  },
  complete: {
    icon: CheckCircle,
    iconClass: "text-green-500",
    borderClass: "border-border hover:border-primary/50",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-destructive",
    borderClass: "border-destructive/30",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-500",
    borderClass: "border-amber-500/30",
  },
};

export function ArtifactCard({
  title,
  subtitle,
  status,
  onClick,
  isSelected = false,
}: ArtifactCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 w-full max-w-xs p-3 rounded-lg border bg-card text-left transition-all",
        config.borderClass,
        isSelected && "ring-2 ring-primary shadow-sm",
        status !== "generating" && "hover:shadow-md",
        status === "generating" &&
          "animate-pulse bg-primary/5 border-primary/20"
      )}
    >
      <button
        onClick={onClick}
        disabled={status === "generating"}
        className={cn(
          "flex flex-1 items-center gap-3 min-w-0",
          status !== "generating" && "cursor-pointer"
        )}
      >
        {/* Thumbnail */}
        <div
          className={cn(
            "flex-shrink-0 w-12 h-14 rounded bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/20 dark:to-orange-800/10 flex items-center justify-center transition-all",
            status === "generating"
              ? "scale-110 shadow-inner"
              : "group-hover:scale-105"
          )}
        >
          <FileText
            className={cn(
              "h-6 w-6 text-orange-500 transition-all",
              status === "generating" && "animate-bounce"
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-sm truncate">{title}</span>
            <StatusIcon
              className={cn("h-3.5 w-3.5 flex-shrink-0", config.iconClass)}
            />
          </div>
          {subtitle && (
            <div className="flex items-center">
              <span className="text-xs text-muted-foreground line-clamp-1">
                {subtitle}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
