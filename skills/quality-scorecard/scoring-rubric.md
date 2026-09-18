# Quality Scorecard Scoring Rubric

This rubric defines how research materials are evaluated and scored. Edit this document to recalibrate the assessment skill. It is the **single source of truth** for the scoring formula, weights, standards, pitfall definitions, checklist items, blocker cap, tiers, and benchmarks; `SKILL.md` owns the process and points here.

**CURRENT VERSION: July 2026 revision.**

**CURRENT CALIBRATION STATUS:** Weights prioritize translation readiness. Scannability strict. Benchmarks: Timeline (9/10), Briefs initial draft (5/10), Briefs final (TBD, rerun required under the current revision).

---

## Scoring Formula

**Total Score = (Standards × 0.3) + (Pitfalls × 0.4) + (Checklist × 0.3)**

Round to nearest whole number (1–10 scale).

**BLOCKER CAP:** If one or more BLOCKER pitfalls are detected, the final score cannot exceed **7/10**, regardless of the weighted total. Apply after calculating the weighted score.

*Pitfalls weighted at 40% because translation readiness failures are the primary driver of production delays.*

---

## Component 1: Standards Score (30% weight)

**Formula:** (Standards Met / 9) × 10

### Activity Research Standards (9 total)

Derived from Standards Reference (R&D) Section 2. "Summary" and "What this means for your teams" are template sections but not scored standards — their presence is a quality signal, not a requirement.

| # | Standard | Passes When | Fails When |
|---|---|---|---|
| 1 | Objective | Present, ≤2 sentences covering: problem, approach, tool, audience, goal | Missing entirely, or so vague the approach is unclear |
| 2 | Recommended Approach | Key principles behind the approach present; challenges from research noted | Approach described as outcome only — no principles or rationale |
| 3 | Research backing with citations | Sources cited, footer-formatted (Author. *Article title* (Source)), smaller font than body | Research claims made with no attribution |
| 4 | Actionable guidance | Pro Tips/Best Practices and/or Do's/Don'ts present in some form | Section absent or contains only restatements of the approach |
| 5 | Tool Limitations | Honest capability ceilings present — what the tool can't do and why (e.g., can't read attachments, misreads tone, no access to external links) | Section absent |
| 6 | Execution Failure Modes | At least one documented failure from testing with recovery guidance — what the bad output looked like, likely cause, what to try. Distinct from tool limitations: not "the tool can't do X" but "when your output looks like Y, here's why and what to fix" | Section absent, or only tool-level limitations present with no execution-layer guidance |
| 7 | Example prompts + outputs | At least one prompt AND at least one output shown | Prompts present but no outputs; or outputs present but no prompts |
| 8 | Guardrails & Rollout | Implementation, governance, security, policy, or rollout considerations present | Section absent — facilitator has no guidance on how to set this up |
| 9 | Scannability | Scannable bullets OR ≤3-sentence paragraphs, visual hierarchy via headers/bold/subheads, key insights surfaced | Dense multi-paragraph blocks (4+ sentences), walls of text, insights buried |

**Notes:**
- Control/test prompt pairing is best practice but not required — a single prompt + output satisfies standard #7
- Coexistence of prose-heavy narrative sections and bullet-heavy tip sections is NOT a scannability failure — this is expected in Activity Research. Density failures *within* a section type trigger standard #9 as missing.
- Standard #6 is satisfied by the "When Results Miss" section in the Activity Research Template. A doc predating that template can satisfy it if execution failure modes with recovery guidance appear anywhere in the document.

**Example:** 6/9 standards met = (6/9) × 10 = 6.67 × 0.3 = **2.0 points**

---

## Component 2: Pitfalls Score (40% weight)

**Formula:** Start at 10, deduct per pitfall detected. Minimum: 0.

**Threshold test — apply before flagging any pitfall:** Would this issue cause a facilitator to pause, re-read, or follow up? If no, do not flag it. Style preferences and "could be better" observations are not pitfalls.

### BLOCKER Pitfalls (−3 points each)

| Pitfall | Definition |
|---|---|
| Dense paragraphs | 4+ sentences per paragraph, multiple consecutive dense paragraphs, walls of text that make content hard to scan |
| Verbatim repetition | A paragraph or more copy-pasted across sections without synthesis or reframing. A repeated word, phrase, or short bullet does not qualify. |
| Missing critical section | One or more required standards entirely absent. **Counts as a single BLOCKER regardless of how many sections are missing** — the standards score already penalizes each missing section individually; this pitfall flags the structural pattern once. |
| Coherence break | Content that contradicts or is disconnected from the stated approach or objective |

### IMPROVEMENT Pitfalls (−1 point each)

