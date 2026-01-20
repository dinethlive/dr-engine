"use client";

import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Prompt } from "@/lib/db";
import { PromptCard } from "../card/prompt-card";

interface PromptsListProps {
  isLoading: boolean;
  prompts: Prompt[];
  searchQuery: string;
  onDelete: (id: number) => void;
  onDuplicate: (id: number) => void;
  onEdit: (prompt: Prompt) => void;
  onCreate: () => void;
}

export function PromptsList({
  isLoading,
  prompts,
  searchQuery,
  onDelete,
  onDuplicate,
  onEdit,
  onCreate,
}: PromptsListProps) {
  if (isLoading) {
    return <div className="text-center py-10">Loading prompts...</div>;
  }

  if (prompts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No prompts found</h3>
          <p className="text-muted-foreground mt-1 mb-4">
            {searchQuery
              ? "Try a different search term"
              : "Create your first custom prompt"}
          </p>
          <Button className="gap-2" onClick={onCreate}>
            <Plus className="h-4 w-4" />
            Create Prompt
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
