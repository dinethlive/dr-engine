import { type Prompt, type Model } from "@/types/workspace";
import { useChat } from "../chat/use-chat";
import { useWorkflow } from "../state/use-workflow";
import { useCreateResearch } from "./use-create-research";
import { useAnswerGeneration } from "../answer/use-answer-generation";
import { useResearchDownload } from "./use-research-download";

interface UseResearchProcessorProps {
  chat: ReturnType<typeof useChat>;
  workflow: ReturnType<typeof useWorkflow>;
  answerPrompts: Prompt[];
  models: Model[];
}

export function useResearchProcessor({
  chat,
  workflow,
  answerPrompts,
  models,
}: UseResearchProcessorProps) {
  const creator = useCreateResearch({ chat, workflow, answerPrompts });
  const generator = useAnswerGeneration({ chat, workflow });
  const downloader = useResearchDownload({ chat, workflow });

  // Wrapper to set default answer prompt and model after creation
  const createResearch = async (
    topic: string,
    modelId: string,
    questionPromptId: string,
    options?: any
  ) => {
    const defaultPromptId = await creator.createResearch(
      topic,
      modelId,
      questionPromptId,
      options
    );
    if (defaultPromptId) {
      generator.setSelectedAnswerPromptId(String(defaultPromptId));
    }
    // Set default model (use same model as question generation or first available)
    const defaultModel =
      models.find((m) => m.id === modelId) ||
      models.find((m) => m.isDefault) ||
      models[0];
    if (defaultModel) {
      generator.setSelectedAnswerModelId(defaultModel.id);
    }
  };

  return {
    // State
    isLoading: creator.isLoading || downloader.isLoading,
    isGeneratingAnswers: generator.isGeneratingAnswers,
    isAutoGenerating: generator.isAutoGenerating,
    autoGenerateProgress: generator.autoGenerateProgress,
    selectedAnswerPromptId: generator.selectedAnswerPromptId,
    selectedAnswerModelId: generator.selectedAnswerModelId,

    // Setters
    setSelectedAnswerPromptId: generator.setSelectedAnswerPromptId,
    setSelectedAnswerModelId: generator.setSelectedAnswerModelId,

    // Actions
    createResearch,
    generateSectionAnswers: generator.generateSectionAnswers,
    autoGenerateAll: generator.autoGenerateAll,
    downloadResearch: downloader.downloadResearch,
  };
}
