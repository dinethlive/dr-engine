"use client";

import { useRef, useEffect } from "react";

import {
  useChatInput,
  Model,
  Prompt,
  PerplexityOptions,
} from "@/hooks/use-chat-input";
import { useSettings } from "@/hooks/settings/use-settings";
import { ChatInputArea } from "./chat-input-area";
import { ChatOptionsRow } from "./chat-options-row";

interface ChatInputProps {
  onSubmit: (
    topic: string,
    modelId: string,
    questionPromptId: string,
    options?: PerplexityOptions
  ) => void;
  models: Model[];
  questionPrompts?: Prompt[];
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSubmit,
  models,
  questionPrompts = [],
  isLoading = false,
  disabled = false,
  placeholder = "Enter your research topic...",
}: ChatInputProps) {
  const {
    value,
    setValue,
    modelId,
    setModelId,
    questionPromptId,
    setQuestionPromptId,
    searchFocus,
    setSearchFocus,
    recency,
    setRecency,
    textareaRef,
    handleSubmit,
    handleKeyDown,
  } = useChatInput({
    onSubmit,
    models,
    questionPrompts,
    isLoading,
    disabled,
  });

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const hasInitializedModel = useRef(false);

  // Sync model with saved settings on load
  useEffect(() => {
    if (isLoadingSettings) return;

    if (
      !hasInitializedModel.current &&
      settings.defaultModel &&
      models.some((m) => m.id === settings.defaultModel)
    ) {
      setModelId(settings.defaultModel);
      hasInitializedModel.current = true;
    }
  }, [isLoadingSettings, settings.defaultModel, models, setModelId]);

  return (
    <div className="space-y-3">
      <ChatInputArea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        canSubmit={
          !!value.trim() && !isLoading && !disabled && !!questionPromptId
        }
      />

      <ChatOptionsRow
        modelId={modelId}
        onModelChange={setModelId}
        models={models}
        searchFocus={searchFocus}
        onSearchFocusChange={setSearchFocus}
        recency={recency}
        onRecencyChange={setRecency}
        questionPromptId={questionPromptId}
        onQuestionPromptChange={setQuestionPromptId}
        questionPrompts={questionPrompts}
        isLoading={isLoading}
      />
    </div>
  );
}
