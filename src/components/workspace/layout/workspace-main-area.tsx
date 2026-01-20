import { WorkspaceEmptyState } from "../empty/workspace-empty-state";
import { WorkspaceChat } from "../chat/workspace-chat";
import { type WorkspaceState } from "@/hooks/workspace/use-workspace";

export function WorkspaceMainArea({
  workspace,
}: {
  workspace: WorkspaceState;
}) {
  const {
    chat,
    models,
    questionPrompts,
    answerPrompts,
    processor,
    workflow,
    hasPendingSections,
    allSectionsComplete,
  } = workspace;

  return (
    <div className="flex-1 min-w-0 flex flex-col h-full bg-background transition-all duration-300 ease-in-out">
      {chat.messages.length === 0 ? (
        <WorkspaceEmptyState
          models={models}
          questionPrompts={questionPrompts}
          isLoading={processor.isLoading}
          onSubmit={processor.createResearch}
        />
      ) : (
        <WorkspaceChat workspace={workspace} />
      )}
    </div>
  );
}
