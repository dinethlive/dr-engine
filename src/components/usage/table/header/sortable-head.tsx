"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { SortConfig } from "@/hooks/usage/use-usage-table";

interface SortableHeadProps {
  title: string;
  sortKey: string;
  sortConfig: SortConfig;
  onSort: (key: string) => void;
  align?: "left" | "right";
}

export function SortableHead({
  title,
  sortKey,
  sortConfig,
  onSort,
  align = "left",
}: SortableHeadProps) {
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key || sortConfig.direction === null) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4" />
    );
  };

  return (
    <TableHead className={align === "right" ? "text-right" : ""}>
      <Button
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className={`${align === "right" ? "ml-auto" : "-ml-4"
          } h-8 data-[state=open]:bg-accent`}
      >
        {title}
        {getSortIcon(sortKey)}
      </Button>
    </TableHead>
  );
}
