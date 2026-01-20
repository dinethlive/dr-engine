"use client";

import { Usage } from "@/lib/db";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { VisibleColumns } from "@/hooks/usage/use-usage-table";

export function UsageTableRow({
  item,
  visibleColumns,
}: {
  item: Usage;
  visibleColumns: VisibleColumns;
}) {
  return (
    <TableRow>
      {visibleColumns.date && (
        <TableCell className="font-medium">{item.date}</TableCell>
      )}
      {visibleColumns.workflow && (
        <TableCell className="max-w-[200px] truncate">
          {item.workflowName || "-"}
        </TableCell>
      )}
      {visibleColumns.model && (
        <TableCell>
          <Badge variant="outline">{item.model}</Badge>
        </TableCell>
      )}
      {visibleColumns.inputTokens && (
        <TableCell className="text-right">
          {(item.inputTokens || 0).toLocaleString()}
        </TableCell>
      )}
      {visibleColumns.outputTokens && (
        <TableCell className="text-right">
          {(item.outputTokens || 0).toLocaleString()}
        </TableCell>
      )}
      {visibleColumns.cost && (
        <TableCell className="text-right font-medium">
          ${(item.cost || 0).toFixed(4)}
        </TableCell>
      )}
    </TableRow>
  );
}
