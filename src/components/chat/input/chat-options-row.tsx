"use client";

import { useState } from "react";
import { Model, Prompt } from "@/hooks/use-chat-input";
import { ModelSelector } from "./model-selector";
import { FocusSelector } from "./focus-selector";
import { RecencySelector } from "./recency-selector";
import { PromptSelector } from "./prompt-selector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatOptionsRowProps {
  modelId: string;
  onModelChange: (value: string) => void;
  models: Model[];
  searchFocus: "web" | "academic" | "reddit";
  onSearchFocusChange: (value: "web" | "academic" | "reddit") => void;
  recency: "all" | "month" | "week" | "day";
  onRecencyChange: (value: "all" | "month" | "week" | "day") => void;
  questionPromptId: string;
  onQuestionPromptChange: (value: string) => void;
  questionPrompts: Prompt[];
  isLoading: boolean;
}

function OptionTooltip({
  children,
  content,
  isAnyMenuOpen,
}: {
  children: React.ReactNode;
  content: string;
  isAnyMenuOpen: boolean;
}) {
  const [open, setOpen] = useState(false);

  // If any menu is open, force tooltip closed
  const showTooltip = isAnyMenuOpen ? false : open;

  return (
    <Tooltip open={showTooltip} onOpenChange={setOpen}>
      <TooltipTrigger asChild>
        <div className="w-full cursor-pointer" onClick={() => setOpen(false)}>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function ChatOptionsRow({
  modelId,
  onModelChange,
  models,
  searchFocus,
  onSearchFocusChange,
  recency,
  onRecencyChange,
  questionPromptId,
  onQuestionPromptChange,
  questionPrompts,
  isLoading,
}: ChatOptionsRowProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const isAnyMenuOpen = !!openMenu;

  return (
    <TooltipProvider delayDuration={1000}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        <OptionTooltip content="Select AI Model" isAnyMenuOpen={isAnyMenuOpen}>
          <div className="w-full">
            <ModelSelector
              value={modelId}
              onValueChange={onModelChange}
              models={models}
              disabled={isLoading}
              onOpenChange={(open) => setOpenMenu(open ? "model" : null)}
            />
          </div>
        </OptionTooltip>

        <OptionTooltip
          content="Search Focus Mode"
          isAnyMenuOpen={isAnyMenuOpen}
        >
          <div className="w-full">
            <FocusSelector
              value={searchFocus}
              onValueChange={onSearchFocusChange}
              disabled={isLoading}
              onOpenChange={(open) => setOpenMenu(open ? "focus" : null)}
            />
          </div>
        </OptionTooltip>

        <OptionTooltip content="Content Recency" isAnyMenuOpen={isAnyMenuOpen}>
          <div className="w-full">
            <RecencySelector
              value={recency}
              onValueChange={onRecencyChange}
              disabled={isLoading}
              onOpenChange={(open) => setOpenMenu(open ? "recency" : null)}
            />
          </div>
        </OptionTooltip>

        {questionPrompts.length > 0 && (
          <OptionTooltip
            content="Prompt Template"
            isAnyMenuOpen={isAnyMenuOpen}
          >
            <div className="w-full">
              <PromptSelector
                value={questionPromptId}
                onValueChange={onQuestionPromptChange}
                prompts={questionPrompts}
                disabled={isLoading}
                onOpenChange={(open) => setOpenMenu(open ? "prompt" : null)}
              />
            </div>
          </OptionTooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
