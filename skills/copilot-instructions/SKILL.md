---
name: copilot-instructions
description: Writes instructions for Microsoft Copilot declarative agents and Copilot notebooks. Covers the full declarative agent structure (purpose, guidelines, skills and workflows, output contracts, examples, self-evaluation gates), lighter notebook custom instructions (role, tone, file usage, output rules), structural rules for how the underlying model interprets Markdown, reasoning control cues, and common pitfalls with fixes. Use when writing instructions for a new agent or notebook, reviewing or improving existing instructions, or guiding a workshop participant through drafting their own. Triggers: "write agent instructions for", "review these agent instructions", "notebook instructions for", "help this participant draft their agent instructions".
---

# Copilot Instructions Writer

Write effective instructions for Microsoft Copilot declarative agents and Copilot notebooks.

## When to Use

Use this skill when:
- Writing instructions for a new Copilot declarative agent (Copilot Studio Lite or full)
- Writing custom instructions for a Copilot notebook
- Reviewing or improving existing agent/notebook instructions
- Helping a workshop participant draft their agent instructions

---

## Working Modes

### Mode 1: Write New Instructions

Ask which surface before starting:
1. **Declarative agent**: full instruction set with purpose, guidelines, skills/workflows, and output rules
2. **Copilot notebook**: lighter custom instructions focused on tone, format, and interaction pattern

Then gather inputs:
- What is this agent/notebook for? (one sentence)
- Who will use it?
- What knowledge sources does it have? (SharePoint, files, connectors, web search, etc.)
- What should it do vs. not do?
- Any specific tone, format, or output requirements?

### Mode 2: Review/Improve Existing Instructions

Read the current instructions and evaluate against the structure and best practices below. Produce a gap report with specific fixes, not general advice.

### Mode 3: Workshop Support

Guide a participant through drafting instructions for their use case. Ask questions one at a time. Bias toward helping them get a working draft they can iterate on, not a perfect first version.

---

## Declarative Agent Instructions

### Required Components

Every declarative agent needs these sections:

#### 1. Purpose / Objective
One clear statement of what the agent does and for whom.

```md
# OBJECTIVE
[What the agent does, who it helps, and what outcome it drives.]
```

#### 2. General Guidelines
Ground rules that apply across all interactions:
- **Tone**: specify explicitly (professional, friendly, concise, etc.). If you don't specify, the model will guess and be inconsistent.
- **Verbosity**: how detailed should responses be? (bullet points, short paragraphs, tables, etc.)
- **Restrictions**: what the agent should not do (e.g., don't make up data, don't answer questions outside scope)
- **Clarification behavior**: when to ask vs. when to proceed

```md
# RESPONSE RULES
- [Rule 1]
- [Rule 2]
- [Rule 3]
```

#### 3. Skills / Workflows
The core work the agent performs. Structure depends on complexity:

**For simple agents**: list capabilities as bullet points under a Skills section.

**For workflow agents**: break into numbered steps, each with:
- **Goal**: what this step accomplishes
- **Action**: what the agent does (and which tools/sources to use)
- **Transition**: how to move to the next step or end

```md
## Step 1: [Step Name]
- **Goal:** [Purpose of this step]
- **Action:** [What to do, which tools to use]
- **Transition:** [When/how to proceed to next step]
```

### Optional Components

Add these when relevant:

- **Output contract**: specify exact format, length, structure, and what to include/exclude
- **Examples**: show valid and invalid interactions (few-shot prompting). Use more than one example for complex scenarios.
- **Domain vocabulary**: define specialized terms, acronyms, or formulas the agent needs
- **Error handling**: what to do when data is missing, retrieval fails, or the question is out of scope
- **Self-evaluation gate**: a final check step before the agent responds (e.g., "Before finalizing, confirm all items from Section A appear in the summary.")
- **Follow-up and closing**: how to wrap up interactions

### Structural Rules

These rules come from how the underlying model interprets formatting:

