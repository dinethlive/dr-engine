"use client";

import { TableHead } from "@/components/ui/table";

export function WorkflowHeaderCell() {
  return (
    <TableHead className="max-w-[200px]">
      <span className="h-8 flex items-center px-4 font-medium">Workflow</span>
    </TableHead>
  );
}
