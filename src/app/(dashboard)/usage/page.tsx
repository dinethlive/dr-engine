"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UsageHeader } from "@/components/usage/header/usage-header";
import { UsageStats } from "@/components/usage/stats/usage-stats";
import { UsageTable } from "@/components/usage/table/usage-table";
import { useUsageFilter } from "@/hooks/usage/filters/use-usage-filter";

export default function UsagePage() {
  const usageHistory = useLiveQuery(
    () => db.usage.orderBy("date").reverse().toArray(),
    []
  );

  const {
    selectedModels,
    allModels,
    setSelectedModels,
    filterItems,
    dateRange,
    setDateRange,
  } = useUsageFilter(usageHistory || []);

  if (!usageHistory) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground animate-pulse">
          Loading usage data...
        </p>
      </div>
    );
  }

  const filteredHistory = filterItems(usageHistory);

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-6 p-4 md:p-6 pt-16 md:pt-6 max-w-5xl mx-auto">
        <UsageHeader usageHistory={usageHistory} />
        <UsageStats usageHistory={filteredHistory} />
        <UsageTable
          filteredHistory={filteredHistory}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          allModels={allModels}
        />
      </div>
    </ScrollArea>
  );
}
