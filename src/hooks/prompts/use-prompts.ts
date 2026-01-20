"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { toast } from "sonner";
import { db } from "@/lib/db";
import { api } from "@/lib/api";

export function usePrompts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Live Query for Prompts
  const prompts = useLiveQuery(() =>
    db.prompts.orderBy("createdAt").reverse().toArray()
  );

  // Computed states
  const isLoading = prompts === undefined;

  const filteredPrompts =
    prompts?.filter((prompt) => {
      const matchesSearch = prompt.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isSystem = prompt.id && prompt.id < 0; // Negative IDs are system prompts
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "system" && isSystem) ||
        (activeTab === "my" && !isSystem);
      return matchesSearch && matchesTab;
    }) || [];

  // Seed defaults
  useEffect(() => {
    const seedDefaults = async () => {
      const count = await db.prompts.count();
      if (count === 0) {
        const defaults = await api.getDefaultPrompts();
        await db.prompts.bulkAdd(defaults);
      }
    };
    seedDefaults();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.deletePrompt(id);
      toast.success("Prompt deleted");
    } catch (error) {
      toast.error("Failed to delete prompt");
      console.error(error);
    }
  };

  const handleUpdate = async (id: number, data: any) => {
    try {
      await api.updatePrompt(id, data);
      toast.success("Prompt updated");
    } catch (error) {
      toast.error("Failed to update prompt");
      console.error(error);
    }
  };

  const handleDuplicate = async (id: number) => {
    try {
      await api.duplicatePrompt(id);
      toast.success("Prompt duplicated");
    } catch (error) {
      toast.error("Failed to duplicate prompt");
      console.error(error);
    }
  };

  return {
    prompts: filteredPrompts,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleDelete,
    handleUpdate,
    handleDuplicate,
  };
}
