import { type Artifact, type Message, type Section } from "@/types/workspace";
import { createAnswerArtifact } from "../artifacts";

export const createBulkStartMessages = (count: number, workflowId: string) => {
    const userMsg: Message = {
        id: `user-auto-${Date.now()}`,
        role: "user",
        content: `Generate answers for all ${count} remaining sections`,
    };

    const thinkingId = `ai-collective-${Date.now()}`;
    const thinkingMsg: Message = {
        id: thinkingId,
        role: "ai",
        content: `I'm generating answers for all ${count} sections...`,
        isThinking: true,
        workflowId,
    };

    return { userMsg, thinkingMsg, thinkingId };
};

export const createBulkProgressArtifactStatus = (section: Section) => {
    const isRegen = section.status === "COMPLETED" || section.answersJson;
    return {
        status: "generating" as const,
        subtitle: isRegen ? "Regenerating answers..." : "Generating answers...",
    };
};

export const createBulkSectionSuccessArtifactUpdate = (section: Section) => {
    const answerArtifact = createAnswerArtifact(section);
    return {
        ...answerArtifact,
        subtitle: "✓ Answers generated",
        hasAnswers: true,
        status: "complete" as const,
    };
};

export const createBulkSectionErrorArtifactUpdate = () => {
    return {
        status: "warning" as const,
        subtitle: "⚠ Generation failed",
    };
};

export const createBulkCompleteMessageUpdate = (artifacts: Artifact[]) => {
    return {
        isThinking: false,
        content:
            "I've completed the research for all sections. You can now review the detailed answers below.",
        artifacts,
    };
};
