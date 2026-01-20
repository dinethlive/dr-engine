"use client";

import { FileQuestion } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prompt } from "@/hooks/use-chat-input";

interface PromptSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  prompts: Prompt[];
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PromptSelector({
  value,
  onValueChange,
  prompts,
  disabled,
  onOpenChange,
}: PromptSelectorProps) {
  if (prompts.length === 0) return null;

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className="h-8 w-full text-xs border-dashed">
        <FileQuestion className="h-3 w-3 mr-1 text-blue-500" />
        <SelectValue placeholder="Prompt template..." />
      </SelectTrigger>
      <SelectContent>
        {prompts.map((prompt) => (
          <SelectItem
            key={prompt.id}
            value={String(prompt.id)}
            className="text-xs"
          >
            {prompt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
