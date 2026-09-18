---
name: qrg-writer
description: Writes Quick Reference Guide (QRG) content for role-based AI resources, the leave-behind reference documents participants use after a workshop. Built from activity research findings and aligned with the facilitation guide and slides. Covers three modes: new resource, add an activity to an existing resource, and refine against final deliverables. Use when building a new QRG, adding a section, aligning a QRG after the facilitation guide or slides change, or reviewing QRG content for structure, voice, or density. Triggers on "build a QRG from these research docs", "add this activity to the existing QRG", "refine the QRG against the final facilitation guide", "convert this activity research into a QRG section".
---

# QRG Writer

Write Quick Reference Guide (QRG) content matching Mellonhead's established QRG patterns. This skill defines the structure, voice, density, visual patterns, and section types derived from two gold standards and the Translation Playbook's Role-Based Resource template.

## What a QRG Is

A QRG (Quick Reference Guide) is a **role-based AI resource**: a cumulative, living document that grows over time. Initial sections come from workshop activities, but the resource is designed to expand as new techniques are added from follow-up workshops, AI champion recommendations, or team experimentation.

It serves two functions:

1. **Quick lookup**: scan to find the approach, prompt, or tip for a specific task
2. **Deeper understanding**: read the expandable cards to understand why the approach works

QRGs are **not** simplified versions of the facilitation guide. They are synthesized from the **activity research findings**, aligned with the facilitation guide and slides, but contain more detail than either. The audience is the end user, not the facilitator.

**Critical framing rule:** QRGs are standalone reference documents. Content must work for someone who attended a workshop yesterday AND a new hire who never will. Never reference "the workshop," "what we covered today," or assume the reader was in the room. Each activity section should also be self-contained. Don't frame one section relative to another ("the previous two sections...") since activities may be reordered or the resource may grow over time.

## When to Use

- **New QRG:** Building a new resource from 1-4 activity research documents
- **Add to existing QRG:** Adding a new activity section to an existing resource
- **Refine against final deliverables:** The QRG exists but the facilitation guide or slides have been tightened since it was written. Align framing, language, and key lines.
- **Review:** Checking QRG content for structure, voice, or density issues
- **Convert:** Turning activity research into a participant-facing QRG section

---

## Build Modes

Determine the mode from the user's input before starting.

### Mode 1: New Resource

The user is creating a QRG from scratch from 1-4 activity research documents.

1. Confirm the resource title, audience/role, and which activities to include
2. Build the **cover page** first (spec: `references/section-specs.md`)
3. Run the full Phase 1-2-3 workflow (below) for each activity
4. Activities can be written one at a time or all at once. Ask the user's preference. One at a time allows feedback between activities; all at once is faster if the user is confident in the approach.

**If the user shares fewer activities than the workshop contains** (e.g., 2 of 3 because one research doc is pending):
- Build the cover page with all planned activities listed in the TOC
- Mark pending activities as "[Coming soon]" or similar in the TOC
- Write the available activity sections
- The resource is designed to be extended later via Mode 2

### Mode 2: Add to Existing Resource

1. **Read the existing QRG** to understand the established patterns: voice, framing, detail level, any custom blocks already in use, how the cover page is structured
2. **Match the existing resource's conventions.** The new section should feel like it was written at the same time as the others. Match: approach card density and structure, Pro Tip count and style, limitation specificity level, sample prompt complexity and annotation style, and any custom block patterns already established
3. Run Phase 1-2-3 for the new activity, calibrated to the existing resource
4. **Update the cover page** TOC to include the new activity
5. If the new activity introduces a custom block type not used in the existing sections, flag this to the user. It may warrant adding similar blocks to the other activities for consistency.

### Mode 3: Refine Against Final Deliverables

The QRG has already been written, and the facilitation guide and/or slides have since been finalized: problem framings sharpened, talk tracks refined, key lines landed, activity names changed.

**Why this mode exists:** QRGs are initially built from activity research (the deepest source). But the facilitation guide is where framing gets tested and tightened through iteration. The slides are where activity names, approach steps, and taglines get finalized. By the time both are done, they often contain sharper language, stronger one-liners, renamed activities, and clearer framings than the research doc. The QRG needs to absorb those improvements without losing its own depth.

**Workflow:**

1. **Read the QRG, the final facilitation guide, and the final slides.** All three. Changes can come from either source: the facilitation guide for framing and talking points, the slides for naming and visual structure.

