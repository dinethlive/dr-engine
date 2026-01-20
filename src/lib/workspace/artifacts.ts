import { type Artifact, type Section, type Workflow } from "@/types/workspace";

export const getAllAnswerArtifacts = (workflow: Workflow) => {
    return (workflow.sections || []).map((s: Section) => createAnswerArtifact(s));
};

export const formatQuestions = (
    questions: string[],
    themeTitle: string
): string => {
    const questionsList = questions.map((q, i) => `${i + 1}. ${q}`).join("\n");
    return `## ${themeTitle}\n\n### Questions\n\n${questionsList}`;
};

export const createPlaceholderArtifacts = (count: number = 12): Artifact[] => {
    return Array.from({ length: count }).map((_, index) => ({
        id: `placeholder-${index}-${Date.now()}`,
        title: `Section ${index + 1}`,
        subtitle: "Generating questions...",
        status: "generating",
        content: "",
        type: "questions",
    }));
};

export const createQuestionArtifact = (
    section: Section,
    index: number
): Artifact => {
    const questions = JSON.parse(section.questionsJson || "[]");
    const content = formatQuestions(questions, section.themeTitle);
    return {
        id: `section-${section.id}`,
        title: section.themeTitle,
        subtitle: `${questions.length} questions`,
        status: "complete",
        content,
        rawContent: content,
        type: "questions",
        sectionId: String(section.id),
        themeIndex: index + 1,
        hasAnswers: false,
    };
};

export const createAnswerArtifact = (section: Section): Artifact => {
    const questions = JSON.parse(section.questionsJson || "[]") as string[];
    const questionContent = formatQuestions(questions, section.themeTitle);
    const answerContent = section.answersJson || "No answers generated.";

    const fullContent = `${questionContent}\n\n---\n\n### Answers\n\n${answerContent}`;

    // Validation: Check if all questions are answered
    const answeredCount = questions.filter((_, i) => {
        const qNum = i + 1;
        const regex = new RegExp(
            `Question\\s*${qNum}|\\*\\*Question\\s*${qNum}|\\b${qNum}\\.\\s`,
            "i"
        );
        return regex.test(answerContent);
    }).length;

    const isComplete = answeredCount >= questions.length;

    // Refined refusal detection
    const lowercaseContent = answerContent.toLowerCase();
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

    const isLongResponse = answerContent.length > 500;
    const isRefusal = hasRefusalMarker && !isLongResponse && !isComplete;

    let status: "complete" | "warning" = "complete";
    let subtitle = "✓ Complete";

    if (isRefusal || !isComplete) {
        status = "warning";
        subtitle = isRefusal
            ? "⚠ Refusal detected"
            : `⚠ ${answeredCount}/${questions.length} answered`;
    }

    return {
        id: `answers-${section.id}-${Date.now()}`,
        title: `${section.themeTitle} - Answers`,
        subtitle,
        status,
        content: fullContent,
        rawContent: fullContent,
        type: "answers",
        sectionId: String(section.id),
        themeIndex: section.themeIndex,
        hasAnswers: true,
    };
};
