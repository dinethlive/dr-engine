"use client";

import { toast } from "sonner";
import { type Section, type Workflow, type Artifact } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { createSuccessMessages, createErrorMessages, createStartMessages } from "@/lib/workspace/answer-messages";
import { api } from "@/lib/api";

interface UseSingleAnswerLifecycleProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
}

export function useSingleAnswerLifecycle({
  chat,
  workflow,
}: UseSingleAnswerLifecycleProps) {
  const handleStart = (
    title: string,
    workflowId: string,
    sectionId: string,
    label: string
  ) => {
    const { userMsg, thinkingMsg, thinkingId, artifactStatus, toastMessage } =
      createStartMessages(title, workflowId, sectionId, label);

    chat.addMessage(userMsg);
    chat.addMessage(thinkingMsg);


    chat.updateArtifactBySectionId(sectionId, artifactStatus);
    workflow.setSelectedArtifact(null);

    const toastId = toast.loading(toastMessage);

    return { thinkingId, toastId };
  };

  const handleSuccess = (
    updatedWorkflow: Workflow,
    sectionId: string,
    title: string,
    label: string,
    thinkingId: string,
    workflowId: string,
    toastId: string | number
  ) => {
    const section = updatedWorkflow.sections.find(
      (s: Section) => String(s.id) === String(sectionId)
    );
    if (!section) throw new Error("Section not found");

    const { answerArtifact, messageUpdate, artifactUpdate, toastMessage } =
      createSuccessMessages(section, title, label, workflowId);

    chat.updateMessage(thinkingId, messageUpdate);
    chat.updateArtifactBySectionId(sectionId, artifactUpdate);
    workflow.setCurrentWorkflow(updatedWorkflow);
    workflow.setSelectedArtifact(answerArtifact as Artifact);

    toast.success(toastMessage, { id: toastId });
  };

  const handleError = (
    error: unknown,
    sectionId: string,
    title: string,
    label: string,
    thinkingId: string,
    toastId: string | number
  ) => {
    const { messageUpdate, artifactUpdate, toastMessage } = createErrorMessages(
      title,
      label
    );

    chat.updateMessage(thinkingId, messageUpdate);
    chat.updateArtifactBySectionId(sectionId, artifactUpdate);

    toast.error(toastMessage, { id: toastId });
  };

  return { handleStart, handleSuccess, handleError };
}
