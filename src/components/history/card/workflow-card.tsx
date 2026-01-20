"use client";

import Link from "next/link";
import { Workflow } from "@/lib/api";
import { WorkflowStatusBadge } from "./workflow-status-badge";
import { WorkflowTimestamp } from "./workflow-timestamp";
import { WorkflowSectionsInfo } from "./workflow-sections-info";
import { DeleteWorkflowDialog } from "./delete-workflow-dialog";

interface WorkflowCardProps {
  workflow: Workflow;
  onDelete: (id: string | number) => void;
  isDeleting: boolean;
}

export function WorkflowCard({
  workflow,
  onDelete,
  isDeleting,
}: WorkflowCardProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border rounded-xl bg-card hover:bg-accent/50 transition-all hover:shadow-sm w-full">
      <div className="flex-1 min-w-0 flex flex-col gap-1 w-full">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/workspace?id=${workflow.id}`}
            className="font-semibold text-base hover:underline decoration-primary/30 underline-offset-4 transition-all hover:decoration-primary truncate pr-2 block flex-1 min-w-0"
          >
            {workflow.topic}
          </Link>
          {/* Mobile Status Badge */}
          <div className="sm:hidden flex-shrink-0">
            <WorkflowStatusBadge status={workflow.status} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
          <WorkflowTimestamp createdAt={workflow.createdAt} />
          <WorkflowSectionsInfo workflow={workflow} />
        </div>
      </div>

      {/* Desktop Status Badge */}
      <div className="hidden sm:block flex-shrink-0">
        <WorkflowStatusBadge status={workflow.status} />
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto">
        <DeleteWorkflowDialog
          workflowId={workflow.id!}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}
