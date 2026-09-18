---
name: proposal
description: Analyzes client needs, qualifies deals, designs packages, and builds AI education proposals for Mellonhead prospects, grounded in Ken Yarmosh's frameworks. Runs seven sequential modes with checkpoints: debrief and qualification into a proposal brief, stakeholder validation coaching, package design (Phase 1 Foundation with a 3-month value-proof point, Phase 2 Strategic, optional Phase 3), pitch design on the 6-element framework, proposal drafting, Gamma generation, and iterative refinement with cascading consistency. Applies the 6-element framework as the backbone for competitive written proposals (not only the pitch deck), and builds every section gather-first, ask-gaps-next, draft-last. Use when a prospect brief, RFP, or discovery transcript needs to become a deal, or when revising an existing pitch or proposal. Triggers: "analyze this client brief", "build packages for this prospect", "draft a full proposal for", "review this proposal draft".
---

# Proposal Development

Analyze client needs, qualify the deal, design a pitch and proposal grounded in Ken Yarmosh's frameworks, and ship Gamma-ready artifacts. The skill produces a **pitch deck** for a live walkthrough and a **proposal document** for the leave-behind. On a competitive written bid where there is no separate live pitch, the proposal document itself is structured on the 6-element PTW arc and carries the pitch (see the two engagement paths below).

## Constants and Reference Files

- **Gamma theme:** Mellonhead v3, themeId `15j581zqo2c197n`. All Gamma generations in this skill use it.
- **Voice and style:** `/writing-guide.md` at the repo root is canonical for all prose rules, including the dash rules. Apply it to every artifact.
- **Service catalog with directional pricing:** `references/service-catalog.md`
- **KY frameworks (6-element pitch, Closing System, key principles, validated patterns):** `references/ky-frameworks.md`
- **Per-mode quality checklist:** `references/quality-checklist.md`

## Core Principles

This skill is opinionated. These principles are non-negotiable.

1. **KY's frameworks drive structure.** The pitch uses Ken Yarmosh's 6-element framework (Narrative → Alignment → Proof → Process → Offer → Timing). The workflow follows KY's Closing System (Initial Contact → Discovery → Pitch → Closing). See `references/ky-frameworks.md`.
2. **Active interview at the start of each mode.** The skill asks the user for required inputs before doing the work, rather than assuming. If a piece of information is missing, the skill stops and asks.
3. **Explicit checkpoints between modes.** The skill does not move from one mode to the next without user confirmation. Always end a mode by asking "Ready to move to Mode N+1?" and waiting.
4. **Cascading consistency.** When content changes in any artifact (brief, pitch, proposal), the skill propagates the change to the others to keep them aligned.
5. **Pitch first, proposal after, unless the bid is written.** Per KY, in a relationship sale do not deliver the proposal before the pitch meeting. Exception: competitive written bids and RFP responses, where the client asks for a written proposal up front and is comparing vendors. There the proposal carries the pitch (PTW-structured; see the written-bid path in Mode 5), and a live walkthrough follows only if one can be scheduled. Choose the path at Mode 1 and tell the user which is running.
6. **Phase 1 must prove value in 3 months.** Whether the engagement runs 3 or 6 months total, the 3-month value-proof point is non-negotiable. Composition is derived from the brief, not defaulted to a template.
7. **PTW is the backbone of the proposal, not only the pitch deck.** The 6-element arc (Narrative → Alignment → Proof → Process → Offer → Timing) always structures the pitch deck, and it also structures the written proposal whenever the proposal must carry the pitch (the competitive-written-bid path). Do not fall back to a generic proposal structure on a competitive written bid.
8. **Gather → ask → draft, section by section.** For every section, work in this order: (a) **gather**: pre-fill everything the brief and other context already answer; (b) **ask**: surface the remaining gaps as specific questions and get them answered; (c) **draft**: write the copy only once inputs are confirmed. Never write prose on unconfirmed inputs. Inline "TO CONFIRM" placeholders are a fallback for genuinely blocked items, not a substitute for asking first. This applies most in the drafting modes (4 and 5).

## When to Use

- A new prospect brief, RFP, or discovery transcript needs to be turned into a deal
- An existing pitch or proposal draft needs revision
- The user wants to qualify a prospect and recommend an offering shape
- The user wants to build a Gamma-ready pitch deck or proposal document
- The user wants to refine subtitles, slide order, or specific content with consistent updates across files

