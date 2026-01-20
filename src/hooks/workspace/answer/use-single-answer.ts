"use client";

import { useState } from "react";
import { type Workflow } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { useAnswerGenerationApi } from "./use-answer-generation-api";
import { useSingleAnswerLifecycle } from "./use-single-answer-lifecycle";

interface UseSingleAnswerProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useSingleAnswer({ chat, workflow }: UseSingleAnswerProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { handleStart, handleSuccess, handleError } = useSingleAnswerLifecycle({
    chat,
    workflow,
  });
  const { generate } = useAnswerGenerationApi({ workflow });

  const generateSectionAnswers = async (
    sectionId: string,
    workflowId: string,
    promptId: string,
    modelId: string
  ) => {
    console.log("generateSectionAnswers called:", {
      sectionId,
      workflowId,
      promptId,
      modelId,
    });
    if (!promptId || !modelId) {
      console.error("Missing promptId or modelId:", { promptId, modelId });
      return;
    }

    const currentSection = workflow.currentWorkflow?.sections.find(
      (s) => s.id === sectionId
    );
    const title = currentSection?.themeTitle || "Section";

    const isRegen =
      currentSection?.status === "COMPLETED" || currentSection?.answersJson;
    const label = isRegen ? "Regenerating" : "Generating";

    setIsGenerating(true);
    const { thinkingId, toastId } = handleStart(
      title,
      workflowId,
      sectionId,
      label
    );

    try {
      const updatedWorkflow = (await generate(
        workflowId,
        sectionId,
        modelId
      )) as unknown as Workflow;
      handleSuccess(
        updatedWorkflow,
        sectionId,
        title,
        label,
        thinkingId,
        workflowId,
        toastId
      );
    } catch (error) {
      handleError(error, sectionId, title, label, thinkingId, toastId);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateSectionAnswers,
  };
}
