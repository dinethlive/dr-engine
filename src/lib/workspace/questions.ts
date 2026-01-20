import { type Section, type Workflow } from "@/types/workspace";

export const isRefusal = (content: string) => {
    if (!content) return false;
    const lowercaseContent = content.toLowerCase();
    const refusalMarkers = [
        "i cannot",
        "i apologize",
        "don't have enough information",
        "search results lack",
        "no information found",
    ];

    const hasRefusalMarker = refusalMarkers.some((marker) =>
        lowercaseContent.includes(marker)
    );

    // If it's a long response (e.g. > 500 chars), it's likely a partial refusal/disclaimer followed by real data, so not a "refusal"
    const isLongResponse = content.length > 500;

    return hasRefusalMarker && !isLongResponse;
};

export const getPendingSections = (workflow: Workflow) => {
    return workflow.sections.filter((s: Section) =>
        s.status !== "COMPLETED" ||
        (s.answersJson && isRefusal(s.answersJson))
    );
};