## Workflow Overview

The skill operates in 7 modes that flow sequentially. Each mode produces an artifact or update that feeds the next. A mode does not begin until the user confirms readiness.

| Mode | Purpose | Output |
|---|---|---|
| 1 | Debrief & Qualification | `prospects/<client>/proposal-brief.md` |
| 2 | Stakeholder Validation Coaching | Updated brief + validation log |
| 3 | Package Design | Recommended packages composed from the brief |
| 4 | Pitch Design | `prospects/<client>/pitch.md` |
| 5 | Proposal Drafting | `prospects/<client>/proposal.md` |
| 6 | Gamma Generation | Pitch deck (presentation) + proposal document |
| 7 | Iterative Refinement | Cascading edits + Gamma editor prompts |

### Two engagement paths

The modes support two paths. Confirm which at Mode 1, and tell the user which is running:

- **Relationship sale (default):** discovery → validate → packages → **live pitch deck (Mode 4)** → **proposal leave-behind after the pitch (Mode 5)**. The pitch precedes the proposal.
- **Competitive written bid / RFP:** the client asks for a written proposal up front and is comparing vendors. Modes 4 and 5 collapse into a **single PTW-structured proposal document** (Mode 5, written-bid path) that carries the pitch. Offer a live walkthrough if it can be scheduled, but the written proposal is the primary deliverable.

Everything before Mode 4 (brief, validation, packages) is identical on both paths.

---

## Mode 1: Debrief & Qualification

**Goal:** Synthesize discovery into a proposal brief that captures evidence, surfaces what landed, qualifies the deal, and proposes a candidate offering shape. The brief is the source of truth that drives all downstream modes.

### Active interview at the start

Before doing any work, ask the user:

1. Where are the discovery transcripts and prior-conversation notes? (Provide file paths.)
2. What's the prospect's name, primary contact, and role?
3. Who is the warm-path advocate, if any?
4. What constraints have been signaled so far (budget, timeline, org size, tools)?
5. **Lighthouse Client check:** Does this prospect match your ICP / Lighthouse profile? If yes, why. If no, why is it worth pursuing anyway?
6. Has stakeholder validation happened yet? If yes, what did the stakeholder confirm or change?

If any of these are missing, stop and ask before proceeding.

### Output: `prospects/<client>/proposal-brief.md`

Sections:

1. **Header / meta** - status, last updated, prospect, primary contact, advocate, key dates, transcript references
2. **Client context** - who they are, what's happening, what's driving urgency
3. **The opportunity** - working scope (audience, format, cadence)
4. **Service-tier reactions** - for each Mellonhead service surfaced in discovery, how it landed with direct quotes (Pro / Caution / Read)
5. **Lighthouse Client check** - against the user's defined Lighthouse profile, with evidence
6. **Cross-prospect signals** - patterns this prospect shares with others; productization opportunities
7. **Discovery themes (with evidence)** - 5-8 themes, each with direct quotes and an "implication for the offering" line
8. **Synthesized overarching goal** - 3-6 outcome statements in the client's language
9. **Candidate offering shape** - working session arc, module map, cadence; flagged as draft
10. **Pricing anchors** - historical anchors, Mellonhead's standard ranges, how this engagement compares
11. **Deal qualification (MEDDPICC + AI-education)** - table with status (STRONG / PARTIAL / GAP)
12. **Open questions and decisions** - what to resolve before drafting
13. **Stakeholder validation agenda** - the subset of open questions that require stakeholder input *before* drafting
14. **Next steps** - concrete actions and owners

### Evidence-sourcing rules
- Every theme must include at least one direct quote with attribution
- Every service-tier reaction must reference what was actually said in the call
- Every claim about budget, authority, or timeline must point to a specific signal
- Use the client's language in the synthesized goal, not consultant shorthand

### Checkpoint (REQUIRED)

Present the draft brief. Ask:
- Do the themes match what you heard in the room?
- Are there service-tier reactions I'm misreading?
- Is the candidate offering shape directionally right?
- Any qualification signals to update?
- Lighthouse Client check feels accurate?
- **Ready to move to Mode 2 (Stakeholder Validation Coaching)?**

Do not proceed without explicit user confirmation.

---

## Mode 2: Stakeholder Validation Coaching

