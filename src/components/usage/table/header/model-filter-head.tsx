"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableHead } from "@/components/ui/table";
import { ModelFilterItem } from "../atoms/model-filter-item";
import { ClearFiltersAction } from "../atoms/clear-filters-action";

interface ModelFilterHeadProps {
  allModels: string[];
  selectedModels: string[];
  onModelChange: (models: string[]) => void;
}

export function ModelFilterHead({
  allModels,
  selectedModels,
  onModelChange,
}: ModelFilterHeadProps) {
  const handleToggle = (model: string, checked: boolean) => {
    onModelChange(
      checked
        ? [...selectedModels, model]
        : selectedModels.filter((m) => m !== model)
    );
  };

  const handleClear = () => {
    onModelChange([]);
  };

  return (
    <TableHead>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 h-8 data-[state=open]:bg-accent"
          >
            Model
            <Filter className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          <DropdownMenuLabel>Filter by Model</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allModels.map((model) => (
            <ModelFilterItem
              key={model}
              model={model}
              isSelected={selectedModels.includes(model)}
              onToggle={(checked) => handleToggle(model, checked)}
            />
          ))}
          <ClearFiltersAction
            isVisible={selectedModels.length > 0}
            onClear={handleClear}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
}
