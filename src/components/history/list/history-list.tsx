"use client";

import { Loader2 } from "lucide-react";
import { Workflow } from "@/lib/api";
import { WorkflowCard } from "../card/workflow-card";

interface HistoryListProps {
  isLoading: boolean;
  workflows: Workflow[];
  searchQuery: string;
  statusFilter: string;
  handleDelete: (id: string | number) => void;
  deletingId: string | null;
}

export function HistoryList({
  isLoading,
  workflows,
  searchQuery,
  statusFilter,
  handleDelete,
  deletingId,
}: HistoryListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading your history...</p>
      </div>
    );
  }

  if (workflows.length === 0) {
    if (searchQuery || statusFilter !== "all") {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg font-medium">
            No matching workflows found
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      );
    }

    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg font-medium">
          No history yet
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Start a new workflow to see it here
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          onDelete={handleDelete}
          isDeleting={deletingId === String(workflow.id)}
        />
      ))}
    </div>
  );
}
