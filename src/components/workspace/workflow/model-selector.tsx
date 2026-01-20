"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface Model {
    id: string;
    name: string;
    displayName: string;
    description?: string;
    inputPricePerMillion: number;
    outputPricePerMillion: number;
    isDefault?: boolean;
}

interface ModelSelectorProps {
    models: Model[];
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export function ModelSelector({
    models,
    value,
    onChange,
    disabled = false,
}: ModelSelectorProps) {
    const selectedModel = models.find((m) => m.id === value);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                    {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" />
                                <span>{model.displayName}</span>
                                {model.isDefault && (
                                    <Badge variant="secondary" className="text-xs">
                                        Default
                                    </Badge>
                                )}
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedModel && (
                <p className="text-xs text-muted-foreground">
                    ${selectedModel.inputPricePerMillion} / ${selectedModel.outputPricePerMillion} per 1M tokens
                </p>
            )}
        </div>
    );
}
