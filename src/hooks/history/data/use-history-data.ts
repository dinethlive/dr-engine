"use client";

import { useState, useEffect } from "react";
import { api, Workflow } from "@/lib/api";

export function useHistoryData() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    setIsLoading(true);
    try {
      const data = await api.getWorkflows();
      setWorkflows(data as unknown as Workflow[]);
    } catch (error) {
      console.error("Failed to fetch workflows:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    setDeletingId(String(id));
    try {
      await api.deleteWorkflow(id);
      setWorkflows((prev) => prev.filter((w) => w.id !== id));
      window.dispatchEvent(new CustomEvent("research-deleted", { detail: { id } }));
    } catch (error) {
      console.error("Failed to delete workflow:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      await api.clearAllWorkflows();
      setWorkflows([]);
      window.dispatchEvent(new CustomEvent("research-deleted")); // Re-using same event or creating separate if needed, but generic fetch refresh works for both
    } catch (error) {
      console.error("Failed to delete all workflows:", error);
    } finally {
      setIsDeletingAll(false);
    }
  };

  return {
    workflows,
    setWorkflows,
    isLoading,
    deletingId,
    isDeletingAll,
    handleDelete,
    handleDeleteAll,
  };
}
