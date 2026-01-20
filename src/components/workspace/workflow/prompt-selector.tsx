"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FileText, Lock } from "lucide-react";

interface Prompt {
    id: string | number;
    name: string;
    description?: string;
    isLocked?: boolean;
    isDefault?: boolean;
    ownerId?: string | null;
}

interface PromptSelectorProps {
    prompts: Prompt[];
    value: string | number;
    onChange: (value: string) => void;
    label: string;
    disabled?: boolean;
}

export function PromptSelector({
    prompts,
    value,
    onChange,
    label,
    disabled = false,
}: PromptSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">{label}</label>
            <Select value={String(value)} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a prompt" />
                </SelectTrigger>
                <SelectContent>
                    {prompts.map((prompt) => (
                        <SelectItem key={prompt.id} value={String(prompt.id)}>
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{prompt.name}</span>
                                {prompt.isLocked && <Lock className="h-3 w-3 text-muted-foreground" />}
                                {!prompt.ownerId && (
                                    <span className="text-xs text-muted-foreground">(System)</span>
                                )}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
