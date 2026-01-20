"use client";

import { ChatInput } from "@/components/chat/input";
import { type Model, type Prompt } from "@/types/workspace";

interface ChatInputContainerProps {
  models: Model[];
  questionPrompts: Prompt[];
  isLoading: boolean;
  onSubmit: (
    topic: string,
    modelId: string,
    questionPromptId: string,
    options?: any
  ) => void;
}

export function ChatInputContainer({
  models,
  questionPrompts,
  isLoading,
  onSubmit,
}: ChatInputContainerProps) {
  return (
    <div className="p-4 border-t bg-background/95 backdrop-blur flex-shrink-0">
      <div className="max-w-3xl mx-auto">
        <ChatInput
          onSubmit={onSubmit}
          models={models}
          questionPrompts={questionPrompts}
          isLoading={isLoading}
          placeholder="Start a new research topic..."
        />
      </div>
    </div>
  );
}