**Goal:** Validate the brief's critical assumptions with the primary stakeholder before any drafting begins. Per KY's principle: never lob proposals (or pitches) over the fence.

### Active interview at the start

1. Has stakeholder validation already happened? (If yes, summarize what was confirmed/changed and skip to checkpoint.)
2. Who is the primary stakeholder for this validation?
3. Is there a back-channel advocate who can do a gut-check on outcomes and budget before the formal stakeholder conversation?
4. What's the format for validation: 15-30 min call, async exchange, or via the advocate?

### What this mode does

1. Drafts the **Stakeholder Validation Agenda** (item 13 of the brief):
   - **Budget range confirmation** - propose a range, ask for directional reaction
   - **Goal / learning-objective validation** - share the synthesized goal, ask for reaction
   - **Critical scope assumptions** - cohort size, format, timing, sustainment
   - **Decision process** - who else weighs in
   - Plus any other GAP signals from qualification

2. If a back-channel exists, drafts an email/message to the advocate first (lower-stakes gut-check).

3. After validation happens, helps the user log the responses and update the brief.

### Checkpoint (REQUIRED)

After validation has happened (or has been explicitly skipped at user's risk):
- What did the stakeholder confirm?
- What changed?
- Has the brief been updated?
- **Ready to move to Mode 3 (Package Design)?**

Do not proceed without explicit user confirmation.

---

## Mode 3: Package Design

**Goal:** Recommend Phase 1, Phase 2, and (optionally) Phase 3 packages, derived from the brief. Map needs to services using `references/service-catalog.md`.

### Active interview at the start

1. Has the brief been validated with the stakeholder? (If no, return to Mode 2.)
2. What's the budget range confirmed in validation?
3. Is this prospect a Lighthouse Client? (Affects whether to offer introductory pricing.)
4. What are the user's Blue Ocean Services for this engagement (the offerings competitors can't easily copy)?
5. Are there partnership facilitators involved? (Affects margin and price floor.)

### Package design principles

- **Phase 1 (Foundation):** Initial engagement designed so the client has measurable evidence of value within 3 months. The 3-month value-proof point is non-negotiable, even if the engagement runs 6 months total. Service composition is **derived from the brief** (synthesized goal, service-tier reactions, candidate offering shape), not defaulted to a template. Different prospects need different Phase 1 shapes (leadership intensive, foundation cohort, foundation curriculum + workshops, role-based discovery). Typical commitment: 3-6 months.
- **Phase 2 (Strategic):** Picks up services Phase 1 deferred, plus depth that builds on what Phase 1 proved. Assumes Phase 1 earned trust.
- **Phase 3 (Optional):** Work outside core offerings that fits the prospect's needs. Only propose if there's a clear signal in the brief.

### Mode 3 composition logic (derive from brief, don't default)

Before drafting packages, work through this sequence:

