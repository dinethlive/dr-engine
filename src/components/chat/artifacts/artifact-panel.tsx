"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArtifactHeader } from "./artifact-header";
import { ArtifactGenerator } from "./generator";

interface Prompt {
  id: string | number;
  name: string;
}

interface Model {
  id: string;
  name: string;
  displayName: string;
}

interface ArtifactPanelProps {
  title: string;
  content: string;
  rawContent?: string;
  isOpen: boolean;
  onClose: () => void;
  showGenerateAnswers?: boolean;
  answerPrompts?: Prompt[];
  selectedPromptId?: string;
  onPromptChange?: (promptId: string) => void;
  onGenerateAnswers?: () => void;
  isGenerating?: boolean;
  models?: Model[];
  selectedModelId?: string;
  onModelChange?: (modelId: string) => void;
  buttonLabel?: string;
}

export function ArtifactPanel({
  title,
  content,
  rawContent,
  isOpen,
  onClose,
  showGenerateAnswers = false,
  answerPrompts = [],
  selectedPromptId,
  onPromptChange,
  onGenerateAnswers,
  isGenerating = false,
  models = [],
  selectedModelId,
  onModelChange,
  buttonLabel,
}: ArtifactPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full border-l bg-background">
      <ArtifactHeader
        title={title}
        content={content}
        rawContent={rawContent}
        onClose={onClose}
      />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-subtle">
        <div className="p-4 prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      </div>

      {showGenerateAnswers && (
        <ArtifactGenerator
          answerPrompts={answerPrompts}
          selectedPromptId={selectedPromptId}
          onPromptChange={onPromptChange}
          onGenerateAnswers={onGenerateAnswers}
          isGenerating={isGenerating}
          models={models}
          selectedModelId={selectedModelId}
          onModelChange={onModelChange}
          buttonLabel={buttonLabel}
        />
      )}
    </div>
  );
}
