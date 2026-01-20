"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { HistoryHeader } from "@/components/history/header/history-header";
import { HistoryFilters } from "@/components/history/filters/history-filters";
import { HistoryList } from "@/components/history/list/history-list";
import { useHistory } from "@/hooks/history/use-history";
import { HistoryPagination } from "@/components/history/list/history-pagination";

export default function HistoryPage() {
  const {
    workflows,
    isLoading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    deletingId,
    isDeletingAll,
    handleDelete,
    handleDeleteAll,
    rawWorkflowsCount,
    // Pagination
    totalItems,
    totalPages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = useHistory();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-6 p-4 md:p-6 pt-16 md:pt-6 max-w-5xl mx-auto pb-20">
        <HistoryHeader
          rawWorkflowsCount={rawWorkflowsCount}
          isDeletingAll={isDeletingAll}
          handleDeleteAll={handleDeleteAll}
        />
        <HistoryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <div className="flex flex-col gap-6">
          <HistoryList
            isLoading={isLoading}
            workflows={workflows}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            handleDelete={handleDelete}
            deletingId={deletingId}
          />

          {!isLoading && workflows.length > 0 && (
            <HistoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              setPage={setCurrentPage}
              setPageSize={setPageSize}
              totalItems={totalItems}
            />
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
