"use client";

import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusLabels: Record<string, string> = {
  CREATED: "Created",
  QUESTIONS_GENERATING: "Generating Questions",
  QUESTIONS_READY: "Questions Ready",
  ANSWERS_GENERATING: "Generating Answers",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

interface HistoryStatusSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function HistoryStatusSelect({
  value,
  onValueChange,
}: HistoryStatusSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Statuses</SelectItem>
        {Object.entries(statusLabels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
