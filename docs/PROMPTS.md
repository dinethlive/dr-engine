# Prompt Engineering Guidelines

> [!WARNING]
> **CRITICAL: DO NOT MODIFY THE OUTPUT STRUCTURE**
> The DR-Engine relies on strict Regular Expression (Regex) patterns to parse the AI's response. Modifying the structural instructions or the format example in the prompt templates **WILL BREAK** the generating workflow.

## Overview

The generic "Question by Question" workflow operates in two distinct phases:
1. **Framework Generation**: Creates a structured list of themes and questions.
2. **Answer Generation**: Generates detailed answers for each section.

The application parses the output of Phase 1 to construct the database entries for Phase 2.

---

## 1. Framework Generation Prompt

**File**: `src/lib/api/prompt-templates.ts` (`QUESTION_PROMPT_TEMPLATE`)

### How the Parser Works
The function `parseQuestionsResponse` in `src/lib/api/perplexity.ts` looks for specific patterns:

1.  **Themes**: Must match patterns like `I. Title`, `**I. Title**`, or `Theme 1: Title`.
    -   *Regex*: `/^(?:#{1,3}\s*)?(?:\*\*)?\b([IVXL]+|[0-9]+)\.\s*(.+?)(?:\*\*)?$/i`
2.  **Questions**: Must start with a number, bullet, or dash, and **must include a question mark**.
    -   *Regex*: `/^(?:\d+\.|\*|-)\s+(.+)$/` + `.includes("?")`

### ✅ Safe to Customize
You may freely modify these sections to change the *content* and *quality* of the research:
-   `# CORE OBJECTIVES`: Change the goal of the research.
-   `# ANALYSIS PROTOCOL`: Change the methodology (e.g., from "Academic" to "Market Research").
-   `Terms & Definitions`: You can add domain-specific glossary instructions.

### ⛔ Do Not Touch
**DANGER ZONE**: Do not modify or remove these sections:
-   `# OUTPUT TYPE`: Research questions only.
-   `# OUTPUT STRUCTURE`: The definitions of "Thematic Matrix" and "Question Hierarchies".
-   `# FORMAT EXAMPLE`: This provides the few-shot example the AI follows. **Changing this will break the parser.**

---

## 2. Answer Generation Prompt

**File**: `src/lib/api/prompt-templates.ts` (`ANSWER_PROMPT_TEMPLATE`)

This prompt is less brittle structurally but important for quality.

### Variables
The engine injects the following variables at runtime:
-   `{topic}`: The main research topic.
-   `{theme_title}`: The specific section being processed.
-   `{questions}`: The list of questions belonging to that section.

### ✅ Safe to Customize
-   **Tone & Style**: Change "Academic yet accessible" to "Executive Summary style" or "Blog post style".
-   **Length**: Adjust "200-400 words" to your preference.
-   **Sources**: Modify citation rules (e.g., specific domains to include/exclude).

### ⛔ Do Not Touch
-   **Variable Placeholders**: Do not remove `{questions}`, or the AI won't know what to answer.

---

## Troubleshooting

If your workflows are stuck in "Generating Questions" or return empty sections:
1.  Check if you modified `QUESTION_PROMPT_TEMPLATE`.
2.  Did you change the specific numbering style (e.g., `1.` vs `One:`)?
3.  Did you remove the `FORMAT EXAMPLE` section?
4.  Revert to the original template and apply changes incrementally.
