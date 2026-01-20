"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle,
    Circle,
    Loader2,
    AlertCircle,
    Play,
    RotateCcw,
} from "lucide-react";

import { type Section } from "@/types/workspace";

type SectionStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

interface SectionCardProps {
    section: Section;
    onGenerateAnswers: (sectionId: string) => void;
    onRetry: (sectionId: string) => void;
    isProcessing?: boolean;
}

const statusConfig: Record<
    SectionStatus,
    { icon: React.ComponentType<any>; color: string; label: string }
> = {
    PENDING: { icon: Circle, color: "text-muted-foreground", label: "Pending" },
    IN_PROGRESS: { icon: Loader2, color: "text-blue-500", label: "Processing" },
    COMPLETED: { icon: CheckCircle, color: "text-green-500", label: "Completed" },
    FAILED: { icon: AlertCircle, color: "text-destructive", label: "Failed" },
};

export function SectionCard({
    section,
    onGenerateAnswers,
    onRetry,
    isProcessing = false,
}: SectionCardProps) {
    const config = statusConfig[section.status];
    const StatusIcon = config.icon;
    const isInProgress = section.status === "IN_PROGRESS" || isProcessing;

    // Parse questions count
    let questionsCount = 0;
    try {
        const questions = JSON.parse(section.questionsJson || "[]");
        questionsCount = Array.isArray(questions) ? questions.length : 0;
    } catch {
        questionsCount = 0;
    }

    return (
        <Card className={cn(
            "transition-all",
            section.status === "COMPLETED" && "border-green-500/30 bg-green-500/5",
            section.status === "FAILED" && "border-destructive/30 bg-destructive/5",
            isInProgress && "border-blue-500/30 bg-blue-500/5"
        )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {(section.themeIndex || 0) + 1}
                    </div>
                    <CardTitle className="text-base">
                        {section.themeTitle}
                    </CardTitle>
                </div>
                <Badge
                    variant="outline"
                    className={cn("gap-1", config.color)}
                >
                    <StatusIcon className={cn("h-3 w-3", isInProgress && "animate-spin")} />
                    {config.label}
                </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    {questionsCount} questions
                </p>

                {section.status === "FAILED" && section.errorMessage && (
                    <p className="text-xs text-destructive">{section.errorMessage}</p>
                )}

                <div className="flex gap-2">
                    {section.status === "PENDING" && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onGenerateAnswers(String(section.id))}
                            disabled={isProcessing}
                            className="gap-1"
                        >
                            <Play className="h-3 w-3" />
                            Generate
                        </Button>
                    )}
                    {section.status === "FAILED" && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onRetry(String(section.id))}
                            disabled={isProcessing}
                            className="gap-1"
                        >
                            <RotateCcw className="h-3 w-3" />
                            Retry
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
