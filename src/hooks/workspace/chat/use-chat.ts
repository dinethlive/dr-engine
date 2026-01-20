import { useState } from "react";
import { type Message, type Artifact } from "@/types/workspace";

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (message: Message) => {
        setMessages((prev) => [...prev, message]);
    };

    const updateMessage = (id: string, updates: Partial<Message>) => {
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
        );
    };

    const setThinking = (id: string, isThinking: boolean) => {
        updateMessage(id, { isThinking });
    };

    const updateArtifactsInMessage = (
        messageId: string,
        updateFn: (artifacts: Artifact[]) => Artifact[]
    ) => {
        setMessages((prev) =>
            prev.map((m) => {
                if (m.id !== messageId || !m.artifacts) return m;
                return { ...m, artifacts: updateFn(m.artifacts) };
            })
        );
    };

    // Helper to update specific artifact in all messages (since we might not know which message it belongs to easily from outside)
    // Or we stick to the pattern used in original code
    const updateArtifactGlobal = (artifactId: string, updates: Partial<Artifact>) => {
        setMessages((prev) =>
            prev.map((m) => ({
                ...m,
                artifacts: m.artifacts?.map((a) =>
                    a.id === artifactId ? { ...a, ...updates } : a
                )
            }))
        );
    };

    const updateArtifactBySectionId = (sectionId: string, updates: Partial<Artifact>) => {
        setMessages((prev) =>
            prev.map((m) => ({
                ...m,
                artifacts: m.artifacts?.map((a) =>
                    a.sectionId === sectionId ? { ...a, ...updates } : a
                )
            }))
        );
    };

    return {
        messages,
        setMessages,
        addMessage,
        updateMessage,
        setThinking,

        updateArtifactGlobal,
        updateArtifactBySectionId
    };
}
