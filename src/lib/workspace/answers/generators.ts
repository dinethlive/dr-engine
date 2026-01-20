import { type Message, type Section } from "@/types/workspace";
import { createAnswerArtifact } from "../artifacts";

export const createStartMessages = (
    title: string,
    workflowId: string,
    sectionId: string,
    label: string
) => {
    const userMsg: Message = {
        id: `user-req-${Date.now()}`,
        role: "user",
        content: `Generate answers for: ${title}`,
    };

    const thinkingId = `ai-ans-${Date.now()}`;
    const thinkingMsg: Message = {
        id: thinkingId,
        role: "ai",
        content: "",
        isThinking: true,
        workflowId,
    };

    const artifactStatus = {
        status: "generating" as const,
        subtitle: `${label} answers...`,
    };

    const toastMessage = `${label} answers for ${title}...`;

    return { userMsg, thinkingMsg, thinkingId, artifactStatus, toastMessage };
};

export const createSuccessMessages = (
    section: Section,
    title: string,
    label: string,
    workflowId: string
) => {
    const answerArtifact = createAnswerArtifact(section);

    const messageUpdate = {
        isThinking: false,
        content: `Here are the answers for "${title}".`,
        artifacts: [answerArtifact],
        workflowId,
    };

    const artifactUpdate = {
        subtitle: "✓ Answers generated",
        hasAnswers: true,
        status: "complete" as const,
    };

    const toastMessage = `Answers for ${title} ${label.toLowerCase()}ed successfully!`;

    return { answerArtifact, messageUpdate, artifactUpdate, toastMessage };
};

export const createErrorMessages = (title: string, label: string) => {
    const messageUpdate = {
        isThinking: false,
        content: "Error generating answers.",
    };

    const artifactUpdate = {
        status: "error" as const,
        subtitle: `Failed to ${label.toLowerCase()}`,
    };

    const toastMessage = `Failed to ${label.toLowerCase()} answers for ${title}.`;

    return { messageUpdate, artifactUpdate, toastMessage };
};
