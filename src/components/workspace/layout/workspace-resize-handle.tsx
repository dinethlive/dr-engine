import { cn } from "@/lib/utils";

interface WorkspaceResizeHandleProps {
    isResizing: boolean;
    isHidden: boolean;
    onMouseDown: () => void;
}

export function WorkspaceResizeHandle({
    isResizing,
    isHidden,
    onMouseDown,
}: WorkspaceResizeHandleProps) {
    return (
        <div
            className={cn(
                "w-1 hover:bg-orange-500/20 cursor-col-resize flex-shrink-0 relative z-50 transition-colors hidden md:block",
                isResizing ? "bg-orange-500/40" : "bg-border/50",
                isHidden && "hidden"
            )}
            onMouseDown={onMouseDown}
        >
            {/* Visual indicator for handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-1 rounded-full bg-border" />
        </div>
    );
}
