"use client";

import { api } from "@/lib/api";
import { type Workflow } from "@/types/workspace";
import { useWorkflow } from "../state/use-workflow";

interface UseAnswerGenerationApiProps {
  workflow: ReturnType<typeof useWorkflow>;
}

export function useAnswerGenerationApi({
  workflow,
}: UseAnswerGenerationApiProps) {
  const generate = async (
    workflowId: string,
    sectionId: string,
    modelId: string
  ) => {
    await api.generateSectionAnswers(workflowId, sectionId, modelId);
    const updated = await api.getWorkflow(workflowId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(updated as any).id) throw new Error("Invalid workflow data");
    workflow.setCurrentWorkflow(updated as unknown as Workflow);
    return updated;
  };

  return { generate };
}
