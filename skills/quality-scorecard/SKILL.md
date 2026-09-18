---
name: quality-scorecard
description: Evaluates research materials using a systematic 4-step quality assessment (standards compliance, pitfall detection, checklist validation, playbook-based remediation) with a 1-10 score and tiered next steps. Requires the user to confirm the deliverable type (Activity Research, Facilitation Guide, Workshop Slide Deck, Workshop Resource) before scoring. Use when a team member submits research materials for assessment or asks whether a deliverable is ready to submit. Triggers include "quality scorecard", "run scorecard", "score this activity research", "assess quality", "is this ready to submit".
---

# Quality Scorecard

Evaluates research materials through systematic quality checks and provides actionable remediation guidance.

This file owns the assessment **process**. The scoring formula, component weights, the 9 Activity Research standards, pitfall definitions and deductions, the 8 auto-scorable checklist items, the blocker cap, assessment tiers, and benchmark examples all live in **`scoring-rubric.md`** in this directory (current version: July 2026 revision). That rubric is the single source of truth for scoring; do not restate or improvise scoring rules here.

## Reference Files

All in `.claude/skills/quality-scorecard/`:

- `scoring-rubric.md`: scoring formula, weights, standards, pitfalls, checklist items, blocker cap, tiers, benchmarks
- `Standards_Reference.pdf`: full R&D standards document
- `Common_Pitfalls.pdf`: pitfall taxonomy
- `Self-Assessment_Checklist.pdf`: full self-assessment checklist
- `Translation_Playbook.pdf`: remediation guidance
- `Activity_Research_Template.pdf`: the template well-formed activity research follows (its "When Results Miss" section maps to the Execution Failure Modes standard)

## When to Use

Trigger this skill when the user uses any of these phrases:
- "quality scorecard"
- "run scorecard"
- "assess quality"
- "is this ready to submit"
- "score this"

Also trigger when:
- User submits research materials with explicit request for evaluation
- User asks to check materials against standards or best practices

## Step 0: Confirm Deliverable Type (Mandatory Gate)

**Before any scoring, ask:**
> "What type of deliverable is this? Please select one: Activity Research, Facilitation Guide / Talking Points, Workshop Resource, or Workshop Slide Deck."

Do not infer type from visual formatting, layout, branding, or any other signal, even if the document looks unambiguously like one type. Do not proceed until the user confirms. This question is always required.

Deliverable types:
- **Activity Research**: Raw findings/methodology that facilitators use as input to build workshop materials
- **Facilitation Guide**: Structured guide for facilitators to run sessions
- **Workshop Slide Deck**: Client-facing presentation materials
- **Workshop Resource**: Leave-behind materials for attendees

Based on confirmed deliverable type, apply relevant sections from reference documents.

### For Activity Research Specifically

**What to evaluate:**
- **Translation readiness (primary)**: Can a facilitator understand this and build workshop materials from it? Is guidance actionable? Are prompts specific enough for a facilitator to use, tested with the client tool stack and client data or context? Do pro tips help participants get better results (how to structure prompts, refine follow-ups, handle edge cases), and where possible explain *why* a tip or approach works, not just what to do?
- **Structure/formatting (secondary)**: Is it scannable and synthesized? Short sentences vs dense paragraphs? Visual hierarchy with bold, bullets, subheaders?
- **Coherence and relevance (critical)**: Assuming the SME's approach is correct, does all content relate to the stated objective/approach? Is the narrative logical and clear? Is there off-topic or orphaned content that doesn't support the core methodology?

The required content elements, testing criteria, and score expectations are defined in `scoring-rubric.md` (the 9 standards, the checklist items, and the tier descriptions).

