"use client";

import { TableCell, TableRow } from "@/components/ui/table";

interface NoUsageDataProps {
  isFiltered: boolean;
}

export function NoUsageData({ isFiltered }: NoUsageDataProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={6}
        className="text-center text-muted-foreground py-10"
      >
        {isFiltered
          ? "No results found for selected filters."
          : "No usage history found. Run a workflow to see data."}
      </TableCell>
    </TableRow>
  );
}
