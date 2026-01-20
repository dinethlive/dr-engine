"use client";

import { SortableHead } from "./sortable-head";
import { SortConfig, VisibleColumns } from "@/hooks/usage/use-usage-table";

interface TokensHeaderCellsProps {
  visibleColumns: VisibleColumns;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
}

export function TokensHeaderCells({
  visibleColumns,
  sortConfig,
  onSort,
}: TokensHeaderCellsProps) {
  return (
    <>
      {visibleColumns.inputTokens && (
        <SortableHead
          title="Input Tokens"
          sortKey="inputTokens"
          sortConfig={sortConfig}
          onSort={onSort}
          align="right"
        />
      )}
      {visibleColumns.outputTokens && (
        <SortableHead
          title="Output Tokens"
          sortKey="outputTokens"
          sortConfig={sortConfig}
          onSort={onSort}
          align="right"
        />
      )}
    </>
  );
}
