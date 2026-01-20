import { Loader2 } from "lucide-react";
import { RecentsHeader } from "./recents-header";
import { RecentsList } from "./recents-list";
import { useRecents } from "./use-recents";

interface SidebarRecentsProps {
  isCollapsed: boolean;
}

export function SidebarRecents({ isCollapsed }: SidebarRecentsProps) {
  const { workflows, isLoading, isMasked, toggleMask } = useRecents();

  if (isCollapsed) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <RecentsHeader isMasked={isMasked} onToggleMask={toggleMask} />
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full">
      <RecentsHeader isMasked={isMasked} onToggleMask={toggleMask} />
      <RecentsList workflows={workflows} isMasked={isMasked} />
    </div>
  );
}


