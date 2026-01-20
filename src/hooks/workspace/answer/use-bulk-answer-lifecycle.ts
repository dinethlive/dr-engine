"use client";

import { useChat } from "../chat/use-chat";
import { type Section, type Artifact } from "@/types/workspace";
import {
  createBulkStartMessages,
  createBulkProgressArtifactStatus,
  createBulkSectionSuccessArtifactUpdate,
  createBulkSectionErrorArtifactUpdate,
  createBulkCompleteMessageUpdate,
} from "@/lib/workspace/answer-messages";

interface UseBulkAnswerLifecycleProps {
  chat: ReturnType<typeof useChat>;
}

export function useBulkAnswerLifecycle({ chat }: UseBulkAnswerLifecycleProps) {
  const handleBulkStart = (count: number, workflowId: string) => {
    const { userMsg, thinkingMsg, thinkingId } = createBulkStartMessages(
      count,
      workflowId
    );

    chat.addMessage(userMsg);
    chat.addMessage(thinkingMsg);

    return thinkingId;
  };

  const handleBulkProgress = (section: Section) => {
    const artifactStatus = createBulkProgressArtifactStatus(section);
    chat.updateArtifactGlobal(`section - ${section.id} `, artifactStatus);
  };

  const handleBulkSectionSuccess = (section: Section) => {
    const artifactUpdate = createBulkSectionSuccessArtifactUpdate(section);
    chat.updateArtifactGlobal(`section - ${section.id} `, artifactUpdate);
  };

  const handleBulkSectionError = (section: Section, error: unknown) => {
    console.error(
      `Error generating answers for "${section.themeTitle}": `,
      error
    );
    const artifactUpdate = createBulkSectionErrorArtifactUpdate();
    chat.updateArtifactGlobal(`section - ${section.id} `, artifactUpdate);
  };

  const handleBulkComplete = (thinkingId: string, artifacts: Artifact[]) => {
    const messageUpdate = createBulkCompleteMessageUpdate(artifacts);
    chat.updateMessage(thinkingId, messageUpdate);
  };

  return {
    handleBulkStart,
    handleBulkProgress,
    handleBulkSectionSuccess,
    handleBulkSectionError,
    handleBulkComplete,
  };
}
