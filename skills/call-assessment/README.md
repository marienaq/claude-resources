# call-assessment

Scores how well Mariena explained Mellonhead on a sales/BD call and turns it into coaching notes.

- **`SKILL.md`** — the process (isolate her turns → find positioning moments → score → write review → detect patterns → offer to update the card).
- **`rubric.md`** — single source of truth for scoring (8 dimensions, formula, kill-list, tiers, output template). Edit this to recalibrate.

**Reads (the bar):** `personal-development/call-prep/pitch-coaching-card.md`, `strategy/labs-messaging-sheet.md`, `strategy/positioning-summary.md` — at runtime, so scoring never drifts from current positioning.

**Writes:** dated reviews to `personal-development/call-reviews/`. The running log is what makes it compound — patterns across calls surface here and can feed back into the coaching card.

**Scope (v1):** sales/BD calls, positioning delivery only. Rubric has a "Planned extensions" section for qualification, objection handling, and next-step.

**Runs:** standalone, or as an offered (never automatic) handoff from `/capture` after a BD/Sales transcript is filed.
