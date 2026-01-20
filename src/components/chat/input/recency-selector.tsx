"use client";

import { Clock3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecencySelectorProps {
  value: "all" | "month" | "week" | "day";
  onValueChange: (value: "all" | "month" | "week" | "day") => void;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RecencySelector({
  value,
  onValueChange,
  disabled,
  onOpenChange,
}: RecencySelectorProps) {
  return (
    <Select
      value={value}
      onValueChange={onValueChange as (v: string) => void}
      disabled={disabled}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger className="h-8 w-full text-xs border-dashed">
        <Clock3 className="h-3 w-3 mr-1 text-orange-500" />
        <SelectValue placeholder="Time" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="text-xs">
          Any Time
        </SelectItem>
        <SelectItem value="month" className="text-xs">
          Month
        </SelectItem>
        <SelectItem value="week" className="text-xs">
          Week
        </SelectItem>
        <SelectItem value="day" className="text-xs">
          24h
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
