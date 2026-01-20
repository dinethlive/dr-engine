"use client";

import { HistorySearchInput } from "./history-search-input";
import { HistoryStatusSelect } from "./history-status-select";

interface HistoryFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export function HistoryFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
      <HistorySearchInput value={searchQuery} onChange={setSearchQuery} />
      <HistoryStatusSelect
        value={statusFilter}
        onValueChange={setStatusFilter}
      />
    </div>
  );
}
