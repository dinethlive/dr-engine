import { type WorkspaceState } from "@/hooks/workspace/use-workspace";
import { GenerateActions } from "./generate-actions";
import { DownloadActions } from "./download-actions";
import { ProgressDisplay } from "./progress-display";

export function WorkspaceActions({ workspace }: { workspace: WorkspaceState }) {
  const { models, answerPrompts, processor, canGenerateAll, canDownload } =
    workspace;

  const {
    autoGenerateAll,
    downloadResearch,
    isAutoGenerating,
    autoGenerateProgress,
    isLoading,
    selectedAnswerPromptId,
    setSelectedAnswerPromptId,
    selectedAnswerModelId,
    setSelectedAnswerModelId,
  } = processor;

  const showGenerateAll = canGenerateAll;
  const showDownload = canDownload;

  if (!showGenerateAll && !showDownload && !isAutoGenerating) return null;

  return (
    <>
      {!isAutoGenerating && (
        <div className="flex flex-wrap items-stretch justify-center gap-3 py-6 px-4 md:items-center md:px-0">
          {showGenerateAll && (
            <GenerateActions
              models={models}
              selectedModelId={selectedAnswerModelId}
              onModelChange={setSelectedAnswerModelId}
              answerPrompts={answerPrompts}
              selectedPromptId={selectedAnswerPromptId}
              onPromptChange={setSelectedAnswerPromptId}
              onGenerateAll={autoGenerateAll}
              disabled={isLoading}
            />
          )}

          {showDownload && (
            <DownloadActions
              onDownload={downloadResearch}
              disabled={isLoading}
            />
          )}
        </div>
      )}

      {isAutoGenerating && autoGenerateProgress && (
        <ProgressDisplay
          current={autoGenerateProgress.current}
          total={autoGenerateProgress.total}
        />
      )}
    </>
  );
}
