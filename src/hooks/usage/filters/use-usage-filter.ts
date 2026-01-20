"use client";

import { useState, useMemo } from "react";
import { Usage } from "@/lib/db";
import { DateRange } from "react-day-picker";
import { isWithinInterval, startOfDay, endOfDay } from "date-fns";

export function useUsageFilter(usageHistory: Usage[]) {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const allModels = useMemo(() => {
    return Array.from(new Set(usageHistory.map((item) => item.model)));
  }, [usageHistory]);

  const filterItems = (items: Usage[]) => {
    let filtered = items;

    if (selectedModels.length > 0) {
      filtered = filtered.filter((item) => selectedModels.includes(item.model));
    }

    if (dateRange?.from) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        const from = startOfDay(dateRange.from!);
        const to = dateRange.to ? endOfDay(dateRange.to) : endOfDay(from);

        return isWithinInterval(itemDate, { start: from, end: to });
      });
    }

    return filtered;
  };

  return {
    selectedModels,
    allModels,
    setSelectedModels,
    filterItems,
    dateRange,
    setDateRange,
  };
}
