"use client";

import { Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Model } from "@/hooks/use-chat-input";

interface ModelSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  models: Model[];
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ModelSelector({
  value,
  onValueChange,
  models,
  disabled,
  onOpenChange,
}: ModelSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className="h-8 w-full text-xs border-dashed">
        <Zap className="h-3 w-3 mr-1 text-yellow-500" />
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id} className="text-xs">
            {model.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
