import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { type Prompt, type Model } from "@/types/workspace";

export function useInitialData() {
    const [models, setModels] = useState<Model[]>([]);
    const [questionPrompts, setQuestionPrompts] = useState<Prompt[]>([]);
    const [answerPrompts, setAnswerPrompts] = useState<Prompt[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [modelsData, promptsData] = await Promise.all([
                    api.getModels(),
                    api.getPrompts(),
                ]);
                setModels(Array.isArray(modelsData) ? modelsData : []);

                // Map and Filter
                const rawPrompts = Array.isArray(promptsData) ? promptsData : [];
                const mappedPrompts = rawPrompts.map(p => ({
                    ...p,
                    id: String(p.id!) // Ensure ID is string and defined
                }));

                const qPrompts = mappedPrompts.filter(p => p.type === "question");
                const aPrompts = mappedPrompts.filter(p => p.type === "answer" && p.name !== "Question by Question");

                // Assert types as compatible (Mapped object has id as string, which fits Prompt interface)
                setQuestionPrompts(qPrompts as unknown as Prompt[]);
                setAnswerPrompts(aPrompts as unknown as Prompt[]);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setIsLoadingData(false);
            }
        };

        loadInitialData();
    }, []);

    return {
        models,
        questionPrompts,
        answerPrompts,
        isLoadingData,
    };
}
