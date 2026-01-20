"use client";

import { useState } from "react";
import { Usage } from "@/lib/db";

export type SortConfig = {
  key: string;
  direction: "asc" | "desc" | null;
};

export function useUsageSort() {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "date",
    direction: "desc",
  });

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const sortItems = (items: Usage[]) => {
    if (sortConfig.direction === null) return items;

    return [...items].sort((a: Usage, b: Usage) => {
      const key = sortConfig.key as keyof Usage;
      const aValue =
        sortConfig.key === "workflow" ? a.workflowName || "" : a[key] ?? "";
      const bValue =
        sortConfig.key === "workflow" ? b.workflowName || "" : b[key] ?? "";

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  return { sortConfig, requestSort, sortItems };
}
