import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayCircle, Zap } from "lucide-react";
import { type Model, type Prompt } from "@/types/workspace";

interface GenerateActionsProps {
  models: Model[];
  selectedModelId?: string;
  onModelChange: (modelId: string) => void;
  answerPrompts: Prompt[];
  selectedPromptId?: string;
  onPromptChange: (promptId: string) => void;
  onGenerateAll: () => void;
  disabled?: boolean;
}

export function GenerateActions({
  models,
  selectedModelId,
  onModelChange,
  answerPrompts,
  selectedPromptId,
  onPromptChange,
  onGenerateAll,
  disabled,
}: GenerateActionsProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
      <Select value={selectedModelId} onValueChange={onModelChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <SelectValue placeholder="Select model..." />
          </div>
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedPromptId} onValueChange={onPromptChange}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Select prompt..." />
        </SelectTrigger>
        <SelectContent>
          {answerPrompts.map((prompt) => (
            <SelectItem key={prompt.id} value={String(prompt.id)}>
              {prompt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={onGenerateAll}
        disabled={disabled || !selectedPromptId || !selectedModelId}
        size="lg"
        className="gap-2 w-full md:w-auto"
      >
        <PlayCircle className="h-4 w-4" />
        Generate All Answers
      </Button>
    </div>
  );
}
