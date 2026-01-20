"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { type Section, type Workflow } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { useAnswerGenerationApi } from "./use-answer-generation-api";
import { useBulkAnswerLifecycle } from "./use-bulk-answer-lifecycle";
import { getPendingSections, getAllAnswerArtifacts } from "@/lib/workspace";

interface UseBulkAnswerProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useBulkAnswer({ chat, workflow }: UseBulkAnswerProps) {
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [autoGenerateProgress, setAutoGenerateProgress] = useState({
    current: 0,
    total: 0,
  });

  const { generate } = useAnswerGenerationApi({ workflow });
  const {
    handleBulkStart,
    handleBulkProgress,
    handleBulkSectionSuccess,
    handleBulkSectionError,
    handleBulkComplete,
  } = useBulkAnswerLifecycle({ chat });

  const autoGenerateAll = async (promptId: string, modelId: string) => {
    if (!workflow.currentWorkflow || !promptId || !modelId) return;

    const pending = getPendingSections(workflow.currentWorkflow);
    if (pending.length === 0) return;

    setIsAutoGenerating(true);
    setAutoGenerateProgress({ current: 0, total: pending.length });

    const workflowId = String(workflow.currentWorkflow.id);
    const thinkingId = handleBulkStart(pending.length, workflowId);

    let latestWorkflow = workflow.currentWorkflow;

    for (let i = 0; i < pending.length; i++) {
      const section = pending[i];
      setAutoGenerateProgress({ current: i + 1, total: pending.length });

      handleBulkProgress(section);

      try {
        latestWorkflow = (await generate(
          workflowId,
          String(section.id),
          modelId
        )) as unknown as Workflow;

        const updatedSection = latestWorkflow.sections.find(
          (s: Section) => String(s.id) === String(section.id)
        );

        if (updatedSection) {
          handleBulkSectionSuccess(updatedSection);
        }
      } catch (err) {
        handleBulkSectionError(section, err);
      }
    }

    const answerArtifacts = getAllAnswerArtifacts(latestWorkflow);

    handleBulkComplete(thinkingId, answerArtifacts);

    setIsAutoGenerating(false);
  };

  return {
    isAutoGenerating,
    autoGenerateProgress,
    autoGenerateAll,
  };
}
