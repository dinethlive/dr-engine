import { useState } from "react";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { useSingleAnswer } from "./use-single-answer";
import { useBulkAnswer } from "./use-bulk-answer";

interface UseAnswerGenerationProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useAnswerGeneration({
  chat,
  workflow,
}: UseAnswerGenerationProps) {
  const [selectedAnswerPromptId, setSelectedAnswerPromptId] =
    useState<string>("");
  const [selectedAnswerModelId, setSelectedAnswerModelId] =
    useState<string>("");

  // Sub-hooks
  const single = useSingleAnswer({ chat, workflow });
  const bulk = useBulkAnswer({ chat, workflow });

  // Wrappers to inject prompt ID and model ID
  const generateSectionAnswers = async (
    sectionId: string,
    workflowId: string,
    overrideModelId?: string,
    overridePromptId?: string
  ) => {
    // Fallback order: Explicit override > UI Selection > Workflow default > Global default
    const promptId =
      overridePromptId ||
      selectedAnswerPromptId ||
      (workflow.currentWorkflow?.sections[0] as any)?.answerPromptId ||
      "-101";
    const modelId =
      overrideModelId || selectedAnswerModelId || "sonar-pro";

    console.log("useAnswerGeneration: generateSectionAnswers", {
      sectionId,
      workflowId,
      promptId,
      modelId,
    });
    await single.generateSectionAnswers(
      sectionId,
      workflowId,
      String(promptId),
      String(modelId)
    );
  };

  const autoGenerateAll = async () => {
    await bulk.autoGenerateAll(selectedAnswerPromptId, selectedAnswerModelId);
  };

  return {
    // State
    isGeneratingAnswers: single.isGenerating,
    isAutoGenerating: bulk.isAutoGenerating,
    autoGenerateProgress: bulk.autoGenerateProgress,
    selectedAnswerPromptId,
    selectedAnswerModelId,

    // Setters
    setSelectedAnswerPromptId,
    setSelectedAnswerModelId,

    // Actions
    generateSectionAnswers,
    autoGenerateAll,
  };
}
