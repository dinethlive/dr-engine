import { PerplexityOptions } from "./types";

interface UseChatSubmitProps {
    value: string;
    setValue: (value: string) => void;
    isLoading: boolean;
    disabled: boolean;
    questionPromptId: string;
    recency: "all" | "month" | "week" | "day";
    searchFocus: "web" | "academic" | "reddit";
    modelId: string;
    onSubmit: (
        topic: string,
        modelId: string,
        questionPromptId: string,
        options?: PerplexityOptions
    ) => void;
}

export function useChatSubmit({
    value,
    setValue,
    isLoading,
    disabled,
    questionPromptId,
    recency,
    searchFocus,
    modelId,
    onSubmit,
}: UseChatSubmitProps) {
    const handleSubmit = () => {
        if (!value.trim() || isLoading || disabled || !questionPromptId) return;

        // Construct options
        const options: PerplexityOptions = {};
        if (recency !== "all")
            options.search_recency_filter =
                recency as PerplexityOptions["search_recency_filter"];
        if (searchFocus === "academic") {
            options.search_domain_filter = ["arxiv.org", "scholar.google.com", "edu"];
        } else if (searchFocus === "reddit") {
            options.search_domain_filter = ["reddit.com"];
        }

        console.debug("[ChatInput] Submitting:", {
            topic: value.trim(),
            modelId,
            promptId: String(questionPromptId),
            options,
        });
        onSubmit(value.trim(), modelId, String(questionPromptId), options);
        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return { handleSubmit, handleKeyDown };
}