1. **Read the synthesized goal** from the brief → list the priority behaviors / outcomes
2. **Read the service-tier reactions** → mark which services resonated, which got pushback
3. **Read the candidate offering shape** → confirm format that emerged
4. **Compose Phase 1** from services that:
   - Address the highest-priority behaviors in the goal
   - Resonated in discovery (not services we like but the prospect didn't engage with)
   - Can produce a visible value-proof artifact within 3 months
5. **Defer to Phase 2** any services the prospect was open to but that need a longer arc
6. **Surface Phase 3** adjacencies only if the brief explicitly signaled appetite

If a service appears in your default Phase 1 template but didn't resonate in discovery, leave it out. The brief is the evidence base; the catalog is a starting menu, not a default order.

### For each package, specify

- Which curriculum modules or program components
- Maintenance retainer (if any)
- Role-based workshops (if any)
- Live session block
- Champions program (if included)
- Additional services
- Commitment period
- Total cost
- Introductory partnership pricing terms (if Lighthouse Client + first engagement)

### Checkpoint (REQUIRED)

Present the recommended packages. Ask:
- Do the Phase 1 / Phase 2 split feel right for this client?
- Is there a Phase 3 opportunity, or skip it?
- Any pricing adjustments needed?
- Does the scope match what was discussed and validated?
- **Ready to move to Mode 4 (Pitch Design)?**

Do not proceed without explicit user confirmation.

---

## Mode 4: Pitch Design

**Goal:** Build the pitch deck for the live walkthrough meeting. The pitch is NOT the proposal. It's the structured way to walk the prospect through "Why us, why this, why now" so they say "I'm in" before they ever see the leave-behind.

> **Two uses of this arc.** The 6-element structure below also backs the *written* proposal on a competitive-bid path (Mode 5). Whichever you're building, apply the **gather → ask → draft** loop (Core Principle 8): pre-fill each element from the brief, ask the gaps, then write. Do not draft slide or section copy on unconfirmed inputs.

### Active interview at the start

1. Who is the audience for the live pitch? (Single stakeholder? Stakeholder plus exec?)
2. How long is the pitch meeting? (30, 45, 60 min?)
3. Does the prospect already trust the user (warm-path), or does the pitch need to do credibility-building work cold?
4. What's the strongest "Why You" line the user wants to land in the room?
5. What proof points are available (clients, scale, executive engagements, certifications)?
6. Are there partnership facilitators whose credentials need to feature?

### Pitch structure (KY's 6-element framework)

The pitch follows this arc. Each element is one or more slides.

| Element | Purpose | Typical slide count |
|---|---|---|
| **Narrative** | Painful problem → compelling transformation. Mirror the prospect's pain in their own words. | 1-2 |
| **Why Now** | Fast alignment on *urgency*: why this is the moment for the client, not next year. Distinct from Narrative (which mirrors the pain) and from Timing (the closing schedule). **Always included.** | 1 |
| **Alignment** | Conceptual agreement on the desired outcome. **Do not move past this slide until the prospect explicitly confirms or edits the outcomes.** | 1 |
| **Proof** | Definitive results and social proofing for similar Lighthouse Clients. **Concise, not long-form case studies** (per KY lesson 21). | 1 |
| **Process** | How we repeatably drive outcomes. Production rigor (build cycle), not session-arc preview. | 2-5 |
| **Offer** | Offer Portfolio for an easy "I'm in." Show what's in each option; **do not put pricing on this card** (pricing lives on a separate Investment card). Number of options, and whether to emphasize one, is a per-deal call; do not force a recommendation. | 1 |
| **Timing** | Schedule and clear next steps. Ends with a verbal hand-off question. | 1 |

**Why Now is a Mellonhead-standard beat, not one of Ken's six.** Ken folds urgency into the closing Timing element; Mellonhead surfaces it early, right after the Narrative pain-mirror, as a fast "are we aligned that this is urgent now?" check. Always include it, and keep it distinct from Narrative (the pain) and from the closing Timing (the schedule).

**Pricing is not one of the six elements and never goes on the Offer slide.** Give pricing its own Investment slide, placed right after Offer. The Offer slide sells the shape; the Investment slide carries the money.

### Output: `prospects/<client>/pitch.md`

For each slide, capture four parts:

- **On-slide content** - what the prospect actually sees (sparse, scannable)
- **Talking points** - what the user says when presenting it (the actual words)
- **Strategic intent** - what the slide is meant to accomplish in the pitch arc
- **Review notes** - specific questions for collaborators (partnership facilitators, business coach)

### KY-specific moves to apply

- **Cover slide:** sets up the meeting as a working session, not a presentation
- **Narrative slide:** mirror prospect's pain in their own quoted words. This is the "yes, that's exactly it" moment that earns the right to propose a solution.
- **Why Now slide (Mellonhead standard):** a fast urgency-alignment beat right after the Narrative. Name why now is the moment (demand already present, window open, cost of waiting), then check agreement: "does this urgency match what you're seeing?" Keep it distinct from the pain mirror and from the closing schedule.
- **Alignment slide:** the conceptual-agreement moment. Talking points should explicitly pause and ask "do these outcomes match what success looks like for you?"
- **Proof slide:** lean. Headline number + most-relevant credential + logos. No per-engagement detail on the slide; save it for talking points.
- **Process slides:** show production rigor (e.g., a build-and-run cycle), not a session-arc preview that repeats what's coming.
- **Sessions/offering slides:** lead with who facilitates and what participants walk away with, not the activity list.
- **Offer slide:** present the Offer Portfolio for an easy "I'm in." Show what each option includes, not its price: **pricing goes on the separate Investment card.** Let the deal decide how many options and whether to emphasize one; equal options with no forced recommendation are valid.
- **Timing slide:** ends with a verbal question ("What's your reaction? What did I get right, what would you change?") to surface objections in the room.

### Subtitle iteration

Subtitles do disproportionate work. Spend time iterating with the user on:
- The deck title's subtitle
- Each goal's one-line subtitle
- Each session's one-line subtitle
- The Playbook (or other named artifact) subtitle

### Checkpoint (REQUIRED)

Present the draft pitch.md. Ask:
- Does the Narrative mirror the prospect's pain accurately?
- Does the Why Now beat land the urgency and stay distinct from the Narrative?
- Does the Alignment slide deliver the conceptual-agreement moment?
- Is Proof tight enough (number + most-relevant credential + logos)?
- Does Process show real production rigor?
- Does the Offer present a clean portfolio for an easy "I'm in" (however many options the deal calls for)?
- Does Timing close with a question, not a statement?
- Subtitles ready for Gamma, or need another pass?
- **Ready to move to Mode 5 (Proposal Drafting)?**

Do not proceed without explicit user confirmation.

---

## Mode 5: Proposal Drafting

**Goal:** Write the proposal document. On a **relationship sale** it is the leave-behind, sent right after the pitch meeting. On a **competitive written bid** it is the primary deliverable, structured on the PTW 6-element arc so it carries the pitch itself. Build every section with the gather → ask → draft loop below.

### Active interview at the start

1. **Which path (from Mode 1)?** Relationship sale (pitch already happened or is scheduled) or competitive written bid (proposal carries the pitch)? This picks the structure below.
2. Relationship sale: has the pitch happened? If no, the proposal stays in markdown until after the pitch. If yes, what changed in the room and needs revising?
3. Is the proposal going to procurement / legal beyond the primary stakeholder?
4. Does the proposal need any additional sections (e.g., scope-locking, terms, IP)?

### Per-section build loop (gather → ask → draft)

Apply this to every section, in order. Do not skip to drafting (Core Principle 8).

1. **Gather.** Pre-fill the section from the brief, prior conversation, and other repo context (bio, service catalog, past deliverables, memory). Mark what's already answered.
2. **Ask.** List the remaining gaps as specific questions and get them answered before writing. Batch the questions across sections so the user answers once, but do not draft a section whose inputs are still open.
3. **Draft.** Write the copy only once inputs are confirmed. An inline "TO CONFIRM" placeholder is a fallback for a genuinely blocked item, not a reason to skip the ask.

### Output: `prospects/<client>/proposal.md`, structure by path

**Written-bid path (PTW-structured; the proposal carries the pitch):** structure the document on the 6-element arc.

1. **Cover** - title, subtitle, prepared for, by, date
2. **Narrative** - the client's problem in *their own words* (their demand, not our positioning/marketing language). Mirror, don't market.
3. **Why Now** - fast alignment on *urgency*: why this is the moment for the client now. Distinct from Narrative (the pain mirror) and from the closing Timing (the schedule). Always included.
4. **Alignment** - what success looks like (outcomes from the brief), with a conceptual-agreement pause built in for any live walkthrough
5. **Proof** - tightest, most-relevant credibility (number + most-relevant client + credential)
6. **Process** - how we repeatably drive the outcome (production rigor / method), not a session-by-session preview
7. **Offer** - the options and what each includes; **no pricing here** (pricing lives in the Investment section). See the Offer note in Mode 4 for how many and whether to recommend
8. **Investment** - pricing table
9. **Terms** - scope, IP, ownership (competitive bids usually need this; relationship sales often don't)
10. **Timing** - phased table + next steps
11. **Who you'll be working with** - bios

**Relationship-sale path (leave-behind after a live pitch):** the pitch already did the persuasion, so the proposal can use the lighter structure.

1. **Cover** - title, subtitle, prepared for, by, date
2. **Context** - what we heard, why now (in client's language)
3. **What [participants] will be able to do** - the outcomes (3-6 goals from the brief)
4. **How we'll get there** - sessions / program structure with format and walks-away-with per session
5. **Pre-work / post-work / continuation patterns** (if applicable)
6. **Who you'll be working with** - bios with photos
7. **Investment** - options. Partnership notes for introductory pricing.
8. **Timeline** - phased table
9. **Next steps** - concrete actions with owners

### Writing style

All prose rules per `/writing-guide.md` (see Constants and Reference Files). Proposal-specific conventions:
- Confident, direct, warm but not casual
- Bold key phrases for scannability
- Use italics for subtitles and descriptions under headings
- Bullets over paragraphs wherever possible
- Bottom-line statements in bold at the end of sections to reinforce the takeaway
- Client-first language: frame everything in terms of their goals and outcomes

### Checkpoint (REQUIRED)

Present the proposal draft. Ask:
- Does the client context feel accurate?
- Is the pricing presentation clear?
- Any sections to add, cut, or rephrase?
- Does this match what landed in the pitch meeting?
- **Ready to move to Mode 6 (Gamma Generation)?**

Do not proceed without explicit user confirmation.

---

## Mode 6: Gamma Generation

**Goal:** Generate Gamma-ready artifacts. Pitch as presentation, proposal as document.

### Active interview at the start

1. Which artifact is being generated now: pitch deck, proposal document, or both?
2. **Pitch deck:** has the pitch meeting happened? If yes, generate. If no, generate so the user can rehearse, but do NOT send to prospect.
3. **Proposal document:** on a relationship sale, has the pitch meeting happened? If no, hold off (per KY, don't lob proposals over the fence). On a **competitive written bid**, the PTW-structured proposal is the primary deliverable and is generated up front; a live walkthrough is offered separately if schedulable.
4. What's the visual style preference? (Default: the Mellonhead v3 Gamma theme; themeId in Constants and Reference Files.)
5. Image preference: none, few, placeholder, or AI-generated?

### Standard Gamma settings

| Parameter | Pitch | Proposal |
|---|---|---|
| `format` | `presentation` | `document` |
| `textMode` | `preserve` | `preserve` |
| `themeId` | Mellonhead v3 (see Constants) | Mellonhead v3 (see Constants) |
| `imageOptions.source` | `noImages` (default) or per user | `noImages` |
| `cardOptions.dimensions` | `16x9` | (omit) |
| `additionalInstructions` | Required | Required |

> **Proposal Template option.** A reusable **"Proposal Template"** gamma exists in the workspace (find it with `get_gammas(type="template")`). For the proposal document, prefer `generate_from_template` with that template's id to keep proposals on a consistent branded layout; pass the clean client-facing content (internal notes and facilitator asides stripped) as the prompt. Fall back to `generate` with the v3 theme if no template applies.

### Required additionalInstructions

Always include guidance that:
- States the audience and meeting context
- Specifies design constraints (clean, executive, substance-forward)
- Requests typography over decorative imagery
- Asks for cards to follow markdown slide breaks (`---`)
- Requests no rewriting or reordering of content

### Pitch input preparation

When preparing pitch.md content for Gamma input:
- Extract ONLY the on-slide content (not talking points, strategic intent, or review notes)
- Use `---` between slides for clean card boundaries
- Maintain the slide order from pitch.md unless user requests a different order

### Proposal input preparation

When preparing proposal.md content:
- Use the entire markdown as input (it's already prose-formatted)
- Each `# Heading` becomes a card boundary

### Checkpoint (REQUIRED)

After generating:
- Provide the gammaUrl
- Note that Gamma generations cannot be edited via API; further changes use Mode 7
- Ask: **Ready to move to Mode 7 (Iterative Refinement) for any tweaks, or are we done?**

---

## Mode 7: Iterative Refinement

**Goal:** Apply targeted updates to deck/document while keeping all source files in sync.

### Active interview at the start

1. What needs to change?
2. Is the change to the pitch, the proposal, or both?
3. Should this also update the brief (e.g., a goal change)?

### Cascading consistency

When a change affects multiple files, propagate in this order:

1. Update the most upstream file (usually `proposal-brief.md` or `pitch.md`)
2. Cascade to dependent files (`proposal.md`, related sections of brief)
3. Generate Gamma editor prompts for the deck/document
4. Verify with `grep` that no stale references remain

### Gamma editor prompt patterns

Per Gamma's MCP limitation, generated decks cannot be edited via API. Provide the user with copy-paste-ready prompts for Gamma's in-editor AI assistant. Pattern:

```
Please update [Slide N: Title] in this presentation. Do not change 
any other slide.

[Specific replacement instructions, with exact text]

[Layout guidance]

Use the existing Mellonhead v3 theme colors and typography.

Do not modify any other slide.
```

Targeted edits beat full regeneration because:
- Preserves manual tweaks the user made in Gamma
- Faster
- Lower risk of unintended changes elsewhere

---

## Quality Checklist

Before presenting any artifact to the user, run the per-mode checklist in `references/quality-checklist.md`.
