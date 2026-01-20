import { type Artifact, type Message, type Workflow } from "@/types/workspace";
import { createPlaceholderArtifacts, createQuestionArtifact } from "./artifacts";

export const createStartMessages = (topic: string) => {
  const userMsg: Message = {
    id: `user-${Date.now()}`,
    role: "user",
    content: topic,
  };
  const thinkingId = `ai-thinking-${Date.now()}`;
  const thinkingMsg: Message = {
    id: thinkingId,
    role: "ai",
    content: "",
    isThinking: true,
  };
  return { userMsg, thinkingMsg, thinkingId };
};

export const createPlaceholderUpdate = (topic: string, workflowId: string) => {
  return {
    isThinking: true,
    content: `I'm starting your research on "${topic}". Identifying 12 key sections...`,
    artifacts: createPlaceholderArtifacts(12),
    workflowId,
  };
};

export const createSuccessUpdate = (topic: string, workflow: Workflow) => {
  const sectionArtifacts: Artifact[] = (workflow.sections || []).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (s: any, index: number) => createQuestionArtifact(s, index)
  );

  return {
    isThinking: false,
    content: `I've analyzed your topic "${topic}" and generated ${workflow.sections.length} thematic sections.`,
    artifacts: sectionArtifacts,
    workflowId: String(workflow.id),
  };
};

export const createErrorUpdate = (error?: { type: string; message: string; title?: string }) => {
  return {
    isThinking: false,
    content: error?.type === "API_KEY_MISSING"
      ? "Authentication configuration required."
      : "Sorry, there was an error generating questions.",
    error: error || {
      type: "UNKNOWN_ERROR",
      message: "An unexpected error occurred."
    }
  };
};
