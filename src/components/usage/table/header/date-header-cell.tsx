"use client";

import { SortableHead } from "./sortable-head";
import { SortConfig } from "@/hooks/usage/use-usage-table";

interface DateHeaderCellProps {
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function DateHeaderCell({ sortConfig, onSort }: DateHeaderCellProps) {
  return (
    <SortableHead
      title="Date"
      sortKey="date"
      sortConfig={sortConfig}
      onSort={onSort}
    />
  );
}
