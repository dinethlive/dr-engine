"use client";

import { api } from "@/lib/api";
import { type Workflow } from "@/types/workspace";

export function useResearchApi() {
  const createWorkflow = async (
    topic: string,
    modelId: string,
    questionPromptId: string,
    answerPromptId: string,
    options?: any
  ) => {
    const newWorkflow = await api.createWorkflow({
      topic,
      modelId,
      questionPromptId,
      answerPromptId,
      options,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!newWorkflow || !(newWorkflow as any).id) {
      throw new Error("Failed to create workflow");
    }
    return newWorkflow as unknown as Workflow;
  };

  const generateQuestions = async (workflowId: string) => {
    const updatedWorkflow = await api.generateQuestions(workflowId);
    return updatedWorkflow as unknown as Workflow;
  };

  return { createWorkflow, generateQuestions };
}
