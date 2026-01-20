"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromptsHeaderProps {
  onCreate: () => void;
}

export function PromptsHeader({ onCreate }: PromptsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Prompts</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          Manage question and answer generation templates
        </p>
      </div>
      <Button className="gap-2 w-full md:w-auto" onClick={onCreate}>
        <Plus className="h-4 w-4" />
        New Prompt
      </Button>
    </div>
  );
}
