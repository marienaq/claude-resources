# Call Assessment Rubric — Messaging & Positioning Delivery

> [!WARNING] DO NOT USE — needs rebuild (flagged 2026-08-17)
> This document is built on the **Mellonhead Labs** service offering, which MQ deprecated on 2026-08-17. Current focus is **enablement services** (AI champions, people manager programming) and **curriculum** (foundations, skills).
> **Do not run `/call-assessment` until this is rebuilt.** The rubric scores MQ *on saying* "Mellonhead Labs," so it would penalize correct current behavior.
> A search-and-replace will not fix this; it needs a rebuild with MQ. Positioning and messaging are work in progress and there is no approved replacement pitch line yet. Archived Labs material and the full manifest: `~/Projects/mellonhead-archive/archive/2026-08-17-mellonhead-labs/`.

This rubric defines how a sales/BD call is scored for **how well Mariena explained Mellonhead**. Edit this file to recalibrate the skill; `SKILL.md` owns the process and points here. It is the **single source of truth** for the scored dimensions, formula, kill-list, tiers, and output template.

**CURRENT VERSION:** July 2026 (v1 — positioning delivery only).

The bar for each dimension is Mariena's *current* canonical positioning. Read these at runtime and let them override anything below if they've evolved:
- `personal-development/call-prep/pitch-coaching-card.md`
- `strategy/labs-messaging-sheet.md`
- `strategy/positioning-summary.md`

---

## Scored dimensions

Eight dimensions. Six **always apply**. Two are **when-cued** — scored only if the cue arose on the call; if no cue arose, mark **N/A** (do not score as a failure), and note it.

Score each applicable dimension: **Pass = 1.0, Partial = 0.5, Fail = 0.0.** Every ruling needs a quoted line from the transcript.

### Always-apply (6)

