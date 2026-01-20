"use client";

import { TableHeader, TableRow } from "@/components/ui/table";
import { SortConfig, VisibleColumns } from "@/hooks/usage/use-usage-table";
import { SortableHead } from "./sortable-head";
import { ModelFilterHead } from "./model-filter-head";
import { WorkflowHeaderCell } from "./workflow-header-cell";

interface UsageTableHeaderProps {
  visibleColumns: VisibleColumns;
  sortConfig: SortConfig;
  allModels: string[];
  selectedModels: string[];
  onSort: (key: string) => void;
  onModelChange: (models: string[]) => void;
}

export function UsageTableHeader({
  visibleColumns,
  sortConfig,
  allModels,
  selectedModels,
  onSort,
  onModelChange,
}: UsageTableHeaderProps) {
  return (
    <TableHeader>
      <TableRow>
        {visibleColumns.date && (
          <SortableHead
            title="Date"
            sortKey="date"
            sortConfig={sortConfig}
            onSort={onSort}
          />
        )}
        {visibleColumns.workflow && <WorkflowHeaderCell />}
        {visibleColumns.model && (
          <ModelFilterHead
            allModels={allModels}
            selectedModels={selectedModels}
            onModelChange={onModelChange}
          />
        )}
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
        {visibleColumns.cost && (
          <SortableHead
            title="Cost"
            sortKey="cost"
            sortConfig={sortConfig}
            onSort={onSort}
            align="right"
          />
        )}
      </TableRow>
    </TableHeader>
  );
}
