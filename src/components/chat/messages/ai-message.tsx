"use client";

import { Sparkles } from "lucide-react";
import { ArtifactCard } from "../artifacts/artifact-card";
import { MessageActions } from "./message-actions";
import { ThinkingIndicator } from "./thinking-indicator";
import { ResearchErrorState } from "./error-state";
import { toast } from "sonner";
import { Artifact } from "@/types/workspace";

interface AIMessageProps {
    content: string;
    artifacts?: Artifact[];
    onArtifactClick?: (artifact: Artifact) => void;
    selectedArtifactId?: string;
    isThinking?: boolean;
    onRetry?: () => void;
    onDownload?: () => void;
    showDownload?: boolean;
    onRetryArtifact?: (artifact: Artifact) => void;
    error?: {
        type: string;
        message: string;
        title?: string;
    };
}

export function AIMessage({
    content,
    artifacts = [],
    onArtifactClick,
    selectedArtifactId,
    isThinking = false,
    onRetry,
    onDownload,
    showDownload = false,
    onRetryArtifact,
    error,
}: AIMessageProps) {
    const handleDownloadQuestions = () => {
        const questions = artifacts
            .filter((a) => a.type === "questions")
            .map((a) => `## ${a.title}\n\n${a.content}`)
            .join("\n\n---\n\n");

        const blob = new Blob([questions], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `research_questions_${Date.now()}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const hasQuestions = artifacts.some((a) => a.type === "questions");

    const effectiveDownload = hasQuestions ? handleDownloadQuestions : onDownload;
    const effectiveShowDownload = showDownload || hasQuestions;

    return (
        <div className="flex flex-col md:flex-row gap-3 py-4">
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3 min-w-0">
                {isThinking ? (
                    <ThinkingIndicator />
                ) : error ? (
                    <ResearchErrorState error={error} onRetry={onRetry} />
                ) : (
                    <>
                        <p className="text-sm leading-relaxed">{content}</p>

                        {/* Artifacts */}
                        {artifacts.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {artifacts.map((artifact) => (
                                    <ArtifactCard
                                        key={artifact.id}
                                        title={artifact.title}
                                        subtitle={artifact.subtitle}
                                        status={artifact.status}
                                        onClick={() => onArtifactClick?.(artifact)}
                                        isSelected={selectedArtifactId === artifact.id}
                                        onRetry={
                                            onRetryArtifact
                                                ? () => onRetryArtifact(artifact)
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <MessageActions
                            onCopy={() => {
                                navigator.clipboard.writeText(content);
                                toast.success("Copied to clipboard");
                            }}
                            onRetry={onRetry}
                            onDownload={effectiveDownload}
                            showRetry={!!onRetry}
                            showDownload={effectiveShowDownload}
                            showCopy={artifacts.length === 0}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
