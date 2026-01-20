export interface Artifact {
  id: string;
  title: string;
  subtitle?: string;
  status: "generating" | "complete" | "error" | "warning";
  content: string;
  rawContent?: string;
  type: "questions" | "answers";
  sectionId?: string;
  themeIndex?: number;
  hasAnswers?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  artifacts?: Artifact[];
  isThinking?: boolean;
  workflowId?: string;
  error?: {
    type: string;
    message: string;
    title?: string;
  };
}

export interface Prompt {
  id: string | number;
  name: string;
  type: string;
  isDefault?: boolean;
}

export interface Model {
  id: string;
  name: string;
  displayName: string;
  provider?: string;
  isDefault?: boolean;
}

export interface Section {
  id: string | number;
  themeTitle: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  questionsJson?: string;
  answersJson?: string;
  themeIndex?: number;
  errorMessage?: string;
}

export interface Workflow {
  id: string | number;
  topic: string;
  status: string;
  sections: Section[];
  mergedContent?: string;
}
