"use client";

import { UserMessage, AIMessage } from "@/components/chat/messages";
import { type Message, type Artifact } from "@/types/workspace";

interface MessageItemProps {
  message: Message;
  index: number;
  messages: Message[];
  selectedArtifactId?: string;
  onArtifactClick: (artifact: Artifact) => void;
  onSubmit: (topic: string, modelId: string, promptId: string) => void;
  onDownload?: () => void;
  showDownload?: boolean;
  onGenerateSectionAnswers?: (
    sectionId: string,
    workflowId: string,
    modelId?: string,
    promptId?: string
  ) => void;
}

export function MessageItem({
  message,
  index,
  messages,
  selectedArtifactId,
  onArtifactClick,
  onSubmit,
  onDownload,
  showDownload,
  onGenerateSectionAnswers,
}: MessageItemProps) {
  if (message.role === "user") {
    return <UserMessage key={message.id} content={message.content} />;
  }

  return (
    <AIMessage
      key={message.id}
      content={message.content}
      error={message.error}
      artifacts={message.artifacts}
      onArtifactClick={onArtifactClick}
      selectedArtifactId={selectedArtifactId}
      isThinking={message.isThinking}
      onRetryArtifact={(artifact: Artifact) => {
        const workflowId = message.workflowId;
        if (artifact.sectionId && workflowId && onGenerateSectionAnswers) {
          onGenerateSectionAnswers(artifact.sectionId, workflowId);
        }
      }}
      onRetry={() => {
        // Case 1: Message contains section answers - regenerate those
        const answerArtifact = message.artifacts?.find(
          (a: Artifact) => a.type === "answers" && a.sectionId
        );
        const workflowId = message.workflowId;

        if (
          answerArtifact?.sectionId &&
          workflowId &&
          onGenerateSectionAnswers
        ) {
          onGenerateSectionAnswers(answerArtifact.sectionId, workflowId);
          return;
        }

        // Only allow default retry for the last message(s)
        const isLastMessage =
          index === messages.length - 1 ||
          (index === messages.length - 2 &&
            messages[messages.length - 1].role === "ai" &&
            messages[messages.length - 1].isThinking);

        if (isLastMessage) {
          // Case 2: Default retry logic - resubmit last user topic
          const lastUserMsg = [...messages]
            .reverse()
            .find((m) => m.role === "user");
          if (lastUserMsg) {
            onSubmit(lastUserMsg.content, "", "");
          }
        }
      }}
      onDownload={onDownload}
      showDownload={
        (showDownload && index === messages.length - 1) ||
        message.artifacts?.some((a: Artifact) => a.type === "questions")
      }
    />
  );
}