2. **Compare section by section.** For each activity, check:
   - **Opening paragraph:** Does the QRG's pain framing match the facilitation guide's problem framing? The facilitation guide version is often tighter and more visceral after iteration. Carry over specific language: the exact scenario, the numbers, the phrasing.
   - **Key Mental Shift:** Does the one-liner still reflect the approach as taught? Check for terminology drift (e.g., a step was renamed but the mental shift still uses the old name).
   - **Approach steps:** Do the step names and descriptions match the facilitation guide's approach section? Look for renamed, reordered, or reframed steps.
   - **Best practice themes to Pro Tips / Limitations:** The facilitation guide names themes during the compare/discuss segment (e.g., "AI fills silence," "Check the seams," "Scope"). These should be represented in the QRG's Pro Tips or Limitations. The QRG versions will be more tactical, but the core insight should match.
   - **Strong one-liners:** The facilitation guide often produces memorable lines during iteration ("If the emails don't clearly say it, AI shouldn't either," "Scope is the prompt before the prompt"). These should appear in the QRG, in approach cards, pro tips, or limitations, where they strengthen the section.
   - **Sample prompt criteria/content:** Compare the QRG's sample prompt against the slides' sample prompt. Check that criteria lists, examples, and key elements match. If the slides show 4 criteria but the QRG has 6, the extra ones likely got cut for a reason.
   - **Refining Your Results questions:** Should reflect the most common failure modes taught in the workshop. Check for terminology alignment.
   - **Activity framing / transitions:** The facilitation guide may frame an activity differently than the research did (e.g., emphasizing "this is overhead, not your job" instead of "you can't pinpoint what's missing"). The QRG opening should match the final facilitation framing.

3. **Present findings as a gap report.** For each discrepancy: what the facilitation guide says, what the QRG currently says, and whether it's a must-fix (framing drift, terminology mismatch) or a could-improve (stronger line available).

4. **Make the edits** after user review, or immediately if the user asks.

**What to carry over from the facilitation guide:** exact scenario language from problem framings (the specifics matter: "13 replies" not "dozens of replies"), named themes from best-practice discussions, strong one-liners that became teaching anchors, reframed concepts or renamed steps, and the framing arc across activities (e.g., an "organizing to evaluating" progression).

**What NOT to carry over:** facilitation-specific instructions (how to read the room, when to call on people), workshop timing or segment structure, facilitator-facing meta-commentary ("this is where the room warms up"), and language calibrated for live delivery that doesn't work on the page (e.g., "quick show of hands").

---

## Source Material Hierarchy

QRG content draws from three sources in this priority order:

1. **Activity research** (primary): the detailed findings, techniques, examples, limitations, and pro tips that form the substance of each section
2. **Facilitation guide** (alignment): ensures the QRG matches what was taught in the workshop: same approach steps, same framing, same key concepts
3. **Slides** (alignment): ensures naming, taglines, and key messages are consistent

**The rule:** Activity research provides the depth. The facilitation guide and slides provide the frame. If the research has detail the workshop didn't cover, include it. The QRG is where that depth lives.

**Activity name consistency:** Activity names must match across the facilitation guide, slides, and QRG. If names diverge during development (e.g., the research called it "Decision timelines" but the final workshop renamed it "Getting up to speed"), the QRG uses the final workshop name from the slides. Don't create a different descriptive name for the QRG.

**Relationship to activity arcs:** The workshop's activities follow the arcs defined in `methodology/activity-arcs.md` (project root). The QRG's section sequence is fixed and arc-independent, but workshop content flows into QRG sections per the mapping table in that file, and the reflection language participants saw in the workshop should carry into the QRG's Refining Your Results questions.

---

## Document Structure

Every QRG is a **cover page** plus one **activity section** per activity. The activity section sequence is fixed:

| # | Section | Required | Purpose |
|---|---------|----------|---------|
| 1 | Title + Opening | Yes | Name the activity and frame the pain |
| 2 | Key Mental Shift | Yes | One-sentence reframe in a callout |
| 3 | Approach | Yes | Numbered steps with expandable detail |
| 4 | Sample Prompt | Yes | Full annotated prompt |
| 5 | Pro Tips | Yes | Tactical numbered grid |
| 6 | Limitations | Yes | Honest failure modes |
| 7 | Refining Your Results | Yes | Self-diagnostic questions |
| 8 | Custom Blocks | Per activity | Activity-specific content that doesn't fit sections 1-7. Requires design discussion. |

