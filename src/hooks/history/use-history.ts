"use client";

import { useState } from "react";
import { useHistoryData } from "./data/use-history-data";
import { useHistorySearch } from "./state/use-history-search";
import { useHistoryFilter } from "./state/use-history-filter";
import { useFilteredWorkflows } from "./logic/use-filtered-workflows";

export function useHistory() {
  const {
    workflows,
    isLoading,
    deletingId,
    isDeletingAll,
    handleDelete,
    handleDeleteAll,
  } = useHistoryData();

  const { searchQuery, setSearchQuery } = useHistorySearch();
  const { statusFilter, setStatusFilter } = useHistoryFilter();

  const filteredWorkflows = useFilteredWorkflows(
    workflows,
    searchQuery,
    statusFilter
  );

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Pagination Logic
  const totalItems = filteredWorkflows.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedWorkflows = filteredWorkflows.slice(startIndex, endIndex);

  // Reset page when filters change
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return {
    workflows: paginatedWorkflows, // Return filtered & paginated list
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deletingId,
    isDeletingAll,
    handleDelete,
    handleDeleteAll,
    rawWorkflowsCount: workflows.length,
  };
}
