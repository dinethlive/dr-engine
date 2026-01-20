"use client";

import { useChat } from "../chat/use-chat";
import { type Workflow } from "@/types/workspace";
import { createStartMessages, createSuccessUpdate, createErrorUpdate, createPlaceholderUpdate } from "@/lib/workspace/research-messages";

interface UseResearchLifecycleProps {
  chat: ReturnType<typeof useChat>;
}

export function useResearchLifecycle({ chat }: UseResearchLifecycleProps) {
  const handleStart = (topic: string) => {
    const { userMsg, thinkingMsg, thinkingId } = createStartMessages(topic);
    chat.addMessage(userMsg);
    chat.addMessage(thinkingMsg);
    return thinkingId;
  };

  const handlePlaceholders = (
    thinkingId: string,
    topic: string,
    workflowId: string
  ) => {
    const update = createPlaceholderUpdate(topic, workflowId);
    chat.updateMessage(thinkingId, update);
  };

  const handleSuccess = (
    thinkingId: string,
    topic: string,
    workflow: Workflow
  ) => {
    const update = createSuccessUpdate(topic, workflow);
    chat.updateMessage(thinkingId, update);
    window.dispatchEvent(new CustomEvent("research-created"));
  };

  const handleError = (thinkingId: string, error?: any) => {
    let errorDetails;

    // Check for specific error codes or messages
    if (error?.code === "API_KEY_MISSING" || error?.message?.includes("API Key not found")) {
      errorDetails = {
        type: "API_KEY_MISSING",
        message: "Perplexity API Key is required.",
        title: "API Key Missing"
      };
    } else {
      errorDetails = {
        type: "UNKNOWN",
        message: error?.message || "An unexpected error occurred.",
        title: "Research Failed"
      };
    }

    const update = createErrorUpdate(errorDetails);
    chat.updateMessage(thinkingId, update);
  };

  return { handleStart, handlePlaceholders, handleSuccess, handleError };
}
