# Quality Scorecard Skill

Evaluates research materials with a 4-step quality assessment (standards, pitfalls, checklist, remediation), producing a 1-10 score and a tier: READY TO SUBMIT (8-10), ITERATE INDEPENDENTLY (5-7), or SCHEDULE MEETING (1-4).

## How to use

Invoke `/quality-scorecard` in Claude Code (or use a trigger phrase like "run scorecard", "score this", "is this ready to submit") and point it at the document to assess. The skill always asks you to confirm the deliverable type before scoring; do not skip that gate.

## Files in this directory

| File | Role |
|---|---|
| `SKILL.md` | The skill definition: assessment process, deliverable-type gate, output format |
| `scoring-rubric.md` | **Single source of truth for scoring**: formula, weights, standards, pitfall deductions, blocker cap, tiers, benchmarks, changelog. Current version: July 2026 revision. |
| `Standards_Reference.pdf` | Full R&D standards document |
| `Common_Pitfalls.pdf` | Pitfall taxonomy |
| `Self-Assessment_Checklist.pdf` | Full self-assessment checklist |
| `Translation_Playbook.pdf` | Remediation guidance cited in gap reports |
| `Activity_Research_Template.pdf` | Template well-formed activity research follows |

## Recalibrating

Edit `scoring-rubric.md` (it includes recalibration instructions and a changelog). Keep `SKILL.md` free of scoring numbers; it points to the rubric.

## Calibration scope

Calibrated for Activity Research deliverables, a Mellonhead facilitator audience, and the workshop material production workflow. It cannot auto-score time constraints, SME alignment, or subjective completeness of documentation; those need human judgment (the rubric lists the excluded items).
