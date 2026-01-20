import { useState } from "react";
import { Model, Prompt } from "./types";

interface UseChatFormStateProps {
    models: Model[];
    questionPrompts: Prompt[];
}

export function useChatFormState({ models, questionPrompts }: UseChatFormStateProps) {
    const [value, setValue] = useState("");

    const [modelId, setModelId] = useState(() => {
        const defaultModel = models.find((m) => m.isDefault) || models[0];
        return defaultModel?.id || "";
    });

    const [questionPromptId, setQuestionPromptId] = useState<string>(() => {
        const defaultPrompt =
            questionPrompts.find((p) => p.isDefault) || questionPrompts[0];
        return defaultPrompt?.id ? String(defaultPrompt.id) : "";
    });

    const [searchFocus, setSearchFocus] = useState<"web" | "academic" | "reddit">(
        "web"
    );

    const [recency, setRecency] = useState<"all" | "month" | "week" | "day">(
        "all"
    );

    return {
        value,
        setValue,
        modelId,
        setModelId,
        questionPromptId,
        setQuestionPromptId,
        searchFocus,
        setSearchFocus,
        recency,
        setRecency,
    };
}
