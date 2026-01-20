"use client";

import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisibleColumns } from "@/hooks/usage/use-usage-table";

interface ColumnToggleProps {
  visibleColumns: VisibleColumns;
  onToggle: (column: keyof VisibleColumns) => void;
}

export function ColumnToggle({ visibleColumns, onToggle }: ColumnToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex w-full sm:w-auto">
          <Settings2 className="mr-2 h-4 w-4" />
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(visibleColumns) as Array<keyof VisibleColumns>).map(
          (column) => (
            <DropdownMenuCheckboxItem
              key={column}
              className="capitalize"
              checked={visibleColumns[column]}
              onCheckedChange={() => onToggle(column)}
            >
              {column.replace(/([A-Z])/g, " $1")}
            </DropdownMenuCheckboxItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
