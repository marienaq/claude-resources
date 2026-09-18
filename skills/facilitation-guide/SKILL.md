---
name: facilitation-guide
description: Writes facilitation guides for hands-on AI workshops, the facilitator's complete reference for running each section with talking points, timings, contingencies, and prep checklists. Use when building a new guide from activity research and a workshop schedule, aligning an existing guide after slides or QRG changes, or tightening talking points after a rehearsal. Triggers on "build a facilitation guide", "update the fac guide to match the slides", "tighten talking points", "review this guide for timing and coverage".
---

# Facilitation Guide Writer

Write facilitation guides matching Mellonhead's established workshop patterns. This skill defines the document structure, section formats, talking point conventions, activity arc usage, and appendix sections derived from the gold standards (see bottom).

A facilitation guide is the facilitator's complete reference for running a workshop: timings, talking points, contingencies, and prep checklists. It serves three functions:

1. **Live reference**: the facilitator can glance at it during the session for exact phrasing, timing, and contingency plans
2. **Rehearsal document**: the facilitator uses it to prepare, internalize the rhythm, and anticipate trouble spots
3. **Alignment artifact**: stakeholders (managers, AI Champions, L&D) can review it to confirm the workshop matches their expectations

Facilitation guides are **not** scripts. Talking points are intent to hit, not lines to read. The facilitator brings their own delivery; the guide provides the structure, phrasing anchors, and safety nets.

---

## Build Modes

### Mode 1: New Facilitation Guide

Building from scratch, from activity research documents, a workshop schedule, and audience context.

1. **Confirm inputs:**
   - Activity research documents (one per activity)
   - Workshop schedule (timings for each section)
   - Audience context (team, manager, AI Champion, concerns)
   - Workshop format (virtual/in-person, platform, group size)

2. **Choose the opening pattern:**
   - Standard (declarative) for receptive audiences
   - Demo-led (experiential) for nervous or skeptical audiences
   - Confirm with user if unclear. Full patterns: `references/opening-closing-patterns.md`

3. **Choose activity formats:**
   - For each activity: single-attempt or two-attempt? Decision criteria, timings, and arc definitions: `methodology/activity-arcs.md` (project root, canonical)
   - Two-attempt when iteration is the learning (prompting, prompt refinement)
   - Single-attempt when learning is in a single pass or time is tight

4. **Build the Workshop Details header** (spec: `references/section-templates.md`)

5. **Build each section sequentially:**
   - Opening (using chosen pattern)
   - Activities (using chosen formats, in schedule order; segment-by-segment facilitation detail: `references/activity-segment-details.md`)
   - Q&A windows (if requested)
   - Break + Transition (if workshop runs over 90 min)
   - Closing

6. **Build appendix sections** (specs: `references/appendix-specs.md`):
   - Outcomes & Evidence (from activity research + stakeholder input)
   - Design Rules (from evidence analysis)
   - Facilitation Notes (from manager input)

7. **Build pre-workshop logistics** (To Do, Prep Email) last. These depend on knowing what materials are needed.

8. **Second pass: add card numbers.** First pass leaves cards as `## Card: Title` (no number). Once slides have been generated, return to the facilitation guide and fill in card numbers so they match slide numbering (`## Card 7: Title`). Also update the master timeline table in the Session Arc section to match, and write the cross-card threading ("sets up Card 14," "pays off Card 3"). This step happens after slides because card numbers in the facilitation guide are meant to align with the slide deck, and the slide deck's ordering is the source of truth.

**Cross-reference:** Check that activity names, approach steps, and key framing match the slides and QRG if those exist.

### Mode 2: Update from Slides/QRG Alignment

The facilitation guide exists but slides or QRG have been finalized since it was written.

1. Read the facilitation guide, final slides, and QRG (if applicable)
2. Compare section by section:
   - Activity names (must match across all deliverables)
   - Approach step names and order
   - Problem framing language
   - Pattern throughline language
   - Key one-liners
3. Present discrepancies as a gap report
4. Make edits after user review

### Mode 3: Refine After Rehearsal

The facilitator has done a dry run and has feedback on pacing, phrasing, or flow.

