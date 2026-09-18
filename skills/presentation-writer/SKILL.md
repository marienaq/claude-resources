---
name: presentation-writer
description: Writes workshop slide content matching Mellonhead's presentation DNA, covering slide taxonomy, activity arc sequences, density rules, voice, and Gamma generation parameters. Use when building a slide deck from a facilitation guide or activity research, converting talking points into slide-ready text, reviewing a draft deck for tone, density, or structure, or generating the deck in Gamma. Triggers on "build slides for this workshop", "convert this facilitation guide into slide content", "review this slide draft for density", "map this guide to the slide taxonomy".
---

# Presentation Writer

Write workshop slide content matching Mellonhead's presentation DNA. This skill defines the density rules, voice, structural patterns, slide taxonomy, and Gamma generation recipe derived from the gold standards (see bottom).

Slides are one of three aligned workshop deliverables (facilitation guide, slides, QRG). Slides come from the facilitation guide, not directly from the brief. The facilitation guide carries the depth; the slides carry the structure.

## When to Use

- Building a new workshop slide deck from a facilitation guide
- Reviewing slide content for tone, density, or structure issues
- Converting talking points into slide-ready text
- Checking whether a draft deck follows Mellonhead patterns
- Generating the finished deck in Gamma

---

## Before You Start: Choose the Arc

Every activity follows one of two arcs. The canonical arc definitions, timing tables, decision criteria, and rationale live in `methodology/activity-arcs.md` (project root). Read it before sequencing any activity's slides.

Quick rule: **two-attempt (20-30 min)** when iteration is the learning (prompting, prompt refinement) and a sample output between attempts adds value. **Single-attempt (15-20 min)** when introducing a new tool surface or mechanic, when time is tight, or when the learning is in the output, not in refining the input. Each activity chooses independently; a workshop can mix formats.

The slide-specific rendering of each arc (which slide types, in what order, including the opening and closing arcs) lives in `references/slide-taxonomy.md` (Arc Slide Sequences section).

---

## Word Count / Density

| Slide type | Target word count | Notes |
|------------|------------------|-------|
| Section divider | 10-15 words | Label + title + tagline only |
| Concept / framework | 15-30 words | Icon + label + one-line description per column |
| Problem | 10-20 words | Title + two contrast labels |
| Process / approach | 30-50 words | Step names bold, descriptions 5-8 words each |
| Your Turn (instructions) | 40-70 words | Most text-dense instructional slide. Numbered steps + timer. |
| Sample Prompt | Varies | Prompt text in gray box. Can be longer. Presented as a distinct artifact, not body text. |
| Reflect | 25-40 words | Three questions in cards |
| Best Practices | 50-80 words | Split into two scannable columns. Heaviest regular slide type. |
| Tool orientation | 60-90 words | Screenshots carry visual weight; text supports. |
| Quote / research | 40-80 words | In quote blocks. Citation at bottom. |

**The rule:** Most slides have fewer than 50 words of body text. When text is heavier (Best Practices, Tool Orientation), it must be structured into scannable columns or labeled sections. If you're writing a slide and it's over 80 words, split it.

---

## Voice and Tone

All voice and style rules: `/writing-guide.md` (canonical). That covers dash rules (§3.1), plain language over fun terms (§3.2), no sweeping generalizations (§3.3), word swaps, and the problem-first "AI is not the hero" structure (§3.7). This skill adds only the slide-specific rules:

### Headlines

- **Short, declarative, 2-5 words.** No full sentences in titles.
- Problem slides: **"The problem: [Noun]"** ("The problem: Fragmentation", "The problem: Walls of text")
- Approach slides: **"How to [verb] [object]"** ("How to synthesize emails", "How to rewrite for cohesion")
- Activity slides: **"Your turn"** (always the same)
- Reflection slides: **"Let's reflect"** (always the same)
- Closing slides: **"Best practices"** (always the same)

### Body Text

- **Extremely concise.** Most bullets are 5-10 words.
- **Fragments over full sentences.** "Clear scope + clear goal." "Refine. Adjust." "Tone can be misread."
- **Contrast pairs.** Pain state vs. AI-assisted state, side by side, icons + labels. No paragraphs explaining the difference.
- **Questions as engagement hooks** on "Your turn" slides: "Which emails do you need?" "Why do you need the information?"
- **Direct second person:** "you", "your". Never "one should" or "participants will".
- **Occasional personality.** "If we have time. We probably won't." / "Stop searching, start asking". Sparingly, not on every slide.

### Casing and Punctuation

- **Sentence case for all slide titles, labels, and body text.** Capitalize the first word and proper nouns only. "How to synthesize emails" not "How To Synthesize Emails."
- **After a colon, capitalize the first word.** "The problem: Fragmentation", "Step 1: Define scope"
- **Named frameworks, tools, and formal titles retain Title Case.** "The AI Output Validation Checklist", "Microsoft Copilot"
- **No periods at the end of bullets** unless they're full sentences.

---

## Framing Principles

These are the content rules that make Mellonhead presentations land:

1. **Problem-first.** Every activity opens by naming the operational pain, not the AI capability. The audience should nod before you mention AI.

