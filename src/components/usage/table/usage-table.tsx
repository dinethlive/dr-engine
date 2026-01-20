"use client";

import { Usage } from "@/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { useUsageTable } from "@/hooks/usage/use-usage-table";
import { ColumnToggle } from "./atoms/column-toggle";
import { UsageTableHeader } from "./header/usage-table-header";
import { UsageTableBody } from "./body/usage-table-body";
import { UsageTablePagination } from "./usage-table-pagination";
import { DateRangePickerWithPresets } from "./atoms/date-range-picker-with-presets";

import { DateRange } from "react-day-picker";

interface UsageTableProps {
  filteredHistory: Usage[];
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  selectedModels: string[];
  setSelectedModels: (models: string[]) => void;
  allModels: string[];
}

export function UsageTable({
  filteredHistory,
  dateRange,
  setDateRange,
  selectedModels,
  setSelectedModels,
  allModels,
}: UsageTableProps) {
  const {
    visibleColumns,
    sortConfig,
    paginatedHistory,
    requestSort,
    toggleColumn,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    filteredAndSortedUsageHistory,
  } = useUsageTable(filteredHistory);

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 space-y-0">
        <div>
          <CardTitle>Usage History</CardTitle>
          <CardDescription>
            Detailed breakdown of API usage per request
          </CardDescription>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
          <DateRangePickerWithPresets
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <ColumnToggle
            visibleColumns={visibleColumns}
            onToggle={toggleColumn}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="overflow-x-auto scrollbar-subtle border rounded-lg">
            <Table>
              <UsageTableHeader
                visibleColumns={visibleColumns}
                sortConfig={sortConfig}
                allModels={allModels}
                selectedModels={selectedModels}
                onSort={requestSort}
                onModelChange={setSelectedModels}
              />
              <UsageTableBody
                filteredAndSortedUsageHistory={paginatedHistory}
                visibleColumns={visibleColumns}
                selectedModels={selectedModels}
              />
            </Table>
          </div>
          <UsageTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
            totalRows={filteredAndSortedUsageHistory.length}
          />
        </div>
      </CardContent>
    </Card>
  );
}
