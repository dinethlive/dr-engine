"use client";

import { useState } from "react";

export function useHistoryFilter() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  return { statusFilter, setStatusFilter };
}
