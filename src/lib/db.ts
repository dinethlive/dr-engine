import Dexie, { Table } from "dexie";

export interface Prompt {
  id?: number;
  type: string;
  name: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Workflow {
  id?: number;
  title: string;
  topic: string;
  status:
    | "CREATED"
    | "QUESTIONS_GENERATING"
    | "QUESTIONS_READY"
    | "ANSWERS_GENERATING"
    | "COMPLETED"
    | "FAILED";
  createdAt: Date;
  updatedAt: Date;
  questionPromptId?: number | string;
  answerPromptId?: number | string;
  modelId?: string;
  questionsJson?: string;
  mergedContent?: string;
  options?: any; // PerplexityOptions, stored as JSON/object
}

export interface Section {
  id?: number;
  workflowId: number; // Foreign key to Workflow
  themeIndex: number;
  themeTitle: string;
  themeMetadata?: string; // JSON as string
  questionsJson: string; // JSON as string
  answersJson?: string; // JSON as string
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  modelId?: string;
  answerPromptId?: number | string;
  retryCount: number;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface Setting {
  key: string;
  value: any;
}

export interface Usage {
  id?: number;
  date: string; // YYYY-MM-DD
  tokens: number;
  inputTokens: number;
  outputTokens: number;
  cost: number;
  model: string;
  workflowId?: number;
  workflowName?: string;
}

export class AppDatabase extends Dexie {
  prompts!: Table<Prompt, number>;
  workflows!: Table<Workflow, number>;
  sections!: Table<Section, number>;
  settings!: Table<Setting, string>; // Primary key is 'key'
  usage!: Table<Usage, number>;

  constructor() {
    super("DREngineDB");
    this.version(1).stores({
      prompts: "++id, type, name, createdAt",
      workflows: "++id, status, createdAt",
      settings: "key",
      usage: "++id, date, model",
    });

    // Version 2: Add sections and update schemas
    this.version(2).stores({
      prompts: "++id, type, name, createdAt",
      workflows: "++id, status, createdAt",
      sections: "++id, workflowId, status, themeIndex",
      settings: "key",
      usage: "++id, date, model",
    });

    // Version 3: Update usage schema
    this.version(3)
      .stores({
        usage: "++id, date, model",
      })
      .upgrade((tx) => {
        // Migration logic if needed, but adding fields to object store doesn't require schema change if they are not indexed
        // However, explicit versioning is good practice
      });
  }
}

export const db = new AppDatabase();