Full per-section specs (cover page and sections 1-7): `references/section-specs.md`. Custom block types and design process: `references/custom-blocks.md`. Gamma rendering patterns: `references/gamma-build.md`.

---

## Voice and Tone

All voice and style rules: `/writing-guide.md` (canonical). That covers dash rules (§3.1), plain language and jargon (§3.2, including "leverage" and "utilize"), no sweeping generalizations (§3.3), the problem-first "AI is not the hero" structure (§3.7), and word swaps (§9). This skill adds only the QRG-specific rules:

**Naming rule (§9.2):** "QRG" is our internal name for this artifact and it never appears in the document itself or in any copy that announces it. To the reader it is a **reference guide** or a **resource**. Same rule for the authoring tool (Gamma, Rise) and every other production acronym (VILT is a virtual workshop, ILT is an in-person workshop). Full table: `/write-learning` §0.


- **Reference-guide register, not instructional.** Written for a busy, skeptical professional doing quick lookup. "Define the audience in your prompt." Not "You should always remember to..."
- **Direct second person.** "You", "your" throughout. Never "one should" or "users can."
- **Role-grounded specificity.** Every example anchored in a believable role-specific scenario. Generic = "summarize this document." Specific = "Summarize the various scams that have been emailed to me in 2025."
- **Example/Not pairs** correct anticipated misuse without lecturing. Show the gap rather than describe it:
  ```
  Example: "Messages from my direct reports this month regarding budget approvals"
  ✗ Not: "emails containing 'budget'"
  ```
  Use wherever the reader might default to keyword-search thinking, be too vague, or skip context AI needs.
- **Casing:** Sentence case for all headings, labels, and titles ("Lock the scope", "Pro tips", "Refining your results"). After a colon, capitalize the first word. Named frameworks, tools, and formal titles retain Title Case ("The ABA Ethical Decision Framework", "Microsoft Copilot"). No periods at the end of bullets unless they're full sentences.

---

## Density Targets

| Section | Target word count | Notes |
|---------|------------------|-------|
| Opening paragraph | 20-50 words | 1-3 sentences. Punchy. |
| Key Mental Shift | 10-20 words | One bold sentence. |
| Approach step card | 30-80 words | If over 80, add sub-structure. |
| Sample Prompt (the prompt itself) | 30-100 words | Longer is fine if structured. |
| Prompt annotation labels | 5-10 words each | Component name + brief description. |
| Pro Tip | 15-30 words | Bold title + 1-2 sentences. |
| Limitation | 15-30 words | Bold lead-in + explanation. |
| Refining question | 8-15 words | One question per bubble. |

**The rule:** QRGs have more text than slides but less than activity research. Every section should be scannable. If a reader can't find what they need in 5 seconds of scanning, restructure.

---

## Phase 1-2-3 Workflow (Per Activity)

Runs once per activity section. For Mode 1, run it for each activity. For Mode 2, run it for the new activity only, calibrated to the existing resource's conventions.

**Phase 1: Read and Map**

1. **Read the activity research document.** If building a new resource with multiple activities, read all research docs first to understand the full picture before starting any single section. If adding to an existing resource, also read the existing QRG to match its patterns.
2. **Map the activity to the standard section sequence.** Note where content maps cleanly and where it doesn't.
3. **Cross-reference the facilitation guide and slides.** The approach steps in the QRG should match the approach taught in the workshop. The framing should be consistent. Activity names in the QRG must match the final slide names.

**Phase 2: Identify Custom Blocks (Mandatory Step)**

4. **Surface what doesn't fit.** After mapping to the standard sections, look at what's left in the research. Ask the four discovery questions in `references/custom-blocks.md`: prerequisite the reader might not have? distinct sub-workflow? organizational or tool-specific rules? important depth that would break scannability?
5. **Discuss custom blocks with the user.** For each piece of content that needs one, present: what content it is and why it doesn't fit the standard sections, which custom block type it maps to, and recommended placement, detail level, and framing. Get agreement before writing. These are information architecture decisions that affect how the reader navigates the whole section.

**Phase 3: Write**

