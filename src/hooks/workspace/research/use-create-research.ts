"use client";

import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { type Prompt } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { useResearchLifecycle } from "./use-research-lifecycle";
import { getWorkflowMessages } from "@/lib/workspace/workflow-transformer";
import { useResearchApi } from "./use-research-api";
import { getDefaultAnswerPrompt } from "@/lib/workspace";

interface UseCreateResearchProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
  answerPrompts: Prompt[];
}

export function useCreateResearch({
  chat,
  workflow,
  answerPrompts,
}: UseCreateResearchProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { createWorkflow, generateQuestions } = useResearchApi();
  const { handleStart, handlePlaceholders, handleSuccess, handleError } =
    useResearchLifecycle({ chat });

  const createResearch = async (
    topic: string,
    modelId: string,
    questionPromptId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any
  ) => {
    const defaultAnswer = getDefaultAnswerPrompt(answerPrompts);

    setIsLoading(true);
    console.debug("[useCreateResearch] Received:", {
      topic,
      modelId,
      questionPromptId,
      options,
    });
    const thinkingId = handleStart(topic);

    try {
      const newWorkflow = await createWorkflow(
        topic,
        modelId,
        questionPromptId,
        String(defaultAnswer?.id || ""),
        options
      );

      handlePlaceholders(thinkingId, topic, String(newWorkflow.id));

      const updatedWorkflow = await generateQuestions(String(newWorkflow.id));

      workflow.setCurrentWorkflow(updatedWorkflow);

      handleSuccess(thinkingId, topic, updatedWorkflow);

      return defaultAnswer?.id;
    } catch (error: any) {
      // Suppress console.error for expected operational errors to avoid Next.js error overlay
      if (error?.code === "API_KEY_MISSING") {
        console.warn("[Research] API Key missing, showing UI error state.");
      } else {
        console.error(error);
      }
      handleError(thinkingId, error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    createResearch,
  };
}
