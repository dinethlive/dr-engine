"use client";

import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FocusSelectorProps {
  value: "web" | "academic" | "reddit";
  onValueChange: (value: "web" | "academic" | "reddit") => void;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function FocusSelector({
  value,
  onValueChange,
  disabled,
  onOpenChange,
}: FocusSelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange as (v: string) => void}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className="h-8 w-full text-xs border-dashed">
        <Globe className="h-3 w-3 mr-1 text-teal-500" />
        <SelectValue placeholder="Focus" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="web" className="text-xs">
          Web (All)
        </SelectItem>
        <SelectItem value="academic" className="text-xs">
          Academic
        </SelectItem>
        <SelectItem value="reddit" className="text-xs">
          Reddit
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