6. **Extract from the research, don't paste.** Activity research is written for the facilitator/researcher. QRG content is written for the end user. Research findings become approach step cards; research limitations become the Limitations section (rewritten as direct, user-facing statements); research pro tips become Pro Tips (made tactical, not conceptual); research example prompts become the Sample Prompt (re-grounded in this audience's scenarios); research depth outside the standard sections becomes custom blocks.
7. **Write the Key Mental Shift last.** You need to understand the full approach before you can name the one-sentence reframe that makes it click.
8. **Write Example/Not pairs** for any approach step where the reader might default to the wrong mental model. Pull these from the activity research's guidance on what works vs. what doesn't.
9. **Ground every sample prompt** in a scenario this specific audience would recognize. If the workshop is for Member Communications, the prompt should reference briefs, editorial reviews, stakeholder meetings, not generic "documents" or "emails."
10. **Check density.** If any section exceeds its target, restructure. If any approach card exceeds 80 words, add sub-bullets or split into two cards.

**Conversion example:**

Activity research (from researcher's notes):
> AI is good at pulling specific facts out of large amounts of text: dates, names, exact quotes. It can do in 15 seconds what takes you half an hour of scrolling. But if you skip the fact-extraction step and just say "summarize this thread," AI will guess. It'll smooth over details, imply things that weren't said, and mix facts with assumptions.

QRG approach card:
> **Extract Facts First**
>
> Tell AI to pull dates, names, and exact quotes. Facts only. Do not ask for a summary in the same step.
>
> Example: "List every decision mentioned in this thread with the date, who said it, and their exact words."
>
> ✗ Not: "Summarize this email thread"
>
> If the emails don't clearly say it, AI shouldn't either.

The research explains why. The QRG tells them what to do and shows the contrast.

---

## Anti-Patterns (What NOT to Do)

- **Generic prompts.** "Summarize this document" as a sample prompt. Every prompt must be role-grounded with a specific scenario.
- **Conceptual Pro Tips.** "Think about your audience" is not a Pro Tip. "Define the audience in your prompt: job title, decision stage, and what they'll do with the output" is.
- **Soft limitations.** "AI may sometimes not get things exactly right" is vague and useless. "Draft quality: LLMs can miss changes or hallucinate information not in the document. This happens more often as document size increases." is specific and actionable.
- **Missing Example/Not pairs.** If an approach step involves prompting, it needs at least one Example/Not pair showing the right vs. wrong way to phrase it.
- **Wall of text approach cards.** If a card is longer than 80 words without sub-structure, it's not scannable. Add bullets, sub-headers, or split into two cards.
- **Inconsistent section sequence.** Every activity follows the same arc. Don't skip Limitations. Don't skip Refining Your Results. Don't reorder sections.
- **Instructional tone.** "You should always remember to..." is lecturing. "Define the audience in your prompt." is a reference guide.
- **AI as hero.** "AI can synthesize emails for you" vs. "Quickly piece together context so you can act, brief others, or make decisions." The second one centers the reader's outcome.

---

## Reference Files

- `references/section-specs.md`: cover page spec and full specs for sections 1-7 (Title + Opening, Key Mental Shift, Approach, Sample Prompt, Pro Tips, Limitations, Refining Your Results). Load before writing any activity section.
- `references/custom-blocks.md`: the five custom block types, discovery questions, and information architecture decisions. Load during Phase 2 of every activity.
- `references/gamma-build.md`: page setup, card system, color system, and diagram conventions for the Gamma render. Load when preparing markdown for Gamma.
- `methodology/activity-arcs.md` (project root): canonical activity arc definitions and the arc-step-to-QRG-section mapping.

---

## Gold Standard References

- **Chiefs W1 AI Role-based Resource** (5 pages, 4 activities): standard activity sections, prerequisite workflows, sub-workflows, organizational context blocks. Location: `course-material/ABA/ABA_Programs/Role_Based_Workshops/Chiefs/W1_Key_Use_Cases_and_Fundamentals/AI-for-Chiefs-Role-based-AI-Resource.pdf`
- **Member Comms W1 AI for Member Communications** (3 activities): standalone framing (no workshop references), prerequisite table block, "Other uses" block, comparison/extended reference block (writing machine-scorable criteria). Location: `course-material/ABA/ABA_Programs/Role_Based_Workshops/Member_Comms/Deliverables/Workshop-1_AI-for-Overhead/member-comms-qrg.md`
