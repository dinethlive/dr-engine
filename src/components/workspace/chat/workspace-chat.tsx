"use client";

import { ChatMessagesList } from "./chat-messages-list";
import { ChatInputContainer } from "./chat-input-container";
import { type WorkspaceState } from "@/hooks/workspace/use-workspace";

export function WorkspaceChat({ workspace }: { workspace: WorkspaceState }) {
  const { models, questionPrompts, chat, processor } = workspace;

  return (
    <>
      <ChatMessagesList workspace={workspace} />
      <ChatInputContainer
        models={models}
        questionPrompts={questionPrompts}
        isLoading={processor.isLoading}
        onSubmit={processor.createResearch}
      />
    </>
  );
}
