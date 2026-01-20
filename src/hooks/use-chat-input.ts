import {
  useChatFormState,
} from "./chat/use-chat-form-state";
import { useChatSync } from "./chat/use-chat-sync";
import { useTextareaResize } from "./chat/use-textarea-resize";
import { useChatSubmit } from "./chat/use-chat-submit";
import { Model, Prompt, PerplexityOptions } from "./chat/types";

// Re-export types for backward compatibility
export type { Model, Prompt, PerplexityOptions };

interface UseChatInputProps {
  onSubmit: (
    topic: string,
    modelId: string,
    questionPromptId: string,
    options?: PerplexityOptions
  ) => void;
  models: Model[];
  questionPrompts: Prompt[];
  isLoading: boolean;
  disabled: boolean;
}

export function useChatInput({
  onSubmit,
  models,
  questionPrompts,
  isLoading,
  disabled,
}: UseChatInputProps) {
  // 1. Form State Management
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
  } = useChatFormState({ models, questionPrompts });

  // 2. Synchronization Logic
  useChatSync({
    models,
    questionPrompts,
    modelId,
    setModelId,
    questionPromptId,
    setQuestionPromptId,
  });

  // 3. UI Logic (Textarea Resize)
  const textareaRef = useTextareaResize(value);

  // 4. Submission Logic
  const { handleSubmit, handleKeyDown } = useChatSubmit({
    value,
    setValue,
    isLoading,
    disabled,
    questionPromptId,
    recency,
    searchFocus,
    modelId,
    onSubmit,
  });

  return {
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
  };
}
