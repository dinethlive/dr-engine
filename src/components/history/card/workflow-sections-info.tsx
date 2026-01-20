"use client";

import { FileText } from "lucide-react";
import { Workflow } from "@/lib/api";

interface WorkflowSectionsInfoProps {
  workflow: Workflow;
}

export function WorkflowSectionsInfo({ workflow }: WorkflowSectionsInfoProps) {
  const totalSections = workflow.sections?.length || 0;
  if (totalSections === 0) return null;

  const completedSections =
    workflow.sections?.filter((s) => s.status === "COMPLETED").length || 0;

  return (
    <span className="flex items-center gap-1.5">
      <FileText className="h-3.5 w-3.5" />
      {completedSections}/{totalSections} sections
    </span>
  );
}
