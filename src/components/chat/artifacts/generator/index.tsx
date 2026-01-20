"use client";

import { GeneratorHeader } from "./generator-header";
import { GeneratorModelSelector } from "./generator-model-selector";
import { GeneratorPromptSelector } from "./generator-prompt-selector";
import { GeneratorSubmitButton } from "./generator-submit-button";

interface Prompt {
  id: string | number;
  name: string;
}

interface Model {
  id: string;
  name: string;
  displayName: string;
}

interface ArtifactGeneratorProps {
  answerPrompts: Prompt[];
  selectedPromptId?: string;
  onPromptChange?: (promptId: string) => void;
  onGenerateAnswers?: () => void;
  isGenerating: boolean;
  models?: Model[];
  selectedModelId?: string;
  onModelChange?: (modelId: string) => void;
  buttonLabel?: string;
}

export function ArtifactGenerator({
  answerPrompts,
  selectedPromptId,
  onPromptChange,
  onGenerateAnswers,
  isGenerating,
  models = [],
  selectedModelId,
  onModelChange,
  buttonLabel,
}: ArtifactGeneratorProps) {
  return (
    <div className="p-4 border-t flex-shrink-0 bg-gradient-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
      <div className="rounded-xl border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm p-4 space-y-3">
        <GeneratorHeader />

        <GeneratorModelSelector
          models={models}
          value={selectedModelId}
          onValueChange={onModelChange}
          disabled={isGenerating}
        />

        <GeneratorPromptSelector
          prompts={answerPrompts}
          value={selectedPromptId}
          onValueChange={onPromptChange}
          disabled={isGenerating}
        />

        <GeneratorSubmitButton
          onClick={onGenerateAnswers}
          disabled={isGenerating || !selectedPromptId || !selectedModelId}
          isGenerating={isGenerating}
          label={buttonLabel}
        />
      </div>
    </div>
  );
}
