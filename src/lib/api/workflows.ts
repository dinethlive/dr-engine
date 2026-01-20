import { db } from "../db";
import { callPerplexity, parseQuestionsResponse } from "./perplexity";
import { promptsApi } from "./prompts";

export const workflowsApi = {
  getWorkflows: async (params?: {
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const collection = db.workflows.orderBy("createdAt").reverse();
    let workflows = await collection.toArray();

    if (params?.status && params.status !== "all") {
      workflows = workflows.filter((w) => w.status === params.status);
    }
    if (params?.search) {
      const lower = params.search.toLowerCase();
      workflows = workflows.filter((w) =>
        w.topic.toLowerCase().includes(lower)
      );
    }

    if (params?.limit) {
      workflows = workflows.slice(0, params.limit);
    }

    const workflowsWithSections = await Promise.all(
      workflows.map(async (w) => {
        const sections = await db.sections
          .where("workflowId")
          .equals(w.id!)
          .toArray();
        return { ...w, sections };
      })
    );

    return workflowsWithSections;
  },

  getWorkflow: async (id: string | number) => {
    const workflow = await db.workflows.get(Number(id));
    if (!workflow) throw new Error("Workflow not found");
    const sections = await db.sections
      .where("workflowId")
      .equals(Number(id))
      .sortBy("themeIndex");
    return { ...workflow, sections };
  },

  createWorkflow: async (data: {
    topic: string;
    questionPromptId: any;
    answerPromptId: any;
    modelId: string;
    options?: any;
  }) => {
    const id = await db.workflows.add({
      title: data.topic,
      topic: data.topic,
      status: "CREATED",
      questionPromptId: data.questionPromptId,
      answerPromptId: data.answerPromptId,
      modelId: data.modelId,
      options: data.options,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return db.workflows.get(id);
  },

  deleteWorkflow: async (id: string | number) => {
    await db.transaction("rw", db.workflows, db.sections, async () => {
      await db.sections.where("workflowId").equals(Number(id)).delete();
      await db.workflows.delete(Number(id));
    });
    return { success: true };
  },

  clearAllWorkflows: async () => {
    await db.transaction("rw", db.workflows, db.sections, async () => {
      await db.sections.clear();
      await db.workflows.clear();
    });
    return { success: true };
  },

  generateQuestions: async (
    id: string | number,
    params?: { promptContent?: string }
  ) => {
    const numericId = Number(id);
    const workflow = await db.workflows.get(numericId);
    if (!workflow) throw new Error("Workflow not found");

    await db.workflows.update(numericId, { status: "QUESTIONS_GENERATING" });

    try {
      const apiKeySetting = await db.settings.get("perplexityApiKey");
      const apiKey = apiKeySetting?.value;
      if (!apiKey) {
        const error = new Error("API Key not found in Settings") as Error & { code?: string };
        error.code = "API_KEY_MISSING";
        throw error;
      }

      let template = params?.promptContent;

      // Prioritize manually passing prompt, then resolve ID
      if (!template && workflow.questionPromptId) {
        // If system prompt (negative ID), force load from code to avoid stale DB
        if (Number(workflow.questionPromptId) < 0) {
          const defaults = await promptsApi.getDefaultPrompts();
          template = defaults.find(
            (p) => p.id === Number(workflow.questionPromptId)
          )?.content;
        }

        // If that failed (or positive ID), load from DB
        if (!template) {
          const prompt = await db.prompts.get(
            Number(workflow.questionPromptId)
          );
          template = prompt?.content;
        }
      }
      // Fallback to default if nothing found
      if (!template) {
        const defaults = await promptsApi.getDefaultPrompts();
        template = defaults.find((p) => p.type === "question")?.content;
      }
      if (!template) throw new Error("Question prompt not found");

      const promptText = template.replace(/\{topic\}/g, workflow.topic);

      const response = await callPerplexity(
        apiKey,
        workflow.modelId || "sonar-pro",
        [{ role: "user", content: promptText }],
        workflow.options,
        { workflowId: numericId, workflowName: workflow.title }
      );

      const content = response.choices[0].message.content;
      const themes = parseQuestionsResponse(content);

      await db.transaction("rw", db.workflows, db.sections, async () => {
        await db.sections.where("workflowId").equals(numericId).delete();

        for (let i = 0; i < themes.length; i++) {
          await db.sections.add({
            workflowId: numericId,
            themeIndex: i,
            themeTitle: themes[i].title,
            questionsJson: JSON.stringify(themes[i].questions),
            status: "PENDING",
            retryCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }

        await db.workflows.update(numericId, {
          status: "QUESTIONS_READY",
          questionsJson: JSON.stringify(themes),
          updatedAt: new Date(),
        });
      });

      return workflowsApi.getWorkflow(numericId);
    } catch (e) {
      await db.workflows.update(numericId, { status: "FAILED" });
      throw e;
    }
  },

  mergeWorkflow: async (id: string | number) => {
    const sections = await db.sections
      .where("workflowId")
      .equals(Number(id))
      .sortBy("themeIndex");
    const completed = sections.filter((s) => s.status === "COMPLETED");

    const merged = completed
      .map((s) => `## ${s.themeTitle}\n\n${s.answersJson}`)
      .join("\n\n---\n\n");

    await db.workflows.update(Number(id), {
      mergedContent: merged,
      status: "COMPLETED",
      updatedAt: new Date(),
    });
    return db.workflows.get(Number(id));
  },
};
