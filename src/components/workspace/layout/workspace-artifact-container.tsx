import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WorkspaceArtifactContainerProps {
    width: number;
    isOpen: boolean;
    isResizing: boolean;
    children: ReactNode;
}

export function WorkspaceArtifactContainer({
    width,
    isOpen,
    isResizing,
    children,
}: WorkspaceArtifactContainerProps) {
    return (
        <div
            className={cn(
                "flex-shrink-0 h-full border-l bg-background overflow-hidden",
                // Desktop: Animate width if not resizing
                !isResizing && "transition-[width] duration-500 ease-out",
                // Mobile: Fixed full screen overlay with slide-in from right
                "max-md:!fixed max-md:!inset-0 max-md:!z-50 max-md:!w-full max-md:!h-full max-md:!border-l-0",
                "max-md:transition-transform max-md:duration-300 max-md:ease-in-out",
                // Mobile slide logic
                isOpen ? "max-md:translate-x-0" : "max-md:translate-x-full",
                // Force opacity 1 on mobile to allow slide animation to be visible
                "max-md:!opacity-100"
            )}
            style={{
                width: isOpen ? width : 0,
                // Desktop: Fade out opacity (preserved). 
                // Mobile: Force opacity-100 via !important class below to ignore this inline style for sliding
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? "auto" : "none",
            }}
        >
            <div className="w-full h-full min-w-[300px]">
                {children}
            </div>
        </div>
    );
}
