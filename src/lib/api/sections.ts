import { db } from "../db";
import { callPerplexity } from "./perplexity";
import { promptsApi } from "./prompts";

export const sectionsApi = {
  getSections: async (workflowId: string | number) => {
    return db.sections
      .where("workflowId")
      .equals(Number(workflowId))
      .sortBy("themeIndex");
  },

  generateSectionAnswers: async (
    workflowId: string | number,
    sectionId: string | number,
    modelId?: string,
    params?: { promptContent?: string }
  ) => {
    const sId = Number(sectionId);
    const wId = Number(workflowId);
    const section = await db.sections.get(sId);
    if (!section) throw new Error("Section not found");

    await db.sections.update(sId, { status: "IN_PROGRESS" });

    try {
      const apiKeySetting = await db.settings.get("perplexityApiKey");
      const apiKey = apiKeySetting?.value;
      if (!apiKey) throw new Error("API Key not found");

      const workflow = await db.workflows.get(wId);
      const targetModelId =
        modelId ||
        section.modelId ||
        workflow?.modelId ||
        "sonar-pro";

      let template = params?.promptContent;
      if (!template) {
        const pId = section.answerPromptId || workflow?.answerPromptId;
        if (pId) {
          // Force load system prompts from code
          if (Number(pId) < 0) {
            const defaults = await promptsApi.getDefaultPrompts();
            template = defaults.find((p) => p.id === Number(pId))?.content;
          }
          if (!template) {
            const p = await db.prompts.get(Number(pId));
            template = p?.content;
          }
        }
      }
      if (!template) {
        const defaults = await promptsApi.getDefaultPrompts();
        template = defaults.find((p) => p.type === "answer")?.content;
      }
      if (!template) throw new Error("Answer prompt not found");

      const questions = JSON.parse(section.questionsJson) as string[];
      const questionsText = questions
        .map((q, i) => `${i + 1}. ${q}`)
        .join("\n");
      const promptText = template
        .replace(/\{topic\}/g, workflow?.topic || "")
        .replace(/\{theme_title\}/g, section.themeTitle)
        .replace(/\{questions\}/g, questionsText);

      const response = await callPerplexity(
        apiKey,
        targetModelId,
        [{ role: "user", content: promptText }],
        workflow?.options,
        { workflowId: wId, workflowName: workflow?.title }
      );

      const content = response.choices[0].message.content;

      await db.sections.update(sId, {
        status: "COMPLETED",
        answersJson: content,
        completedAt: new Date(),
        updatedAt: new Date(),
        retryCount: (section.retryCount || 0) + 1,
      });

      return db.sections.get(sId);
    } catch (e) {
      console.error(e);
      await db.sections.update(sId, {
        status: "FAILED",
        errorMessage: (e as Error).message,
        retryCount: (section.retryCount || 0) + 1,
      });
      throw e;
    }
  },

  retrySectionAnswers: async (
    workflowId: string | number,
    sectionId: string | number,
    params?: { promptContent?: string }
  ) => {
    return sectionsApi.generateSectionAnswers(
      workflowId,
      sectionId,
      undefined,
      params
    );
  },
};
