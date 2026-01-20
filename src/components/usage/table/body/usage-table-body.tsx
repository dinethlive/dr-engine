"use client";

import { Usage } from "@/lib/db";
import { TableBody } from "@/components/ui/table";
import { UsageTableRow } from "./usage-table-row";
import { VisibleColumns } from "@/hooks/usage/use-usage-table";
import { NoUsageData } from "./no-usage-data";

interface UsageTableBodyProps {
  filteredAndSortedUsageHistory: Usage[];
  visibleColumns: VisibleColumns;
  selectedModels: string[];
}

export function UsageTableBody({
  filteredAndSortedUsageHistory,
  visibleColumns,
  selectedModels,
}: UsageTableBodyProps) {
  const isEmpty = filteredAndSortedUsageHistory.length === 0;

  return (
    <TableBody>
      {isEmpty ? (
        <NoUsageData isFiltered={selectedModels.length > 0} />
      ) : (
        filteredAndSortedUsageHistory.map((item) => (
          <UsageTableRow
            key={item.id}
            item={item}
            visibleColumns={visibleColumns}
          />
        ))
      )}
    </TableBody>
  );
}
