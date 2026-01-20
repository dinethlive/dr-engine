"use client";

import { useChat } from "./chat/use-chat";
import { useWorkflow } from "./state/use-workflow";
import { useResizablePanel } from "./ui/use-resizable-panel";
import { useInitialData } from "./state/use-initial-data";
import { useResearchProcessor } from "./research/use-research-processor";
import { useLoadWorkflow } from "./state/use-load-workflow";

export function useWorkspace() {
  const { models, questionPrompts, answerPrompts, isLoadingData } =
    useInitialData();
  const chat = useChat();
  const workflow = useWorkflow();
  const processor = useResearchProcessor({
    chat,
    workflow,
    answerPrompts,
    models,
  });
  const { isLoadingWorkflow } = useLoadWorkflow({ chat, workflow });
  const { width, isResizing, startResizing } = useResizablePanel();

  const isArtifactOpen = !!workflow.selectedArtifact;

  const showGenerateAnswers =
    workflow.selectedArtifact?.type === "questions" &&
    !workflow.selectedArtifact?.hasAnswers;

  const showRetryAnswers = workflow.selectedArtifact?.type === "answers";

  const { hasPendingSections, allSectionsComplete } = workflow;

  const canGenerateAll = !!workflow.currentWorkflow && hasPendingSections;
  const canDownload = allSectionsComplete;

  const handleGenerateAnswers = () => {
    if (workflow.selectedArtifact?.sectionId && workflow.currentWorkflow) {
      processor.generateSectionAnswers(
        workflow.selectedArtifact.sectionId,
        String(workflow.currentWorkflow.id)
      );
    }
  };

  const isLoading = isLoadingData || isLoadingWorkflow;

  return {
    // Data
    models,
    questionPrompts,
    answerPrompts,
    chat,
    workflow,
    processor,

    // UI State
    width,
    isResizing,
    isArtifactOpen,
    isLoading,
    showGenerateAnswers,
    showRetryAnswers,
    hasPendingSections,
    allSectionsComplete,
    canGenerateAll,
    canDownload,

    // Actions
    startResizing,
    handleGenerateAnswers,
  };
}

export type WorkspaceState = ReturnType<typeof useWorkspace>;
