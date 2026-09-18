---
name: call-assessment
description: Assesses how well Mariena explained Mellonhead on a sales/BD call: a scored review of her messaging and positioning delivery against the canonical Mellonhead positioning, turned into coaching notes with cited moments and drills. Isolates her speaking turns, finds the moments where positioning was at stake, scores them, and appends a dated review to a running log so patterns surface over time (and can update the pitch coaching card). Scoped to sales/BD calls and to positioning delivery for now; the rubric is built to extend later (qualification, objection handling, next-step). Runs standalone or as an offered handoff from /capture after a BD/Sales transcript is filed. Triggers include "run a call assessment", "assess this sales call", "how did I do explaining Mellonhead", "score this BD call", "coach me on that pitch".
---

# Call Assessment

> [!WARNING] DO NOT RUN. Rubric needs rebuild (flagged 2026-08-17)
> This skill scores against positioning that no longer exists. `rubric.md` awards full marks for naming the brand **"Mellonhead Labs,"** which MQ deprecated on 2026-08-17, so the skill would penalize Mariena for correct current behavior.
>
> Current focus is **enablement services** (AI champions, people manager programming) and **curriculum** (foundations, skills). Positioning and messaging are work in progress and there is no approved replacement pitch line to score against yet, so the rubric cannot simply be find-and-replaced.
>
> **If asked to run a call assessment, say this first and offer to rebuild the rubric with her instead.** Archived material: `~/Projects/mellonhead-archive/archive/2026-08-17-mellonhead-labs/`.

Assesses how Mariena carried Mellonhead's **messaging and positioning** on a sales/BD call, scores it, and turns it into coaching notes she can act on before the next call.

This skill owns the **process**. The scored dimensions, the scoring formula, the kill-list, and the tier bands all live in **`rubric.md`** in this directory, the single source of truth for scoring. Do not restate or improvise scoring rules here.

The bar (what "good" sounds like) is defined by Mariena's canonical positioning, which the skill reads at runtime so it never drifts from the current messaging:
- `personal-development/call-prep/pitch-coaching-card.md`: the spoken-delivery coaching card. **Currently banner'd DO NOT USE; pending rebuild.**
- The former Labs messaging sheet (strategy/labs-messaging-sheet.md) was **archived 2026-08-17** to `~/Projects/mellonhead-archive/`. No replacement exists yet.
- `strategy/positioning-summary.md`: **currently banner'd DO NOT USE; pending rebuild.**

**All three runtime sources are unusable as of 2026-08-17, which is why this skill is gated.** Rebuilding it means rebuilding the positioning first, with MQ.

One rule that IS settled and should carry into the rebuild: **"curriculum" is allowed as a backstage noun** for the offer portfolio and catalog, and flagged only when it leads a "what do you do" answer, headline, or bio. Score placement, not presence. See `writing-guide.md` §9.1.

If the positioning in those files has evolved since this skill was last touched, **the files win**: pull the current approved phrasing and kill-list from them, not from memory.

## Scope (current)

- **Call type:** sales / BD calls only. (Peer, partner, conference, and speaking calls are out of scope for now; the positioning-delivery core would transfer, but don't run this on them yet.)
- **Focus:** how Mariena explains Mellonhead: messaging and positioning delivery. **Not** qualification, discovery quality, objection handling as a discipline, or next-step mechanics. Those are planned rubric extensions (see `rubric.md` → "Planned extensions"); do not score them yet, but you may note a glaring one-liner in the qualitative section.

## When to Use

Trigger when Mariena says any of:
- "run a call assessment" / "assess this call" / "score this BD call"
- "how did I do explaining Mellonhead on that call"
- "coach me on that pitch"

Also trigger as an **offered** handoff from `/capture`: after /capture files a sales/BD transcript, it asks whether to run this. Do not auto-run; always confirm first.

## Step 0: Confirm inputs (gate)

Before assessing, confirm:
1. **The transcript**: path (if /capture just filed it, use that path; otherwise ask).
2. **This is a sales/BD call.** If it's a peer/partner/conference/speaking call, stop and say it's out of current scope.
3. **Who was on it / which prospect**: for the review filename and to read any prior context (`prospects/<Name>/`, `business-development/`).

Then read the three canonical positioning files listed above so you're scoring against current messaging.

## Step 1: Isolate Mariena's turns, normalize names

Read the **entire** transcript. Auto-transcription garbles her name (e.g. "Marina" → Mariena); normalize before quoting, never let a garbled spelling into the review. This assessment is about **her delivery**, so work primarily from her speaking turns, using the other party's turns for context and cues.

## Step 2: Find the positioning moments (the core analytical move)

Pull every moment where positioning was **at stake**, where she had an opening to carry the messaging and either did or didn't:
- Any answer to "what do you do / what does Mellonhead do / tell me about your business."
- Any description of the offer, the model, or how she works with clients.
- Any **cue to deploy the hook**: the other party describing stalled AI ideas, teams that can't execute, "we have ideas but no way to act on them," pilots that fizzle. Log cues whether or not she took them (a missed cue is a finding).
- Any moment where scale, depth, or "train everyone vs. go deep" came up (cue for the depth-beats-breadth insight).
- Any kill-list word she used (count each; the raw counts feed the time-series).

Quote the actual lines. The review is only credible with her real words.

## Step 3: Score against the rubric

Apply `rubric.md` exactly. Score each applicable dimension, handle the "when-cued" dimensions as N/A when no cue arose (don't penalize for a cue that never came, but do note it), tally the kill-list, and compute the score and tier per the formula. Show your work briefly (which dimension earned what, with the quote that justifies it).

## Step 4: Write the review + detect patterns

Read prior reviews in `personal-development/call-reviews/` first. Then write this review to `personal-development/call-reviews/YYYY-MM-DD-<prospect-slug>.md` using the output template in `rubric.md`. It must include:
- The score + tier, and the per-dimension table with a cited quote for each ruling.
- **What landed** (2–4 specifics, quoted).
- **What to tighten** (2–4 specifics, quoted, each with the fix).
- **Drills for next call** (2–3, concrete and spoken-ready).
- **Kill-list tally** for this call, and the **running trend** across prior reviews (e.g. "'curriculum': 4 → 3 → 2 → 4, not improving").
- **Pattern watch:** any dimension that has failed/partialled across multiple recent calls.

## Step 5: Present, and offer to update the coaching card

Present the review to Mariena (don't just write the file). If a pattern has persisted across **3+ recent calls**, propose a specific edit to `personal-development/call-prep/pitch-coaching-card.md` so the card sharpens from real evidence, but make the edit only after she okays it. This closes the loop: reviews feed the card, the card feeds the next call.

## Quality checks

- Scored only messaging/positioning delivery; did not silently grade qualification or other out-of-scope dimensions.
- Every ruling is backed by a quoted line from the transcript.
- "When-cued" dimensions marked N/A when no cue arose, not scored as failures.
- Names normalized; no "Marina" in the written review.
- The score matches the rubric formula (show the tally).
- Kill-list trend carried forward from prior reviews, not computed in isolation.
- Card-update proposed only on a 3+ call pattern, and only applied after approval.
