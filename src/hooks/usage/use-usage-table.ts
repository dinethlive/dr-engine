"use client";

import { useMemo, useState } from "react";
import { Usage } from "@/lib/db";
import { useColumnVisibility, VisibleColumns } from "./table/use-column-visibility";
import { useUsageSort, SortConfig } from "./table/use-usage-sort";

export type { VisibleColumns, SortConfig };
import { DateRange } from "react-day-picker";

export function useUsageTable(filteredHistory: Usage[]) {
  const { visibleColumns, toggleColumn } = useColumnVisibility();
  const { sortConfig, requestSort, sortItems } = useUsageSort();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const filteredAndSortedUsageHistory = useMemo(() => {
    return sortItems(filteredHistory);
  }, [filteredHistory, sortItems]);

  const paginatedHistory = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredAndSortedUsageHistory.slice(
      startIndex,
      startIndex + rowsPerPage
    );
  }, [filteredAndSortedUsageHistory, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(
    filteredAndSortedUsageHistory.length / rowsPerPage
  );

  return {
    visibleColumns,
    sortConfig,
    filteredAndSortedUsageHistory,
    paginatedHistory,
    requestSort,
    toggleColumn,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
  };
}
