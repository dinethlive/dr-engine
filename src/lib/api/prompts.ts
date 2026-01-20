import { db } from "../db";
import {
  QUESTION_PROMPT_TEMPLATE,
  ANSWER_PROMPT_TEMPLATE,
} from "./prompt-templates";

export const promptsApi = {
  getPrompts: async (type?: string) => {
    // Ensure defaults are up to date in DB
    const defaults = await promptsApi.getDefaultPrompts();
    // efficient bulk put? or just check? for now just put, it's small data.
    await db.prompts.bulkPut(defaults);

    if (type) return db.prompts.where("type").equals(type).toArray();
    return db.prompts.toArray();
  },

  getDefaultPrompts: async () => {
    return [
      {
        id: -1,
        name: "Advanced Framework Generator",
        type: "question",
        content: QUESTION_PROMPT_TEMPLATE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: -2,
        name: "Academic Answer Generator",
        type: "answer",
        content: ANSWER_PROMPT_TEMPLATE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  },

  createPrompt: async (data: any) => {
    const id = await db.prompts.add({ ...data, createdAt: new Date() });
    return db.prompts.get(id);
  },

  updatePrompt: async (id: number | string, data: any) => {
    await db.prompts.update(Number(id), { ...data, updatedAt: new Date() });
    return db.prompts.get(Number(id));
  },

  deletePrompt: async (id: number | string) => {
    await db.prompts.delete(Number(id));
    return { success: true };
  },

  duplicatePrompt: async (id: number | string) => {
    const original = await db.prompts.get(Number(id));
    if (!original) throw new Error("Prompt not found");

    const newId = await db.prompts.add({
      ...original,
      id: undefined, // Let DB assign new ID
      name: `${original.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return db.prompts.get(newId);
  },
};