| Pitfall | Definition |
|---|---|
| Word salad / jargon | Terms used without adequate explanation for a facilitator audience |
| Conceptual guidance without mechanics | Describes *what* to do but not *how*; lacks UI steps, tool-grounded instructions, or executable examples. *Exception: intentionally high-level professional judgment guidance is not flagged.* |
| Minor formatting inconsistency | Inconsistent use of bullets, headers, or bold *within* a section type |
| Too vague | Guidance lacks enough specificity for a facilitator to act on |
| Source citations absent or malformatted | Research claims present but not attributed; or citations present but not footer-formatted per standards. *Flag only when research-backed claims are made without attribution — do not flag if no external research is cited.* |

**Note on Common Pitfalls (R&D) doc:** "Wrong framing / not client-centric" and "Lacks polish / not client-ready" do NOT apply to Activity Research. Client-facing polish is a quality signal, not a failure. The audience framing checklist item below reflects this.

**Example:** 2 blockers + 1 improvement = 10 − 3 − 3 − 1 = 3 × 0.4 = **1.2 points**

---

## Component 3: Checklist Score (30% weight)

**Formula:** (Items Passed / 8) × 10

The Self-Assessment Checklist (R&D) contains additional items for researcher self-review (Setup, Limitations, Multiple paths, Validation steps, Realistic Timing, failure documentation). These remain excluded from scoring — they require human judgment and cannot be auto-scored from the document alone.

### Auto-Scorable Items (8 total)

| # | Item | Passes When | Fails Only When |
|---|---|---|---|
| 1 | Audience framing | Facilitator can understand and act on this | Content is so theoretical/internal a facilitator couldn't use it. Client-facing polish does NOT fail this — it is a quality signal. |
| 2 | Technical level appropriate | Accessible to AI novices | Assumes deep AI expertise without scaffolding |
| 3 | Backward design | Clear behavioral outcome — stated or clearly inferable | No discernible connection between approach and participant behavior change |
| 4 | Tool stack tested | Specific tool named (e.g., Copilot, ChatGPT, Outlook) and tested with client data | No specific tool named; generic "AI" only |
| 5 | Examples with outputs | At least one prompt AND at least one output shown | Prompts shown but no outputs; or outputs present but no prompts |
| 6 | Formatting consistent | Bullets/headers/bold applied consistently *within* section types | Inconsistent conventions within the same section type |
| 7 | Tone consistent | Level of detail stays consistent throughout | Sections unexpectedly thin or exhaustive relative to the rest |
| 8 | Clear themes/message | Coherent narrative, clear throughline, reviewer can identify core value prop | Disjointed content, no discernible arc |

### Excluded from Scoring (Human Judgment Required)

Setup/prerequisites documented, limitations/edge cases considered, multiple paths considered, validation steps included, realistic timing (≤20 min), SME alignment, failure documentation during testing.

**Example:** 6/8 passed = (6/8) × 10 = 7.5 × 0.3 = **2.25 points**

---

## Assessment Tiers

| Score | Tier | Meaning | Action |
|---|---|---|---|
| 8–10 | READY TO SUBMIT | Minor polish, researcher can finalize | Submit after addressing minor items |
| 5–7 | ITERATE INDEPENDENTLY | Fixable with playbook guidance | Address gaps, resubmit |
| 1–4 | SCHEDULE MEETING | Fundamental misalignment | Discuss with facilitator before proceeding |

*Score of 10 is essentially unattainable. Realistic best case is 8–9.*

---

## Example Calculation

**Given:** 6/9 standards met · 2 blockers (dense paragraphs + verbatim repetition) + missing critical sections (1 blocker, counted once) + 1 improvement · 6/8 checklist passed

1. Standards: (6/9) × 10 = 6.67 × 0.3 = **2.0**
2. Pitfalls: 10 − 3 − 3 − 3 − 1 = 0 × 0.4 = **0** *(floor)*
   *If only 1 missing-sections blocker fires:* 10 − 3 − 3 − 1 = 3 × 0.4 = **1.2**
3. Checklist: (6/8) × 10 = 7.5 × 0.3 = **2.25**
4. Weighted total: 5.45 → rounds to **5**
5. BLOCKER CAP check: blockers present → cap at 7. 5 < 7, cap does not change score.

**Final: 5/10 — ITERATE INDEPENDENTLY**

---

## Benchmark Examples

### Timeline Doc: 9/10 (READY TO SUBMIT)
- **Standards:** 9/9 met (100%) — assumes Timeline doc contains execution failure modes; if not, 8/9 still rounds to 9 (see note)
- **Pitfalls:** 0 blockers, 2 improvements (blank slides, jargon) → 10 − 1 − 1 = 8 × 0.4 = 3.2
- **Checklist:** 8/8 passed → 10 × 0.3 = 3.0
- **If 9/9:** (10 × 0.3) + 3.2 + 3.0 = **9.2 → 9**
- **If 8/9:** (8.89 × 0.3) + 3.2 + 3.0 = 2.67 + 3.2 + 3.0 = **8.87 → 9**
- **Timeline benchmark holds at 9/10 regardless. No blockers → cap does not apply.**

