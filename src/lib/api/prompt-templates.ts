export const QUESTION_PROMPT_TEMPLATE = `# ADVANCED RESEARCH FRAMEWORK GENERATOR

**Primary Topic:**
{topic}

---

## CORE OBJECTIVES:
Generate a multi-dimensional research architecture that maps the intellectual landscape of the primary topic through systematic thematic decomposition and question hierarchies.

**OUTPUT TYPE**: Research questions only (no answers provided)

---

## ANALYSIS PROTOCOL:

### Phase 1: Landscape Mapping
- Conduct semantic field analysis to identify conceptual clusters
- Map interdisciplinary connections and boundary zones
- Prioritize topics by: research momentum (2020-2025), theoretical significance, practical impact, and knowledge gaps
- Identify emergent vs. established themes

### Phase 2: Thematic Architecture
- Extract 10-12 core thematic dimensions
- Weight by: centrality to field, research activity, transformative potential, and accessibility
- Consider multiple lenses: epistemological, methodological, applied, ethical, and systemic

---

## OUTPUT STRUCTURE:

### A. THEMATIC MATRIX

For each theme (I-XII):
- **Theme Title** [Concise descriptor]
- **Relevance Score** [High/Medium context]
- **Research Maturity** [Emerging/Developing/Established]
- **Cross-links** [Related themes by number]
- **Justification** [2-3 sentences on significance and current state]

---

### B. QUESTION HIERARCHIES

For each theme, generate 12 research questions ONLY (no answers) across six cognitive levels:

**Tier 1: Foundation (Questions 1-2)**
- Definitional clarity and conceptual boundaries
- Historical context and evolution

**Tier 2: Analysis (Questions 3-4)**
- Mechanism examination and pattern identification
- Comparative frameworks

**Tier 3: Application (Questions 5-6)**
- Real-world implementation and case studies
- Tool development and methodology

**Tier 4: Integration (Questions 7-8)**
- Cross-disciplinary synthesis
- System-level interactions

**Tier 5: Evaluation (Questions 9-10)**
- Critical assessment of approaches
- Limitation analysis and validity testing

**Tier 6: Innovation (Questions 11-12)**
- Future trajectories and speculative scenarios
- Paradigm-shifting possibilities and unasked questions

**IMPORTANT**: Provide ONLY the questions. Do not provide any answers, explanations, or elaborations for individual questions.

---

### C. RESEARCH VECTORS

Identify 5 high-impact research trajectories that span multiple themes:
1. **Vector Name**: [Description]
   - Connecting themes: [List]
   - Why it matters: [2 sentences]
   - Sample investigation: [1 concrete research direction]

---

### D. METHODOLOGICAL CONSIDERATIONS

For the topic overall:
- **Primary research methods** applicable
- **Data sources and types** commonly used
- **Analytical frameworks** most relevant
- **Ethical considerations** to address

---

## ENHANCED FEATURES:

✓ **Complexity Gradient**: Questions progress from accessible entry points to expert-level inquiries
✓ **Interconnectivity Map**: Explicit links between related themes
✓ **Temporal Dimension**: Balance between historical foundations and cutting-edge developments
✓ **Actionability Index**: Each question designed to generate concrete research pathways
✓ **Gap Identification**: Highlight under-researched areas
✓ **Stakeholder Relevance**: Note which questions matter to practitioners, policymakers, or theorists

---

## QUALITY CRITERIA:

- Zero redundancy across questions
- Each question should be independently researchable
- Mix of "what/how/why" interrogatives
- Include both convergent (answerable) and divergent (exploratory) questions
- Avoid yes/no questions; prioritize open-ended inquiry
- Ensure questions scale from undergraduate to postdoctoral level
- Questions should be self-contained and clear without requiring answers

---

## FORMAT EXAMPLE:

**I. [THEMATIC ASPECT TITLE]**
- **Relevance Score**: High
- **Research Maturity**: Developing
- **Cross-links**: Themes III, VII, X
- **Justification**: [2-3 sentences explaining why this theme is critical to understanding the primary topic and its current state in the research landscape]

**Questions:**
1. [Foundation question - clear, specific, researchable]
2. [Foundation question - clear, specific, researchable]
3. [Analysis question - clear, specific, researchable]
4. [Analysis question - clear, specific, researchable]
5. [Application question - clear, specific, researchable]
6. [Application question - clear, specific, researchable]
7. [Integration question - clear, specific, researchable]
8. [Integration question - clear, specific, researchable]
9. [Evaluation question - clear, specific, researchable]
10. [Evaluation question - clear, specific, researchable]
11. [Innovation question - clear, specific, researchable]
12. [Innovation question - clear, specific, researchable]

[Continue for themes II-XII]`;

export const ANSWER_PROMPT_TEMPLATE = `# COMPREHENSIVE RESEARCH ANSWER GENERATOR

## PRIMARY CONTEXT:
**Topic**: {topic}

**Target Theme**: {theme_title}

---

## INSTRUCTIONS:

Provide comprehensive, research-backed answers for all questions under the specified theme. Maintain the original question numbering and phrasing exactly as provided in the research framework document.

---

## QUESTIONS TO ANSWER:
{questions}

---

## ANSWER REQUIREMENTS:

### Content Standards:
- **Depth**: Each answer should be 200-400 words (adjust based on question complexity)
- **Structure**: Clear paragraphs with logical flow
- **Tone**: Academic yet accessible; suitable for graduate-level research
- **Evidence**: Include specific examples, case studies, or data where applicable
- **Current**: Prioritize recent developments (2020-2025) while acknowledging foundational work

### Research Quality:
- Draw from peer-reviewed sources, authoritative texts, and reputable publications
- Include multiple perspectives where scholarly debate exists
- Distinguish between established consensus and emerging theories
- Acknowledge limitations or gaps in current research

### Citation Protocol:
- **DO NOT cite the uploaded framework document**
- Cite actual research sources, publications, and authoritative references
- Place citations at the end of each answer under "**Sources:**"
- Use consistent citation format: Author(s), Year, Title/Publication

---

## OUTPUT FORMAT:

**{theme_title}**

**Question 1**: [Original question text from framework]

**Answer**:
[Comprehensive answer addressing all aspects of the question. Include relevant theories, frameworks, empirical findings, practical applications, and critical analysis where appropriate.]

**Sources**:
- [Source 1: Author(s), Year, Publication/Title]
- [Source 2: Author(s), Year, Publication/Title]
- [Source 3: Author(s), Year, Publication/Title]
[3-5 sources per answer recommended]

---

**Question 2**: [Original question text from framework]

**Answer**:
[Comprehensive answer...]

**Sources**:
- [Source 1]
- [Source 2]
- [Source 3]

---

[Continue for all questions under the specified theme]

---

## QUALITY CHECKLIST:

✓ Each answer directly addresses the question asked
✓ Original question numbering preserved
✓ No citations to the framework document itself
✓ Sources are credible and verifiable
✓ Recent research (2020-2025) incorporated where available
✓ Technical terms defined on first use
✓ Balance between theory and application
✓ Acknowledgment of knowledge gaps or ongoing debates
✓ Logical flow from foundational concepts to advanced implications`;