1. Capture feedback (what felt too long, what didn't land, what needs sharper phrasing)
2. Adjust timings if segments ran long or short
3. Tighten talk track lines that felt wordy in delivery
4. Add contingencies for situations that came up in rehearsal
5. Flag any timing changes that affect the schedule markdown

---

## Activity Formats

Every activity follows one of two arcs: **single-attempt (15-20 min)** or **two-attempt (20-30 min)**. The canonical arc definitions, timing tables, decision criteria, and rationale live in `methodology/activity-arcs.md` (project root). The facilitation-specific rendering (what the facilitator says and does per segment) lives in `references/activity-segment-details.md`.

Quick rule: two-attempt when iteration is the learning and 20-30 min are available; single-attempt when introducing a new tool or technique, or when time is tight. Single-attempt ends on reflection; two-attempt ends on doing.

---

## Document Structure

Every facilitation guide follows this architecture:

| # | Section | Required | Purpose |
|---|---------|----------|---------|
| 1 | Workshop Details | Yes | Header with logistics and audience context |
| 2 | Session Arc (forest view) | Yes | Master timeline + narrative overview of activities + cross-cutting notes + contingencies. A returning or new facilitator sees the whole arc at a glance. |
| 3 | To Do | Optional | Pre-workshop prep checklist for the facilitator |
| 4 | Prep Email | Optional | Full email text to send to participants before the workshop |
| 5 | Workshop Structure | Yes | Main body, card-by-card with talking points |
| 6 | Outcomes & Evidence of Success | Only if no session brief exists | Attitudinal + skill-based outcomes with observable evidence. When a session brief holds them, point to it; do not restate |
| 7 | Design Rules | Only if no session brief exists | Principles that drove design decisions. Same rule: the brief is the home |
| 8 | Facilitation Notes | Say / never-say list only | Language guidelines the facilitator needs in the room. Fold into F3; stakeholder input and safety notes live in the brief and `context.md` |

**Word budget (ruled by MQ 2026-09-16 after a 16,100-word September draft).** A 90-minute session's guide runs 7,000 to 8,000 words. The talk track is about 3,500 of that; the rest is timings, slide needs, contingencies, the rehearsal checklist and one short note per card. August 2026 (7,500 words) is the length reference. If the first pass lands over 9,000, cut before surfacing; do not surface and ask.

**Front matter and numbered cards.** The guide has two zones. First, five unnumbered front-matter reference cards: F1 Cover + Overview, F2 Session Arc, F3 Facilitator Notes (global), F4 To Do, F5 Prep Email. Then the numbered move-cards, one per timeline row, running continuously. There are no separate section-divider cards; the arc's segments live only in the F2 Session Arc diagram.

**Rendering target:** Facilitation guides are authored in markdown and rendered in **Gamma** as a *document* (fluid cards), not a deck. The format maps onto Gamma-native primitives: `<label>` pills for the card header, `<blockquote>` for talk tracks (blue = say it, grey bracket = improvise), bold plain text for directions, `<aside>` grey callouts for facilitator notes, smart-layout boxes for parallel content, and a `<diagram>` for the Session Arc. Treat the Gamma document as the deliverable; markdown is the source. Content locks in this markdown first so Gamma is a one-way, late render.

---

## Reference Files

Load these when working on the relevant part of the guide:

- `references/section-templates.md`: full specs for every section (Workshop Details, Session Arc, To Do, Prep Email, Workshop Structure), the card system (four-pill header, mode pills, talk track marking, facilitator notes), card sub-types, and cross-card threading. Load before writing any card.
- `references/activity-segment-details.md`: segment-by-segment facilitation detail for the two activity arcs. Load when writing activity cards.
- `references/opening-closing-patterns.md`: opening patterns (standard and demo-led), Q&A windows, break/transition, and the closing pattern (recap, micro-commitment, what's next). Load when writing those sections.
- `references/appendix-specs.md`: Outcomes & Evidence, Design Rules, and Facilitation Notes specs. Load when building the appendix.
- `methodology/activity-arcs.md` (project root): canonical activity arc definitions and the single-vs-two-attempt decision.

---

## Voice and Tone

All voice and style rules: `/writing-guide.md` (canonical). Talking point voice specifically: `/writing-guide.md` §12 ("Facilitator Talking Point Voice"), which covers WIIFM-before-mechanics, friction acknowledgment, pacing markers, concreteness rule-of-three, default-plus-variance choice architecture, bridges and transitions, and rejection of templated rhetorical constructions. Read §12 before writing talking points. Dash rules: `/writing-guide.md` §3.1.

This skill adds only:

- **Written as speech, not prose.** Talk track lines should sound natural when read aloud. Use contractions, direct address, conversational rhythm.
- **Bold instruction labels are for the facilitator.** They describe what to do, not what to say. "Name the pain." "Frame what AI does here." "Land it."
- **Quoted lines are suggested phrasing.** The facilitator hits the intent, not the exact words. But certain lines are worth memorizing: one-liners that anchor the session ("Scope is the prompt before the prompt").
- **Contingencies are practical, not anxious.** "If the room is quiet, don't panic" is the tone. Name the situation, name the response, move on.
- **Structural text:** Purpose statements are concise and outcome-focused. Segment descriptions use imperative fragments ("Name the pain. Make it visceral."). Prep checklists are specific and actionable ("Sanitized real email thread from ABA for participants to use," not "Prepare sample materials").
- **The one dash exception:** quoted facilitator talk tracks may use em dashes because they cue a spoken pause. All prose around the talk track (framing, directions, contingencies) uses zero em dashes and zero double hyphens, per §3.1.

### Participant-facing copy routes to `/write-learning`

The guide contains text participants read, not just text the facilitator reads: the **Prep Email**, and any wording the facilitator is told to paste into chat, an invite, or a follow-up. Draft and review that copy with `/write-learning` (Mode 6, §7), which carries the announcement-copy patterns and the naming rule.

**The naming rule applies to every word a participant sees**, including talk track lines spoken aloud in the room. Never name the authoring tool (Rise, Articulate, Gamma, SCORM) and never use production acronyms (VILT, QRG, ILT, KC, SME). Say "the online course," "the virtual workshop," "the reference guide," "the knowledge check." Canonical: `/write-learning` §0, summarized in `/writing-guide.md` §9.2.

Backstage prose inside the guide is exempt where the format is the actual subject: production notes, build instructions, and the mode-pill table. Naming Gamma in a rendering note is precise. Naming it in a talk track is jargon.

---

## Customization Points

Every team is different. The framework is consistent, but these vary per workshop:

- **Opening pattern:** Standard vs. demo-led, based on audience buy-in
- **Demo inclusion:** Not every workshop needs a demo. Skip when the audience is already receptive.
- **Leadership intro:** Include when leadership wants to signal investment. Skip when it would feel forced.
- **Activity count:** Typically 2-4 activities per workshop
- **Activity format:** Each activity independently chooses single or two-attempt
- **Q&A windows:** Optional. Include when the manager requests them or the audience needs processing time.
- **Break timing:** Based on workshop length and activity placement
- **Pattern throughline language:** Team-specific. "You bring orientation, you name the task, you review the output" is one version; other teams may use different anchoring language.
- **Prep email content:** Varies by tools (Copilot, ChatGPT), materials (transcripts, briefs, email threads), and access requirements
- **Micro-commitment deadline:** "Before Friday" vs. "before next week" vs. "before your next meeting," based on team rhythm

---

## Anti-Patterns (What NOT to Do)

- **Scripting talk track lines.** These are intent, not scripts. If the talking points read like a teleprompter, they're too rigid.
- **Missing contingencies.** Every Try segment needs at least one "if stuck" fallback. Every Q&A needs "if the room is quiet" prompts. Facilitators get anxious without safety nets.
- **Vague prep checklists.** "Prepare materials" is not actionable. "Sanitized real email thread from ABA for participants to use" is.
- **Skipping the problem framing.** Jumping straight to the approach without naming the pain. The problem framing is what earns attention for the technique.
- **Over-timing.** Don't time every sentence. Time segments (~2 min, ~4 min), not individual talking points. The facilitator needs flexibility within segments.
- **Hand-writing the prep email.** It is participant-facing copy. Route it through `/write-learning`, and never let "Rise," "VILT," or "QRG" reach a participant's inbox.
- **Facilitation notes as afterthought.** Team concerns, language guidelines, and framing approach should inform the talking points, not sit in an appendix nobody reads. Write the talking points first, then extract the principles into the appendix.
- **Generic talk track lines.** "AI can help you with this task" tells the facilitator nothing. "AI is good at pulling specific facts out of large amounts of text: dates, names, exact quotes" gives them something to say.
- **Forgetting the pattern throughline.** The pattern line should surface in the opening, get reinforced in every activity's approach segment, and return in the closing recap. If it only appears once, it's not a throughline.
- **Writing the design trail into the guide.** The guide is what the facilitator runs from; it is not the record of how it was designed. Leave out: "pays off" or "sets up" rationale paragraphs (the session brief holds the arc); provenance and citation trails in facilitator notes ("checked against X as quoted in Y"), which belong in the review file; a "decided, with sources" list (task notes hold decisions); a narrative-arc prose paragraph that restates the master timeline; and appendix sections that restate the session brief. One short source pointer per card is the ceiling.
- **Bridges that carry commentary.** A bridge is one spoken line plus at most one sentence of note. A 15-second beat with 300 words under it is a rationale paragraph in disguise.
- **Stating what a policy says from a brief that quotes it.** If a card states what a policy or ruling says, open the policy (or the reviewed checklist that quotes it verbatim), not the session brief. The September 2026 registration line reached two deliverables by copy from a copy before a reviewer caught it.

---

## Gold Standard References

**AI Champions Facilitation Guide (new Gamma format)** is the current gold standard for structure and rendering: the two-zone layout (front-matter reference cards F1 to F5 plus continuously numbered move-cards), the four-pill card header, the mode color/icon system, the three-way color-coded talk track, and constant cross-card threading. Built as a Gamma document (not a deck), one card per timeline row.

**Member Comms W1 "AI for Overhead"** remains the reference for pedagogy and voice: demo-led opening, two-attempt activities, structured reflection, micro-commitment closing, and the full appendix (Outcomes, Design Rules, Facilitation Notes). Location: `course-material/ABA/ABA_Programs/Role_Based_Workshops/Member_Comms/Deliverables/Workshop-1_AI-for-Overhead/workshop-structure.md.txt`