### Briefs Doc Initial Draft: 5/10 (ITERATE INDEPENDENTLY)
- **Standards:** 4/9 met (missing: Objective, Citations, Execution Failure Modes, Guardrails, Scannability)
- **Pitfalls:** 2 blockers (dense paragraphs, verbatim repetition) + 1 blocker (missing critical sections, counted once per the missing-sections rule) + 1 improvement (citation formatting) → 10 − 3 − 3 − 3 − 1 = 0 floor... but "missing critical sections" now counts as 1 blocker: 10 − 3 − 3 − 1 = 3 × 0.4 = **1.2**
- **Checklist:** 6/8 passed → 7.5 × 0.3 = 2.25
- **Calculation:** 1.33 + 1.2 + 2.25 = 4.78 → **5**
- **BLOCKER CAP:** 3 blockers → cap at 7. 5 < 7, no change.

### Briefs Doc Final Version: TBD (rerun required under the current revision)

---

## Recalibration Instructions

To update this rubric: edit and resubmit with prompt "Update the quality-scorecard skill to use this new scoring rubric."

**Common scenarios:**
- Translation too harsh → reduce Pitfalls weight 40% → 35%
- Too many meetings → lower meeting threshold ≤4 → ≤3
- Blockers too punitive → reduce deduction −3 → −2
- Want 4 tiers → add "NEEDS REVISION" at 6–7
- Standards too strict → move scannability to improvement-only

---

## Changelog

**July 2026 revision (current; formerly "Version 8"):**
- "Missing critical sections" BLOCKER redefined: counts as a single BLOCKER regardless of how many required standards are absent. Rationale: the standards score already deducts for each missing section individually; the pitfall flags the structural pattern once, not per instance. This prevents double-penalization when multiple sections are missing simultaneously.
- Briefs initial draft benchmark locked at 5/10 (ITERATE INDEPENDENTLY); this supersedes the 6/10 value from the Version 5 entry below
- Briefs final version benchmark marked TBD, rerun required

**Version 7:**
- Standard #5 (Limitations/Caveats) split into two distinct standards: Tool Limitations (#5) and Execution Failure Modes (#6)
- Tool Limitations: capability ceilings — what the tool can't do and why
- Execution Failure Modes: testing-derived recovery guidance — what bad output looks like, likely cause, what to try. Maps to "When Results Miss" section in Activity Research Template
- Standards denominator increases from 8 to 9
- Notes updated: standard #6 (prompts + outputs) renumbered to #7; scannability renumbered to #9
- Backward-compatibility note added: docs predating the Activity Research Template can satisfy standard #6 if execution failure modes appear anywhere in the document
- Timeline benchmark confirmed stable at 9/10 under both 8/9 and 9/9 scenarios
- Briefs benchmark marked TBD — rerun required against actual document
- Checklist excluded items updated to include failure documentation during testing
- Example calculation updated to 9-standard denominator

**Version 6:**
- Standards list embedded directly in rubric — no longer defers to Standards Reference (R&D)
- Standards denominator remains 8 — Do's/Don'ts folded into Actionable guidance (standard #4)
- BLOCKER CAP rule added (was in QC_Skill.md only, missing from rubric)
- Pitfall threshold test added ("would a facilitator pause?") from QC_Skill.md
- Source citations added as IMPROVEMENT pitfall
- Common Pitfalls taxonomy explicitly mapped to BLOCKER/IMPROVEMENT severity
- Audience framing checklist item: confirmed client-facing polish does NOT fail this item
- Timeline benchmark checklist corrected to 8/8
- Briefs benchmark recalculated under v6 formula — produces 5

**Version 5:**
- Deliverable type detection replaced with mandatory Step 0 confirmation gate
- Checklist corrected to 8 auto-scorable items
- Briefs benchmark updated to 6/10
- Scoring weights corrected throughout: Standards 30%, Pitfalls 40%, Checklist 30%

**Version 4:**
- Added CRITICAL INTERPRETATION NOTE overriding Common_Pitfalls.pdf: prose-heavy + bullet-heavy section coexistence is not a formatting failure
- Scoped "inconsistent formatting" BLOCKER to density failures only
- Updated checklist #7: formatting consistency evaluated within sections, not across section types
- Updated checklist #8: tone consistency = depth/detail level, not stylistic register
- Removed "Activity Research → Talking Points" as valid remediation reference
- Added dual-purpose research note: polish in activity research is a quality signal

**Version 3:**
- Limited checklist to 9 auto-scorable items
- Refined scannability standard (short paragraphs acceptable)
- Sharpened dense paragraph blocker definition
- Fixed Timeline scoring (now 9/10)

---

**Items to resolve in future iterations:**

1. **Briefs benchmark:** Rerun against actual document under the current revision before locking. Expected to stay at 5 or drop (no execution failure modes likely present).
2. **Objective-scope matching:** Should research deliver exactly what the objective promised — no scope creep, no scope gaps? Decision pending.
3. **"What this means for your teams" as scored standard:** Currently excluded. Consider adding as standard #10 once document corpus is larger and pattern is clearer.
