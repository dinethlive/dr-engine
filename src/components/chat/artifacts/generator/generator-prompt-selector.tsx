"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Prompt {
  id: string | number;
  name: string;
}

interface GeneratorPromptSelectorProps {
  prompts: Prompt[];
  value?: string;
  onValueChange?: (promptId: string) => void;
  disabled?: boolean;
}

export function GeneratorPromptSelector({
  prompts,
  value,
  onValueChange,
  disabled,
}: GeneratorPromptSelectorProps) {
  if (prompts.length === 0) return null;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full h-9 text-sm bg-white dark:bg-zinc-800">
        <SelectValue placeholder="Select answer template..." />
      </SelectTrigger>
      <SelectContent>
        {prompts.map((prompt) => (
          <SelectItem key={prompt.id} value={String(prompt.id)}>
            {prompt.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
