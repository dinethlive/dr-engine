"use client";

import { Eye, EyeOff } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RecentsHeaderProps {
    isMasked: boolean;
    onToggleMask: () => void;
}

export function RecentsHeader({ isMasked, onToggleMask }: RecentsHeaderProps) {
    return (
        <div className="flex items-center justify-between px-2 mb-1">
            <h4 className="text-xs font-medium text-muted-foreground">Recents</h4>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            onClick={onToggleMask}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {isMasked ? (
                                <EyeOff className="h-3.5 w-3.5" />
                            ) : (
                                <Eye className="h-3.5 w-3.5" />
                            )}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isMasked ? "Show details" : "Hide specific details"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
