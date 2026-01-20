"use client";

import { useState } from "react";
import { Prompt } from "@/lib/db";
import {
  PromptDialog,
  PromptsHeader,
  PromptsFilters,
  PromptsList,
} from "@/components/prompts";
import { usePrompts } from "@/hooks/prompts/use-prompts";

export default function PromptsPage() {
  const {
    prompts,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    handleDelete,
    handleDuplicate,
  } = usePrompts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | undefined>(
    undefined
  );

  const handleCreate = () => {
    setEditingPrompt(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsDialogOpen(true);
  };

  return (
    <div className="h-full overflow-auto">
      <div className="flex flex-col gap-6 p-4 md:p-6 pt-16 md:pt-6 max-w-5xl mx-auto">
        <PromptsHeader onCreate={handleCreate} />
        <PromptsFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <PromptsList
          isLoading={isLoading}
          prompts={prompts}
          searchQuery={searchQuery}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
        <PromptDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          prompt={editingPrompt}
        />
      </div>
    </div>
  );
}
