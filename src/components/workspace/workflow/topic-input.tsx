"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface TopicInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    isLoading?: boolean;
    disabled?: boolean;
}

export function TopicInput({
    value,
    onChange,
    onSubmit,
    isLoading = false,
    disabled = false,
}: TopicInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey && !disabled && !isLoading) {
            onSubmit();
        }
    };

    return (
        <div className="space-y-3">
            <Textarea
                placeholder="Enter your research topic... (e.g., 'The impact of AI on modern healthcare systems')"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled || isLoading}
                className="min-h-[120px] resize-none text-base"
            />
            <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Press Ctrl+Enter to generate
                </p>
                <Button
                    onClick={onSubmit}
                    disabled={!value.trim() || disabled || isLoading}
                    className="gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4" />
                    )}
                    {isLoading ? 'Generating...' : 'Generate Questions'}
                </Button>
            </div>
        </div>
    );
}
