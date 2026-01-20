"use client";

import { useState } from "react";

export type VisibleColumns = {
  date: boolean;
  workflow: boolean;
  model: boolean;
  inputTokens: boolean;
  outputTokens: boolean;
  cost: boolean;
};

export function useColumnVisibility() {
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    date: true,
    workflow: true,
    model: true,
    inputTokens: true,
    outputTokens: true,
    cost: true,
  });

  const toggleColumn = (column: keyof VisibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  return { visibleColumns, toggleColumn };
}
