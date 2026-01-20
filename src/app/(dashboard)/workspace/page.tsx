"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useWorkspace } from "@/hooks/workspace/use-workspace";
import {
  WorkspaceSidebar,
  WorkspaceMainArea,
  WorkspaceActions,
  WorkspaceResizeHandle,
} from "@/components/workspace";
import { useEffect } from "react";
import { toast } from "sonner";

function WorkspaceContent() {
  const workspace = useWorkspace();
  const { startResizing, isResizing, isArtifactOpen } = workspace;

  return (
    <div className="flex h-full bg-background overflow-hidden relative">
      <div className="flex-1 flex flex-col min-w-0">
        <WorkspaceMainArea workspace={workspace} />
        <WorkspaceActions workspace={workspace} />
      </div>
      <WorkspaceResizeHandle
        isResizing={isResizing}
        isHidden={!isArtifactOpen}
        onMouseDown={startResizing}
      />
      <WorkspaceSidebar workspace={workspace} />
    </div>
  );
}

function WorkspaceContentWrapper() {
  const searchParams = useSearchParams();
  const resetKey = searchParams.get("reset");
  return <WorkspaceContent key={resetKey} />;
}

export default function WorkspacePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <WorkspaceContentWrapper />
    </Suspense>
  );
}