2. **Contrast pairs.** Show the pain state vs. the AI-assisted state visually. Icons + labels side by side.

3. **AI is the tool, not the point.** Slide text should center the user's outcome. "Quickly pull together information based on context" not "AI can synthesize emails."

4. **Specificity over generality.** Sample prompts are grounded in real, role-specific scenarios. "Summarize the various scams that have been emailed to me in 2025" not "Summarize my emails."

5. **Honest limitations, every time.** Every Best Practices slide includes specific, named limitations. "Can miss nuance." "Tone can be misread." "Won't read attachments or links." This builds trust.

6. **Progressive complexity.** Activities scaffold: template prompt (guided), then customized prompt (semi-guided), then original prompt (independent), then multi-step analysis (advanced).

7. **Consistent reflection structure.** Two patterns: "Let's share" (What? / So what? / Now what?) for debriefs, and "Let's reflect" (Keep / Change / Add) for pre-retry processing. Each pattern repeats identically across activities. Participants learn the rhythm.

8. **Taglines do work.** Every section divider tagline reframes the activity in the participant's terms. "Stop searching, start asking." These aren't decorative.

9. **Iteration over perfection.** In two-attempt activities, the first attempt is designed to be imperfect. The compare, show, and second attempt exist to make the second try meaningfully different.

---

## Writing Slides from a Facilitation Guide

1. **Map the facilitation guide sections to the slide taxonomy.** Each segment in the guide maps to 1-3 slides. The guide's "Problem framing" becomes a Problem slide. "Approach" becomes an Approach/Process slide. "Try 1" becomes a "Your turn" slide. "Compare and discuss" becomes a "Let's share" slide. "Show" becomes "Best practices" + "Sample prompt" slides. "Try 2" maps to "Let's reflect" + "Now try again" slides. (The full arc-step-to-deliverable mapping table is in `methodology/activity-arcs.md`.)

2. **Extract, don't paste.** Talking points in the facilitation guide are written for the facilitator's ear. Slide text is what the audience sees. Collapse 3-4 talking point sentences into a 5-8 word fragment or label.

3. **Follow the density rules.** If your slide draft exceeds the word count targets, split or cut.

4. **Use the taxonomy names when drafting.** Label each slide with its type ("Problem slide", "Your turn", "Best practices") so the structure is explicit before visual design.

5. **Check the arc.** Every activity should follow its arc slide sequence. If you're missing a Problem slide or a Best Practices slide, add it.

**Conversion example:**

Facilitation guide talking point:
> "AI is good at pulling specific facts out of large amounts of text: dates, names, exact quotes. It can do in 15 seconds what takes you half an hour of scrolling."

Slide text (Problem slide):
> **Tedious work reconstructing timelines from scattered emails** (left, with icon)
> **Extract facts, dates, and quotes in seconds** (right, with icon)

The full talking point stays in the facilitation guide. The slide shows the contrast.

---

## Anti-Patterns (What NOT to Do)

- **Wall of text slides.** If you need a paragraph, you need two slides.
- **Vague titles.** "AI Overview" tells the audience nothing. "The Problem: Fragmentation" tells them everything.
- **Passive voice on slides.** "Emails can be synthesized" vs. "Stop searching, start asking."
- **Hiding limitations.** Skipping the Limitations column on Best practices slides erodes trust.
- **Generic prompts.** "Summarize this document" as a sample prompt. Every prompt should be role-grounded and scenario-specific.
- **Inconsistent "Your turn" slides.** Changing the layout, dropping the timer, removing the stock photo. These are recognition anchors.
- **Skipping the problem slide.** Jumping straight to "How to" without naming why. The problem slide is what earns attention for the approach.
- **Decorative imagery.** Every hero image should metaphorically connect to the activity concept. If you can't explain the connection, pick a different image.
- **Pre-revealing artifacts the facilitator will build live.** If the facilitator is going to paste instructions, drop files, or run a prompt on screen, don't put the result on a static slide. Design slides that support the live work (the prompt to type, the file names to drop), not slides that spoil it.

---

## Reference Files

Load these when working on the relevant part of the deck:

- `references/slide-taxonomy.md`: the full catalog of 23 slide types, the arc slide sequences (activity single/two-attempt, opening standard/demo-led, closing), and in-person adaptations. Load before drafting or sequencing any slides.
- `references/visual-language.md`: layout principles, color system, typography, imagery strategy, and icons. Load when specifying visual treatment or reviewing a deck's look.
- `references/gamma-generation.md`: the Gamma MCP parameter recipe, `additionalInstructions` string, image strategy, and generation pitfalls. Load when the markdown is ready to render.
- `methodology/activity-arcs.md` (project root): canonical activity arc definitions and the single-vs-two-attempt decision.

---

## Gold Standard References

- **Chiefs W1 AI Foundations Workshop** (44 slides): standard opening arc, mix of single and two-attempt activities, in-person
- **Member Comms W1 AI for Overhead** (47 slides): demo-led opening arc, all two-attempt activities, virtual, nervous/skeptical audience
