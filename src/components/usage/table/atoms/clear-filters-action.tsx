"use client";

import {
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface ClearFiltersActionProps {
  onClear: () => void;
  isVisible: boolean;
}

export function ClearFiltersAction({
  onClear,
  isVisible,
}: ClearFiltersActionProps) {
  if (!isVisible) return null;

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem
        onSelect={(e) => {
          e.preventDefault();
          onClear();
        }}
        className="justify-center text-destructive focus:text-destructive"
      >
        Clear Filters
      </DropdownMenuCheckboxItem>
    </>
  );
}
