import { WorkspaceActions } from "@/components/workspace";
import { useAutoScroll } from "@/hooks/workspace/chat/use-auto-scroll";
import { MessageItem } from "./message-item";
import { type WorkspaceState } from "@/hooks/workspace/use-workspace";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserMessage, AIMessage } from "@/components/chat/messages";
import { type Message } from "@/types/workspace";

export function ChatMessagesList({ workspace }: { workspace: WorkspaceState }) {
  const {
    chat,
    models,
    answerPrompts,
    workflow,
    processor,
    hasPendingSections,
    allSectionsComplete,
  } = workspace;

  const messages = chat.messages;
  const scrollRef = useAutoScroll(messages);

  const showGenerateAll = !!workflow.currentWorkflow && hasPendingSections;
  const showDownload = allSectionsComplete;

  return (
    <div
      className="flex-1 overflow-y-auto px-4 scrollbar-subtle"
      ref={scrollRef}
    >
      <div className="max-w-3xl mx-auto py-6">
        {messages.map((message, index) => (
          <MessageItem
            key={message.id}
            message={message}
            index={index}
            messages={messages}
            selectedArtifactId={workflow.selectedArtifact?.id}
            onArtifactClick={workflow.setSelectedArtifact}
            onSubmit={processor.createResearch}
            onDownload={processor.downloadResearch}
            showDownload={showDownload}
            onGenerateSectionAnswers={processor.generateSectionAnswers}
          />
        ))}

        <WorkspaceActions workspace={workspace} />
      </div>
    </div>
  );
}