| Do | Why |
|---|---|
| Use Markdown headers (`#`, `##`, `###`) for sections | Model uses structure to parse hierarchy |
| Use unordered lists (`-`) for parallel/independent tasks | Avoids implying false sequence |
| Use numbered lists (`1.`) only for true sequential steps | Numbers signal required order |
| Use backticks for tool/system names (e.g., \`ServiceNow\`) | Signals these are specific capabilities to invoke |
| Bold critical instructions with `**` | Draws model attention |
| Keep each instruction atomic (one action per bullet) | Prevents the model from merging or skipping steps |

| Don't | Why |
|---|---|
| Mix numbered and bulleted lists within one section | Confuses sequence vs. parallel interpretation |
| Write long paragraphs of instructions | Model loses signal in dense prose |
| Tell the agent what NOT to do without saying what TO do | Negative-only instructions are unreliable |
| Use vague verbs ("handle," "process," "manage") | Replace with specific verbs: "search," "extract," "ask," "send" |

### Explicitly Reference Knowledge and Actions

When instructions mention a knowledge source or action, name it:
- **Actions/plugins**: "Use \`Jira\` to fetch tickets"
- **Copilot connector knowledge**: "Use \`ServiceNow KB\` for help articles"
- **SharePoint/OneDrive**: "Reference the \`Q1 Budget\` SharePoint document"
- **Email**: "Check user emails for relevant information"
- **Teams**: "Search Teams chat history"
- **Code interpreter**: "Use code interpreter to generate charts"
- **People knowledge**: "Use people knowledge to fetch user email"

### Reasoning Control

Match reasoning depth to the task:

| Need | Cue to add |
|---|---|
| Deep analysis, planning, evaluation | "Use deep reasoning. Break the problem into steps, analyze each step, evaluate alternatives, and justify the final decision." |
| Balanced explanation | "Provide a concise but structured explanation. Include a short summary, key drivers, and a recommendation." |
| Fast extraction, lookup | "Short answer only. No reasoning or explanation. Provide the final result only." |

---

## Copilot Notebook Instructions

Notebook instructions are simpler. They control how the notebook assistant interacts with the files and pages in the notebook. There are no actions, plugins, or workflow steps.

### What You Can Configure
- **Voice and tone**: warm vs. neutral, direct vs. encouraging, level of formality
- **How to use the files**: which files to prioritize, which serve as reference or context for others, what role each file plays
- **Interaction patterns**: whether the assistant asks clarifying questions, acts as an analyst, follows a specific structure, teaches vs. answers
- **Output format**: bullet points, tables, numbered lists, language, number formatting
- **Brand or style rules**: color codes, naming conventions, capitalization, terminology

### What You Cannot Configure
- The notebook is grounded to its content only. It will not browse the web or access external sources.
- URLs in uploaded documents are not followable.
- SharePoint folder indexing does not work reliably.
- There are no actions or plugins available.

### Notebook Instruction Pattern

```md
## Role
[Who is this notebook assistant? e.g., "You are a brand compliance reviewer" or "You are a learning coach"]

## Tone
[How should it sound? e.g., "Professional and direct. Use bullet points. No filler language."]

## How to Use These Files
[Which files matter most, how they relate to each other, what role each plays]
- [File/page name]: [its purpose]
- [File/page name]: [its purpose]

## Output Rules
[Format, length, structure preferences]
- [Rule 1]
- [Rule 2]

## What Not to Do
[Boundaries, but pair each with what to do instead]
- Don't [X]. Instead, [Y]
```

---

## Common Pitfalls

| Problem | What Happens | Fix |
|---|---|---|
| No tone specified | Model guesses differently each time | Always specify tone and verbosity |
| "Don't do X" without alternative | Model has no positive signal to follow | Pair every restriction with what to do instead |
| Too many instructions at once | Model merges or skips steps | Break into atomic, single-action bullets |
| Example phrasing gets repeated verbatim | Model treats example as template | Add multiple varied examples, or note "vary your phrasing" |
| Agent calls tools without enough info | Wastes API calls, returns garbage | Add: "Only call the tool if necessary inputs are available; otherwise, ask the user" |
| Instructions work, then break after update | Microsoft periodically updates the underlying model | Add a literal-execution header if needed; revisit instructions after model changes |

---

## Iteration Process

Writing agent instructions is iterative. The cycle:

1. **Draft** instructions following the structure above
2. **Test** against real prompts (including edge cases and out-of-scope questions)
3. **Compare** agent responses to what regular Copilot would give (the agent should add value)
4. **Identify gaps**: where did it guess, hallucinate, skip steps, or produce wrong format?
5. **Tighten**: make the failing instruction more specific, add an example, or add a self-check

Don't aim for perfect on the first pass. Aim for a solid structure that you can refine through testing.