**What NOT to evaluate:**
- Client-ready framing (not required for research - it's input for building client materials)
- Whether methodology is "correct" (SME judgment, not scorecard's role)
- Time constraints (cannot be determined from research document alone)

**Dual-purpose note:**
Well-executed activity research can serve two functions simultaneously: as source material a facilitator builds from, AND as a document that could be shared as-is. If a document is polished enough to serve directly, treat this as a quality signal, not a scope problem. Do NOT penalize refinement or polish in activity research.

**Reference document sections that apply to Activity Research:**
- Standards Reference: Section 4 (Activity Research) + Section 5 (Formatting Best Practices)
- Self-Assessment Checklist: Perspective (as guidance, not blocker), Design, Testing, What "Done" Looks Like (both universal and Activity Research specific)
- Common Pitfalls: all sections apply, subject to the severity mapping and Activity Research exclusions in `scoring-rubric.md` ("wrong framing / not client-centric" and "lacks polish" do not apply)
- Translation Playbook: Best Practice: Demos, Universal approach (exclude the Role-Based Resource section and the Activity Research to Talking Points section; the latter describes how to convert activity research into a downstream deliverable and must NOT be cited when evaluating activity research itself)

## Assessment Process

When research materials are submitted, execute all 4 steps, then calculate the final score exactly as specified in `scoring-rubric.md` (weighted formula, per-pitfall deductions, blocker cap, rounding).

### Step 1: Standards Evaluation

Evaluate the submitted materials against the 9 Activity Research standards in `scoring-rubric.md`.

For each standard:
- Mark as **MET** or **MISSING**
- If missing, note why

Identify the **top 3 gaps** if any standards are missing.

### Step 2: Pitfall Detection

Read `Common_Pitfalls.pdf` and scan the materials for known issues, using the BLOCKER/IMPROVEMENT definitions, deduction values, and threshold test in `scoring-rubric.md` (would this issue cause a facilitator to pause, re-read, or follow up? If no, do not flag it).

**BLOCKER AUDIT (complete before calculating pitfall score):**
- [ ] Dense paragraphs (4+ sentences): found / not found; quote the single densest paragraph in the document:
- [ ] Verbatim repetition (paragraph+, across sections): found / not found; location:
- [ ] Missing critical sections: found / not found; which:
- [ ] Coherence breaks: found / not found; location:

Only after all four are populated: calculate pitfall score.

For each pitfall detected:
- Name the pitfall
- Categorize severity: **BLOCKER** or **IMPROVEMENT**
- Blockers prevent submission; improvements reduce quality

### Step 3: Checklist Validation

Read `Self-Assessment_Checklist.pdf` and validate the materials against the 8 auto-scorable checklist items defined in `scoring-rubric.md` (human-judgment items are excluded from scoring; the rubric lists them).

For each checklist item:
- Mark **PASS** or **FAIL**
- Calculate pass rate: X/8 items passed

### Step 4: Remediation Guidance (Conditional)

**Execute if score is below 8/10.**

Read `Translation_Playbook.pdf` and match each identified issue to relevant playbook guidance.

For each gap/pitfall/failure:
- Cite the specific playbook section that addresses it
- Extract the recommended fix

Prioritize the top 3-5 most impactful gaps.

## Scoring and Tiers

Compute the score per `scoring-rubric.md`. Tier mapping (defined there): 8-10 READY TO SUBMIT, 5-7 ITERATE INDEPENDENTLY, 1-4 SCHEDULE MEETING. Remember to apply the rubric's blocker cap after calculating the weighted total.

## Output Format

Always use this exact structure:

```
**SCORE: X/10**

**ASSESSMENT: [READY TO SUBMIT / ITERATE INDEPENDENTLY / SCHEDULE MEETING]**

**STANDARDS EVALUATION:**
✓ [Standard name] - Met
✗ [Standard name] - Missing: [brief reason]
...

**PITFALLS DETECTED:**
[If none: "None detected"]
[If present:]
- [Pitfall name] (BLOCKER/IMPROVEMENT): [description]
...

**CHECKLIST STATUS:** X/8 items passed
[If all passed: list nothing]
[If failures exist:]
Failed items:
- [Item name]: [reason for failure]
...

**GAPS TO ADDRESS:**
[If score < 8, list top 3-5 gaps]
1. [Gap/pitfall/failure] → Playbook reference: [section name] - [specific guidance]
2. [Gap/pitfall/failure] → Playbook reference: [section name] - [specific guidance]
3. [Gap/pitfall/failure] → Playbook reference: [section name] - [specific guidance]

**NEXT STEPS:**
[If 8-10:]
- Document is ready to submit as-is.
- Any remaining items are optional polish only. Straightforward mechanical fixes (e.g., deleting blank slides) can be done quickly. Qualitative suggestions are judgment calls, not required for submission.

[If 5-7:]
- Address gaps listed above using playbook guidance
- Resubmit for assessment

[If 1-4:]
- Schedule alignment meeting with facilitator
- Do not iterate independently - fundamental approach needs discussion
```

## Critical Rules

- **Always read the reference files before starting assessment**: `scoring-rubric.md`, `Standards_Reference.pdf`, `Common_Pitfalls.pdf`, `Self-Assessment_Checklist.pdf`, and `Translation_Playbook.pdf`
- **Complete all 4 steps** even if early steps reveal issues
- **Execute Step 4** if score is below 8/10 - playbook guidance is required for iteration
- **Calculate score exactly per `scoring-rubric.md`** - weights, deductions, blocker cap, rounding
- **Be specific** - cite exact playbook sections and guidance
- **Prioritize top 3-5 gaps** in remediation section - focus on highest impact

## File Locations

All reference files live alongside this file in `.claude/skills/quality-scorecard/`. If a file is missing, inform the user and ask for its location rather than scoring without it.
