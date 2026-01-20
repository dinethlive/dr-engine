import { type Prompt } from "@/types/workspace";

export const getDefaultAnswerPrompt = (prompts: Prompt[]) => {
    return prompts.find((p) => p.isDefault) || prompts[0];
};
