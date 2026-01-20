"use client";

import { ChatInput } from "@/components/chat/input";
import { type Model, type Prompt } from "@/types/workspace";
import { BackgroundCircles } from "./background-circles";
import { FormulaAnimation } from "./formula-animation";
import { Header } from "./header";

interface WorkspaceEmptyStateProps {
  models: Model[];
  questionPrompts: Prompt[];
  isLoading: boolean;
  onSubmit: (
    topic: string,
    modelId: string,
    promptId: string,
    options?: any
  ) => void;
}

export function WorkspaceEmptyState({
  models,
  questionPrompts,
  isLoading,
  onSubmit,
}: WorkspaceEmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/10 via-background to-background animate-gradient-xy">
      <div className="relative mb-8">
        <BackgroundCircles />
        <FormulaAnimation />
      </div>
      <Header />
      <div className="w-full max-w-2xl">
        <ChatInput
          onSubmit={onSubmit}
          models={models}
          questionPrompts={questionPrompts}
          isLoading={isLoading}
          placeholder="e.g., The Future of Renewable Energy..."
        />
      </div>
    </div>
  );
}