| # | Dimension | Pass | Partial | Fail |
|---|---|---|---|---|
| 1 | **Problem-first, not artifact-first** | Opened the "what do you do" answer from the problem she solves (teams have AI ideas that stall / can't execute) | Named the problem, but only after leading with the artifact | Led with and stayed on the artifact ("my curriculum / courses / content / videos") |
| 2 | **Category + brand named** | Said "AI Workforce Enablement" **and** "Mellonhead Labs" | Named one of the two | Named neither; described herself as "education/training/curriculum" |
| 3 | **Three-way frame deployed** | Contrasted we teach AI / we build AI / **we build your team's ability to use AI**, placing Mellonhead as the third | Gestured at the distinction ("I don't build agents, I do enablement") without the clean three-way contrast | Never distinguished her model from training cos or consultancies |
| 4 | **Present tense, not aspiration** | Described do-it-with-you as what Mellonhead **is / does** | Mixed — described it partly as current, partly as "what I want to do / the transition I'm in" | Framed the current offer as aspiration; described the retired model (Champions, self-paced curriculum) as the present offer |
| 5 | **Concrete offer named** | Named a real offer — a Lab (Leaders / People Managers / Builders) or AI Curriculum for Everyone — with a walk-away deliverable | Referenced "workshops" or "programs" vaguely | No concrete offer surfaced |
| 6 | **Kill-list avoided** | 0–1 flagged words | 2–3 flagged words | 4+ flagged words |

### When-cued (2)

| # | Dimension | Cue | Pass | Fail |
|---|---|---|---|---|
| 7 | **Hook landed when cued** | Other party described stalled AI ideas / teams that can't execute / pilots that fizzle | Deployed "Your team's best AI ideas are still just ideas" (or a close variant) at the cue | A clear cue arose and she didn't take it |
| 8 | **Depth-beats-breadth insight** | Talk turned to scale, depth, or "train everyone vs. go deep" | Deployed the insight (a few motivated teams improve important workflows, the rest see what's possible) | A clear cue arose and she didn't take it |

*When-cued dimensions have no Partial. Pass = 1.0, Fail = 0.0, N/A if no cue.*

---

## Kill-list

Count every occurrence of each; the raw counts feed the time-series trend (Dimension 6 uses the total). Pull the current list from the coaching card at runtime; as of v1:

| Flagged word/phrase | Why it's flagged | Preferred instead |
|---|---|---|
| "curriculum" — **positioning contexts only** | Triggers the L&D-budget frame ("buying a library, not a transformation"). **Ruling MQ 2026-08-17: allowed as a backstage noun for the offer portfolio and catalog; flagged only when it leads a "what do you do" answer, headline, or bio.** At rebuild, score placement rather than presence. See `writing-guide.md` §9.1 | "hands-on sessions," "applying AI to real work" |
| "education" / "all in on education" | Collapses her into the "we teach AI" box | "AI Workforce Enablement" |
| "content" / "content development" | Describes herself by the low-margin artifact, not the value | "the frameworks and coaching," "the outcome" |
| "self-paced video courses" | Off the current sales surface | (leave off) |
| "train your power users" | Old Champions framing | "work alongside the team that needs it most" |
| "transform your organization" | "Do-it-for-us" framing; triggers cost objection | "take a few high-impact ideas all the way to shipped" |

Journey/history narration is exempt: if she's *deliberately* recounting her past (e.g. "I started out building custom curriculum, then…"), don't count words used to describe the retired model in the past tense. Count only words describing the **current** offer. Note when a word appears in a present-tense description of what she does now — that's the failure.

---

## Scoring formula

**Score = (points earned ÷ points possible for applicable dimensions) × 10**, rounded to the nearest whole number (1–10).

- Points possible = number of applicable dimensions (each worth 1.0). When-cued dimensions that were N/A drop out of both numerator and denominator.
- Example: 6 always-apply + 1 cued (hook) applicable, other cue N/A. Possible = 7. If she earns 1+1+0.5+1+0.5+0.5(kill-list)+0(missed hook) = 4.5, Score = (4.5 ÷ 7) × 10 = **6/10**.

**Hard floor on Dimension 1:** if she led with and stayed on the artifact (Dim 1 = Fail), the score cannot exceed **6/10** regardless of the weighted total — leading with the problem is the whole game.

---

## Tier bands

| Score | Tier | Meaning |
|---|---|---|
| 9–10 | **Dialed** | Carried the positioning cleanly; use this call as a benchmark. |
| 7–8 | **Solid, one gap** | Mostly on-message; one dimension to tighten. |
| 5–6 | **Drifted** | Recognizable but artifact-leaning or brand/category missing; real reps needed. |
| 1–4 | **History-as-positioning** | Narrated the past/artifacts as the offer; the current positioning didn't land. |

---

## Output template

Write to `personal-development/call-reviews/YYYY-MM-DD-<prospect-slug>.md`:

```markdown
# Call Assessment — <Prospect>, YYYY-MM-DD

**Call type:** Sales/BD  ·  **Transcript:** <path>
**Score:** X/10 — <Tier>

## Positioning moments (quoted)
- <the "what do you do" answer, quoted>
- <offer description, quoted>
- <any hook cue that arose, quoted, and whether she took it>

## Scoring
| Dim | Ruling | Evidence |
|---|---|---|
| 1 Problem-first | Pass/Partial/Fail | "<quote>" |
| … | | |
| 6 Kill-list | Pass/Partial/Fail (N words) | list the words + counts |
| 7 Hook (cued) | Pass/Fail/N-A | "<cue quote>" |
| 8 Depth insight (cued) | Pass/Fail/N-A | "<cue quote>" |

## What landed
- …

## What to tighten
- <issue, quoted> → <the fix>

## Drills for next call
1. …

## Kill-list tally + trend
- This call: curriculum ×N, education ×N, …
- Trend vs. prior reviews: <e.g. "curriculum 4 → 3 → 2 → 4, not improving">

## Pattern watch
- <any dimension failing/partialling across 3+ recent calls → candidate to update the coaching card>
```

---

## Planned extensions (not scored in v1)

Add as new dimension blocks with their own weights when Mariena is ready; keep positioning delivery as its own scored sub-score so the trend stays comparable:
- **Qualification** — budget/authority/need/timeline surfaced; primary-stakeholder validation.
- **Objection handling** — pricing, "we already have a strategy," build-vs-buy, handled without discounting the rate.
- **Next-step secured** — a concrete, dated next action before the call ended.
- **Discovery quality** — did she learn the buyer's actual stalled-idea before pitching.
