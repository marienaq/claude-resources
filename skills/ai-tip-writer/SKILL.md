---
name: ai-tip-writer
description: Writes AI tip-of-the-week content for ongoing client series ({{client}} all-staff forum, future clients; {{past client}} is a past-client reference implementation). Handles topic scoping with a six-category problem framework, tip drafting (setup, tactic, sample prompt, speaker notes), cross-client adaptation, and output to PPTX (new deck or appended to existing). Pairs with /{{client}}-presentation for {{client}}-branded artifacts. Triggers: "start a new batch of tips," "add 5 more tips to the existing batch," "adapt a past tip for a new client," "review this batch lineup."
---

# AI Tip Writer

Write the recurring "AI Tip of the Week" content that lands in client all-staff forums, internal newsletters, or running tip docs. The pattern is the same regardless of audience: a problem hook, 2-3 concrete tactics, a sample prompt, and facilitator talking points.

## When to Use

- Starting a new tip series for a client
- Adding more tips to an existing series
- Adapting tips written for one client to another (different audience, examples, or AI tool)
- Reviewing/refining a draft batch before it ships

## Reference Implementations

- **{{past client}}** (gold standard from a past client engagement, ran ~16 weeks): `course-material/{{past client}}/AI Tip of the Week.docx`, a Word doc running log, monthly themes (Copilot, {{custom assistant}}, do/don't), broad-staff audience
- **{{client}} Batch 1** (May 2026): `course-material/{{client}}/ai-advisory/2026-05-ai-tip-of-the-week/`, markdown source + 21-slide PPTX (cover + 10 tips x 2 slides), no themes, broad-staff audience for all-staff forum

Both follow the same writing pattern; the artifacts and brand differ.

## Format

### Tip structure (every tip has these elements)

| Element | Purpose | Length |
|---|---|---|
| **Title** | Action-oriented hook that names the problem or the move | 5-12 words |
| **Setup** | One or two sentences naming the problem the tip solves | 1-2 sentences |
| **Tactic** | 2-3 numbered items, each with a bold lead and a body explanation | Each item ~1-2 sentences |
| **Sample prompt** | Audience-appropriate prompt the reader can copy and adapt | 1-3 sentences, optional `[action cue]` line |
| **Speaker notes** | 3-4 facilitation talking points for whoever delivers it | Bulleted, peer voice |

### Voice and density rules

All voice and style rules: `/writing-guide.md` (canonical). Problem-first framing, AI is never the hero, peer voice, dash rules, and hype bans all live there. This skill adds only the tip-specific rules:

- **Slide-density.** Body content fits on one slide (~50 words for setup + tactic, plus the prompt callout). If a tip needs more, the tactic is too broad. Split it.
- **Sample prompts ground in real audience scenarios.** {{client}} examples reference banking, regulators, members. {{past client}} examples reference housing, residents, IT tickets. Don't write generic "[topic]" placeholders unless that's the point of the tip.
- **Action cues are optional.** When a tip has a physical action (turn on the mic, click the icon, save to a notebook), close the prompt with `[action cue]` on its own line. Don't force this for tips that don't need it.

## Problem Categories Framework

Most useful tips draw from one of these six categories. Use the framework during scoping to make sure a batch covers a mix (avoid 5 prompting tips in a row).

| Category | Recognizable problem | Example tip moves |
|---|---|---|
| **Output quality** | AI sounds confident but wrong; output is generic; voice got flattened; missed the point | Get pushback not agreement; ask for evidence not reassurance; force specificity |
| **Prompting friction** | Prompts too vague; no context; one-shot when iteration would help | Give context (the why); ask AI to interview you; widen view before drafting |
| **Workflow confusion** | When to start a new chat; which tool/feature; long-doc context limits | Close out a useful chat; one topic per chat; hover for paragraph-level edits |
| **Judgment & trust** | When to verify; when to disclose; when not to use AI | Disclose when AI materially shaped the work; treat output like a fast intern's draft |
| **Underused features** | Voice; prompt library; file uploads; pinning; saved prompts | Talk to Copilot instead of typing; bookmark your best prompts |
| **Thinking vs. doing** | AI used as a vending machine instead of a thought partner | Use AI to widen your view; ask "what am I missing"; brainstorm before drafting |

A good 10-tip batch hits at least 4 of the 6 categories.

## Working Modes

### Mode 1: Topic Scoping

**When:** Starting a new batch, or planning the next set of tips for an existing series.

**Process:**
1. **Confirm the audience and channel** before brainstorming:
   - Audience (broad workforce, champions, role-specific, mixed)
   - Distribution (slide in deck, email, Teams post, running doc)
   - Themes (none, monthly rotation, sequential learning arc)
   - First tip date / cadence
   - Number of tips in the batch
   - Tone reference (peer? executive? technical?)
2. **Review existing series** if any:
   - What's been covered (avoid repeating)
   - What categories are over-represented
   - What stakeholder feedback came in (most-clicked, most-asked-about)
3. **Brainstorm by problem category.** Surface 3-5 candidate tips per relevant category. Don't filter yet.
4. **Sequence the lineup:**
   - Mix categories week to week (avoid 3 prompting tips in a row)
   - Open with high-recognition problems (sycophancy, generic outputs, "are you sure" follow-ups)
   - Save feature-discovery tips (voice, prompt library) for later in the batch, once people are bought into the practice
   - Connect related tips with internal references ("see Tip #2") to reinforce learning
5. **Identify research/source needs.** Tips backed by evidence cite their source in the markdown:
   - Sycophancy: `Articles and Research/reducing-ai-sycophancy.md`
   - Meeting transcripts: Member Comms W1 deliverable (`course-material/{{client}}/ABA_Programs/Role_Based_Workshops/Member_Comms/Deliverables/Workshop-1_AI-for-Overhead/ABA_ AI for Meeting Transcripts.md`)
   - Brain fry / cognitive load: `Articles and Research/brain-fry-email-draft.md` + `When Using AI Leads to "Brain Fry".pdf`
6. **Output:** Lineup table with date, title, hook (1 line), category, source (if any). Confirm with user before drafting.

**Output template:**

```markdown
| # | Date | Title | Category | Hook | Source |
|---|------|-------|----------|------|--------|
| 1 | YYYY-MM-DD | [Title] | [Category] | [1-line problem to tactic] | [path or "none"] |
```

### Mode 2: Tip Drafting

**When:** A confirmed lineup needs to be drafted out, or an individual tip needs revision.

**Process per tip:**
1. **Setup.** Write 1-2 sentences naming the problem. Lead with a recognizable moment, not a feature.
2. **Tactic.** Draft 2-3 numbered items. Each starts with a bold lead (the action), followed by the body (the reasoning or example). If the tactic is "do X," the lead names X and the body explains how/why.
3. **Sample prompt.** Write a prompt the reader can copy. Use audience scenarios (banking for {{client}}, housing for {{past client}}). Add `[action cue]` only if there's a physical step (mic on, click icon, save to notebook).
4. **Speaker notes.** 3-4 bullets for the facilitator. Each one a separate idea: a setup line, a frame, a connection to another tip, a caveat to mention.
5. **Self-check** (before showing the user):
   - Slide-density (body content fits a slide, ~50 words)?
   - Problem-first (does the title or setup name a moment, not a feature)?
   - Voice passes `/writing-guide.md` (peer not consultant, no em dashes or double hyphens, AI not the hero)?
   - Sample prompt grounded in audience scenario?
   - Speaker notes give the facilitator three different things to say?

**Output:** Markdown source per tip following the structure used in `course-material/{{client}}/ai-advisory/2026-05-ai-tip-of-the-week/2026-05-tips-batch-1.md`. Numbered headings for sections (Setup, Tactic, Sample prompt, Talking points for [name]).

**Iteration:** When the user gives feedback on a tip, the most common moves are:
- Tighten the title (cut from 12 words to 6-8)
- Replace a generic prompt with one in the audience's actual context
- Pull in evidence from research (sycophancy paper for feedback tips)
- Shift a "feature" tip to a "tactic" tip (don't lead with the tool)
- Connect to an existing course or workshop (Maintaining Trust connects to validation tips)
- Add an action cue when a physical step is involved

### Mode 3: Output to PPTX

**When:** Markdown source is finalized; ready to ship to slides.

**Two paths:**

**3a. New deck (most common):**
1. Use the appropriate brand skill: `/{{client}}-presentation` for {{client}}, future client-specific skills for others.
2. Build script structure:
   - Cover slide (eyebrow, title, batch label, line about how to use it)
   - For each tip: title slide + content slide (with speaker notes)
3. Save next to the markdown source: e.g. `AI-Tip-of-the-Week-Batch-N.pptx`

**3b. Extend an existing deck:**
1. Open the existing `.pptx` with python-pptx: `Presentation(str(EXISTING_PPTX))`.
2. Append the new tips' title + content slides using the brand skill's helpers (`build_title_slide`, `build_content_slide`).
3. Save back to the same path (not a new file). Confirm with user before overwriting.
4. Update the markdown source to include the new tips appended at the end (don't replace the existing log).

**Code pattern (extending an existing {{client}} deck):**

```python
from pathlib import Path
from pptx import Presentation
# Import slide builders from /{{client}}-presentation skill
# (or paste them inline if running standalone)

DECK = Path("{{repo}}/course-material/{{client}}/ai-advisory/2026-05-ai-tip-of-the-week/2026-05-AI-Tip-of-the-Week-Batch-1.pptx")
prs = Presentation(str(DECK))

# Add new tips at the end
for tip in NEW_TIPS:
    build_title_slide(prs, eyebrow="AI TIP OF THE WEEK",
                      label=f"Tip #{tip['n']}", title=tip['title'])
    build_content_slide(prs, label=f"Tip #{tip['n']}",
                        title=tip['title'], setup=tip['setup'],
                        tactic=tip['tactic'], prompt=tip['prompt'],
                        speaker_notes=tip['notes'])

prs.save(str(DECK))  # overwrite
```

## Cross-client Adaptation

When a tip applies to multiple clients but with different examples:

- **Tool naming.** Some clients use Copilot only ({{client}}). Others have custom assistants ({{past client}}'s "{{custom assistant}}"). Same tip, different tool reference. Don't write "Copilot/{{custom assistant}}": pick the right one for the client.
- **Audience scenarios.** Banking/regulatory for {{client}}. Housing/resident-services for {{past client}}. Tech-stack-specific for {{client 2}}. Sample prompts must use the client's actual context.
- **Brand application.** {{client}} uses `/{{client}}-presentation`. {{past client}} uses a Word doc running log (no slides yet). When a new client joins, decide whether to mirror {{past client}}'s running-doc model or {{client}}'s slide-deck model based on their distribution channel.
- **Course connections.** {{client}} can reference Foundations courses (Maintaining Trust for validation tips, Ethics for judgment tips). {{past client}} references their own resource hub. Don't drag in another client's curriculum.

When adapting:
1. Pull the markdown source for the original tip.
2. Keep the structure (setup, tactic, prompt, notes).
3. Swap the tool name, scenarios, and any course/resource references.
4. Re-check speaker notes for facilitator-specific framing ({{client lead}} vs. someone else).

## Quality Checks (per batch)

- [ ] Lineup hits at least 4 of the 6 problem categories
- [ ] No two adjacent tips are in the same category
- [ ] Every tip has setup + tactic + prompt + notes
- [ ] Sample prompts use the client's actual scenarios, not generic placeholders
- [ ] Tips that draw on research cite the source in the markdown header or per-tip
- [ ] Passes `/writing-guide.md` checks: peer voice, AI is not the hero, no em dashes or double hyphens
- [ ] Slide-density preserved (body fits on one slide, ~50 words)
- [ ] Speaker notes give the facilitator three distinct things to say (setup line, frame, connection or caveat)
- [ ] Internal references between tips ("see Tip #2") are valid

## Pairs With

- **`/{{client}}-presentation`**: produces the branded {{client}} .pptx artifact (Mode 3 output for {{client}} tips). The writing skill defines the content; the presentation skill renders it.
- **`/marketing-writer`**: voice rules overlap (problem-first framing, no AI cliches). Invoke for tips that need a sharper hook or more punchy phrasing.
- **`/write-learning`**: useful when a tip's body content needs the discipline of learning-resource writing (clear progression, no escape hatches). Especially relevant for tips connected to course material.

## Files & Conventions

- **Markdown source path:** `<client-folder>/ai-tip-of-the-week/tips-batch-N.md`
- **PPTX output path:** same folder, `AI-Tip-of-the-Week-Batch-N.pptx`
- **Notion task:** create under the relevant client advisory project; use Mode 1 lineup as the task description
- **Frontmatter conventions** in markdown source:
  - Notion Task ID
  - Project ID
  - Audience
  - Distribution
  - Source notes (for evidence-backed tips)
  - Suggested schedule (if dates are tracking-only and not shown on slides)
