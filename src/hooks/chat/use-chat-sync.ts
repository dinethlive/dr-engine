import { useEffect, useRef } from "react";
import { useSettings } from "@/hooks/settings/use-settings";
import { Model, Prompt } from "./types";

interface UseChatSyncProps {
    models: Model[];
    questionPrompts: Prompt[];
    modelId: string;
    setModelId: (id: string) => void;
    questionPromptId: string;
    setQuestionPromptId: (id: string) => void;
}

export function useChatSync({
    models,
    questionPrompts,
    modelId,
    setModelId,
    questionPromptId,
    setQuestionPromptId,
}: UseChatSyncProps) {
    const { settings, isLoading: isLoadingSettings } = useSettings();
    const hasInitializedModel = useRef(false);

    // Sync model with saved settings on load
    useEffect(() => {
        if (isLoadingSettings) return;

        if (
            !hasInitializedModel.current &&
            settings.defaultModel &&
            models.some((m) => m.id === settings.defaultModel)
        ) {
            setModelId(settings.defaultModel);
            hasInitializedModel.current = true;
        }
    }, [isLoadingSettings, settings.defaultModel, models, setModelId]);

    // Sync modelId if models change and current modelId is not in new models
    useEffect(() => {
        if (models.length > 0 && !models.some((m) => m.id === modelId)) {
            const defaultModel = models.find((m) => m.isDefault) || models[0];
            setModelId(defaultModel.id);
        }
    }, [models, modelId, setModelId]);

    // Sync questionPromptId if questionPrompts change and current questionPromptId is not in new prompts
    useEffect(() => {
        if (
            questionPrompts.length > 0 &&
            !questionPrompts.some((p) => String(p.id) === questionPromptId)
        ) {
            const defaultPrompt =
                questionPrompts.find((p) => p.isDefault) || questionPrompts[0];
            setQuestionPromptId(String(defaultPrompt.id));
        }
    }, [questionPrompts, questionPromptId, setQuestionPromptId]);
}
