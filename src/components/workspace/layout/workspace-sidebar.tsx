import { ArtifactPanel } from "@/components/chat";
import { WorkspaceArtifactContainer } from "./workspace-artifact-container";
import { type WorkspaceState } from "@/hooks/workspace/use-workspace";

export function WorkspaceSidebar({ workspace }: { workspace: WorkspaceState }) {
  const {
    width,
    isArtifactOpen,
    isResizing,
    workflow,
    showGenerateAnswers,
    showRetryAnswers,
    answerPrompts,
    models,
    processor,
    handleGenerateAnswers,
  } = workspace;

  return (
    <WorkspaceArtifactContainer
      width={width}
      isOpen={isArtifactOpen}
      isResizing={isResizing}
    >
      <ArtifactPanel
        title={workflow.selectedArtifact?.title || ""}
        content={workflow.selectedArtifact?.content || ""}
        rawContent={workflow.selectedArtifact?.rawContent}
        isOpen={true}
        onClose={() => workflow.setSelectedArtifact(null)}
        showGenerateAnswers={!!showGenerateAnswers || !!showRetryAnswers}
        buttonLabel={
          showRetryAnswers ? "Regenerate Answers" : "Generate Answers"
        }
        answerPrompts={answerPrompts}
        selectedPromptId={processor.selectedAnswerPromptId}
        onPromptChange={processor.setSelectedAnswerPromptId}
        models={models}
        selectedModelId={processor.selectedAnswerModelId}
        onModelChange={processor.setSelectedAnswerModelId}
        onGenerateAnswers={handleGenerateAnswers}
        isGenerating={processor.isGeneratingAnswers}
      />
    </WorkspaceArtifactContainer>
  );
}
