"use client";

import { useMemo } from "react";
import { Workflow } from "@/lib/api";

export function useFilteredWorkflows(
  workflows: Workflow[],
  searchQuery: string,
  statusFilter: string
) {
  return useMemo(() => {
    return workflows.filter((workflow) => {
      const matchesSearch = workflow.topic
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || workflow.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [workflows, searchQuery, statusFilter]);
}
