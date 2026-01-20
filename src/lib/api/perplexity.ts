import { PerplexityResponse, PerplexityOptions } from "./types";
import { db } from "../db";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

const PRICING: Record<string, { input: number; output: number }> = {
  "sonar-reasoning-pro": { input: 2, output: 8 },
  sonar: { input: 1, output: 1 },
  "sonar-pro": { input: 3, output: 15 },
  "sonar-deep-research": { input: 2, output: 8 },
};

export async function callPerplexity(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
  options?: PerplexityOptions,
  usageMeta?: { workflowId?: number; workflowName?: string }
) {
  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 16000,
      temperature: 0.2,
      ...options,
    }),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: { message: response.statusText } }));
    throw new Error(
      `Perplexity API Error: ${error?.error?.message || response.statusText}`
    );
  }

  const data = (await response.json()) as PerplexityResponse;

  // Calculate and store usage
  if (data.usage) {
    try {
      const prices = PRICING[model] || { input: 0, output: 0 };
      const cost =
        (data.usage.prompt_tokens * prices.input +
          data.usage.completion_tokens * prices.output) /
        1_000_000;

      await db.usage.add({
        date: new Date().toISOString().split("T")[0],
        model,
        tokens: data.usage.prompt_tokens + data.usage.completion_tokens,
        inputTokens: data.usage.prompt_tokens,
        outputTokens: data.usage.completion_tokens,
        cost,
        workflowId: usageMeta?.workflowId,
        workflowName: usageMeta?.workflowName,
      });
    } catch (error) {
      console.error("Failed to save usage stats:", error);
      // Don't fail the request if usage saving fails
    }
  }

  return data;
}

export function parseQuestionsResponse(content: string) {
  const activeThemes: { title: string; questions: string[] }[] = [];
  const lines = content.split("\n").map((l) => l.trim());

  let currentTheme: { title: string; questions: string[] } | null = null;

  for (const line of lines) {
    // 2. Detect Theme Headers (I. Title, **I. Title**, ### I. Title, Theme I: Title)
    const themeMatch =
      line.match(
        /^(?:#{1,3}\s*)?(?:\*\*)?\b([IVXL]+|[0-9]+)\.\s*(.+?)(?:\*\*)?$/i
      ) || line.match(/^Theme\s+([IVXL0-9]+)[\s:-]+(.+)$/i);

    if (themeMatch) {
      const numeral = themeMatch[1].toUpperCase();
      const rawTitle = themeMatch[2].replace(/\*\*/g, "").trim();

      if (rawTitle.length < 100 && !rawTitle.includes("?")) {
        // If we see a repeat header (e.g. from Section A and B), switch back to the existing one
        // to collect questions from both or prioritize one.
        const existing = activeThemes.find((t) =>
          t.title.startsWith(numeral + ".")
        );
        if (existing) {
          currentTheme = existing;
        } else {
          currentTheme = { title: `${numeral}. ${rawTitle}`, questions: [] };
          activeThemes.push(currentTheme);
        }
        continue;
      }
    }

    // 3. Extract Questions (Lines starting with list markers)
    const listMatch = line.match(/^(?:\d+\.|\*|-)\s+(.+)$/);
    if (listMatch) {
      const qText = listMatch[1].trim();
      // Filter out metadata and formatting
      const isMetadata = qText.match(
        /^(Theme Title|Relevance|Research|Cross-link|Justification|Vector|Why it matters|Sample|Primary research|Data source|Analytical|Ethical|Tier)/i
      );
      const isActuallyAQuestion = qText.includes("?");

      if (qText.length > 8 && !isMetadata && isActuallyAQuestion) {
        const cleanQ = qText.replace(/\*\*/g, "").trim();
        if (currentTheme) {
          currentTheme.questions.push(cleanQ);
        } else {
          // Fallback to general if no theme header yet
          let general = activeThemes.find(
            (t) => t.title === "General Research"
          );
          if (!general) {
            general = { title: "General Research", questions: [] };
            activeThemes.push(general);
          }
          general.questions.push(cleanQ);
        }
      }
    }
  }

  // Filter to themes that actually have questions
  const finalThemes = activeThemes.filter((t) => t.questions.length > 0);

  // Final Fallback if everything failed
  if (finalThemes.length === 0 && content.trim()) {
    const fallBackQuestions = lines
      .filter((l) => l.includes("?") && l.length > 15)
      .map((l) =>
        l
          .replace(/^(?:\d+\.|\*|-)\s+/, "")
          .replace(/\*\*/g, "")
          .trim()
      );

    if (fallBackQuestions.length > 0) {
      return [{ title: "Research Framework", questions: fallBackQuestions }];
    }
    return [
      {
        title: "Research Analysis",
        questions: ["Review the raw output for structured insights."],
      },
    ];
  }

  return finalThemes;
}
