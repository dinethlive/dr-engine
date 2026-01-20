import { type Message, type Artifact } from "@/types/workspace";
import { formatQuestions, createAnswerArtifact } from "./artifacts";

export const getWorkflowMessages = (workflow: any): Message[] => {
  // Create user message with the topic
  const userMessage: Message = {
    id: `user-${workflow.id}`,
    role: "user",
    content: workflow.topic,
  };

  // Create artifacts from sections
  const sectionArtifacts: Artifact[] = (workflow.sections || []).map(
    (s: any, index: number) => {
      const questions = JSON.parse(s.questionsJson || "[]");
      const content = formatQuestions(questions, s.themeTitle);

      // If section has answers, return answer artifact
      if (s.status === "COMPLETED" && s.answersJson) {
        return createAnswerArtifact(s);
      }

      // Otherwise return questions artifact
      return {
        id: `section-${s.id}`,
        title: s.themeTitle,
        subtitle: `${questions.length} questions`,
        status: "complete" as const,
        content,
        rawContent: content,
        type: "questions" as const,
        sectionId: String(s.id),
        themeIndex: index + 1,
        hasAnswers: false,
      };
    }
  );

  // Create AI message with artifacts
  const aiMessage: Message = {
    id: `ai-${workflow.id}`,
    role: "ai",
    content: `I've analyzed your topic "${workflow.topic}" and generated ${workflow.sections.length} thematic sections.`,
    artifacts: sectionArtifacts,
  };

  return [userMessage, aiMessage];
};
