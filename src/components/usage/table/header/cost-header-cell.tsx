"use client";

import { SortableHead } from "./sortable-head";
import { SortConfig } from "@/hooks/usage/use-usage-table";

interface CostHeaderCellProps {
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function CostHeaderCell({ sortConfig, onSort }: CostHeaderCellProps) {
  return (
    <SortableHead
      title="Cost"
      sortKey="cost"
      sortConfig={sortConfig}
      onSort={onSort}
      align="right"
    />
  );
}
