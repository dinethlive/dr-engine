"use client";

import { Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Model {
  id: string;
  name: string;
  displayName: string;
}

interface GeneratorModelSelectorProps {
  models: Model[];
  value?: string;
  onValueChange?: (modelId: string) => void;
  disabled?: boolean;
}

export function GeneratorModelSelector({
  models,
  value,
  onValueChange,
  disabled,
}: GeneratorModelSelectorProps) {
  if (models.length === 0) return null;

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full h-9 text-sm bg-white dark:bg-zinc-800">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <SelectValue placeholder="Select model..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
