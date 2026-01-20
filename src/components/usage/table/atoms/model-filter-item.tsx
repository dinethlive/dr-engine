"use client";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

interface ModelFilterItemProps {
  model: string;
  isSelected: boolean;
  onToggle: (checked: boolean) => void;
}

export function ModelFilterItem({
  model,
  isSelected,
  onToggle,
}: ModelFilterItemProps) {
  return (
    <DropdownMenuCheckboxItem checked={isSelected} onCheckedChange={onToggle}>
      {model}
    </DropdownMenuCheckboxItem>
  );
}
