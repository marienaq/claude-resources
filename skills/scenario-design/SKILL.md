---
name: scenario-design
description: Designs and refines scenario-based learning activities where learners practice judgment, not pattern-matching. Covers pressure-testing scenarios for genuine tension vs. obvious right answers, brainstorming and curating answer options (good, bad, unrealistic distractors), differentiating cognitive work across a multi-question arc, separating ethical tensions from implementation concerns, and designing capstone questions that force a real judgment call. Use when designing new scenarios, reviewing existing scenario questions, or building knowledge check options. Triggers: "review this scenario for genuine tension," "brainstorm options for a knowledge check," "design the arc for a scenario about X," "does this question have an obvious right answer?"
---

# Scenario Design for Learning

Design scenario-based learning activities that expose genuine tensions and support ethical decision-making. This skill captures Mellonhead's approach to building scenarios where learners practice judgment, not pattern-matching.

## When to Use

Use this skill when:
- Designing new scenario-based learning activities
- Reviewing or revising existing scenario questions
- Brainstorming answer options for knowledge checks
- Evaluating whether a scenario has genuine tension or an obvious right answer
- Structuring the arc of a multi-question scenario

---

## Core Principles

### 1. Every question should do different cognitive work

If two questions feel like "pick the plausible consequences," one of them needs to change. Map each question to a specific type of thinking:

| Cognitive work | Question type | Example prompt |
|----------------|---------------|----------------|
| Observation | What do you notice? | "What stands out in this situation?" |
| Analysis (lens) | Apply a specific framework | "Using the impact on outcomes lens, what consequences should you consider?" |
| Stakeholder perspective | Who is affected and how | "Which stakeholder relationships are most affected?" |
| Prioritization | Commit to one thing | "If you could only optimize for one, which would it be?" |
| Judgment | Make a recommendation | "What do you recommend?" |

Before adding a question, name what cognitive work it does. If you cannot distinguish it from an adjacent question, cut or redesign one of them.

### 2. Tie options to decisions, not just observations

Generic options ("errors could happen," "trust could be affected") let learners pattern-match instead of reason. Stronger options connect a specific decision to a specific consequence.

**Weak:** "Automated responses that miss context could frustrate members"
**Stronger:** "Auto-sending responses on membership status questions risks missing billing disputes that require judgment"

The stronger version names the decision (auto-sending on membership status) and the consequence (missing billing disputes). The learner has to evaluate the connection, not just decide if it sounds plausible.

### 3. Pressure-test for genuine tension

Before finalizing a scenario, ask:
- Is there an obvious "right" answer? If so, redesign.
- Do the options represent a spectrum (none/some/lots) with an obvious middle? If so, the tension is about degree, not judgment. Reframe so options reflect genuinely different values or priorities.
- Can you argue for each option without feeling dishonest? If not, the weaker options need strengthening.
- Are the competing responsibilities real? Ethical tension comes from having legitimate obligations to different stakeholders that cannot all be fully satisfied at the same time.

### 4. Separate ethical tensions from implementation concerns

Ethical judgment is upstream: what do you prioritize, what tradeoffs do you accept, who bears the risk?

Implementation is downstream: how do you communicate the change, how much testing is enough, what does the monitoring plan look like?

Both matter. But in an ethics-focused scenario, the decision point should live in the ethical tension. Implementation can appear in feedback ("Whichever approach you chose, the quality of the outcome depends on how it's implemented") without becoming the focus of the activity.

### 5. The capstone should force a real judgment call

"Select all that apply" is analysis. It is not decision-making. At least one question in the scenario should force the learner to pick one thing and own the tradeoff.

Effective capstone patterns:
- "If you could only optimize for one of the following, which would it be?" (single choice, per-option feedback showing the tradeoff)
- "Given these conditions, which approach does this priority point to?" (sorting or matching)
- "What do you recommend?" (scenario block with per-option feedback)

The feedback should validate the choice, name what it means for the recommendation, and make the tradeoff explicit. No judgment, no "right" answer. Just: here is what you are optimizing for and here is what you are giving up.

### 6. Know when to cut

If the arc feels drawn out, trust that instinct. Every scene should earn its place by doing cognitive work the previous scene did not. If a question merely confirms what the learner already concluded, cut it. A tighter arc with a strong capstone is better than a thorough arc that loses momentum.

### 7. The prose above a scenario set carries the definition, never the worked cases

When a section is scenario-led, the text block that introduces it has one job: give the learner the rule or threshold they are about to apply. It does not walk through the cases. The scenarios are the cases.

The failure is quiet, because both halves are individually good. A five-paragraph block states a threshold, then works through "still in progress versus already out" and "what if you cannot tell who wrote it," and the activity underneath teaches exactly those two things with worked examples and feedback. The learner meets each rule twice inside two minutes, the second time as practice they have already been given the answer to, and the section costs a minute more than it needs to.

**The test:** for each paragraph in the intro block, find the scenario that teaches the same thing. If one exists, the paragraph goes and the scenario stays. Reading it aloud is how you catch it; on the page each paragraph looks like necessary setup.

What survives in the prose: the definition itself, the line, the "here is what counts." What moves to the scenarios: every application of it, every edge case, every "but what if."

This also protects the activity. Prose that pre-answers the scenarios turns judgment practice into recall, which is the thing scenario design exists to avoid.

### 8. Run a function tally on any all-staff set

Before a scenario set ships to a mixed-function audience, **count the situations by whose job they look like.** Write the tally down; it takes a minute and it is not obvious by feel.

Three of five situations set in policy analysis, legislative tracking, and comment letters will read as one department's work, and the people in operations, events, finance, or marketing decide the course is not for them at situation one. They are not wrong to; nothing in it looks like their week.

The bar is the spread, not the topic. A good set moves across functions the way the room does: a survey, a member call, an event budget, a vendor contract. Each situation still carries the same rule, so nothing is lost by moving one.

**When you cannot spread them,** because the content genuinely belongs to one function, say so in the handoff and name who will disengage. That is a scoping finding, not a copy problem.

Related, in the reviewer's words: ask who in the room decides this is not for them, and at which line.

---

## Option Design

### Constraints
- 5 options max per multiple response question
- Mix of realistic and unrealistic outcomes
- Include both positive and negative realistic outcomes

### 9. Randomize incorrect option positions

Never place incorrect options in the same position across all questions. If the distractor is always last, learners stop reading to the end. Vary placement across questions with no predictable pattern (not alternating, not sequential). Map it out across the full scenario to confirm randomness.

### 10. Make bias visible through contrast

When designing scenarios about AI bias, show the gap between what the person said and what AI produced. If the learner can compare the input to the output, the bias is undeniable rather than something they have to take on faith.

Example: If the scenario is about AI minimizing someone's contributions, show the person's prompt using active ownership language ("coordinated," "redesigned," "led") and AI's output using diminishing language ("helped coordinate," "assisted with," "supported"). The learner sees the gap directly.

### Designing good distractors
Distractors should be plausible but wrong in a specific, teachable way. The feedback should explain why the distractor misreads the situation.

| Distractor type | Example | Why it works |
|-----------------|---------|--------------|
| Overstates a risk | "Most members will stop contacting {{client}} if responses are automated" | Sounds cautious but overestimates member resistance |
| Understates complexity | "AI responses will be more consistent than human ones" | True for predictable questions, false for the context-sensitive ones the scenario describes |
| Confuses correlation with causation | "Staff will resist automation because it threatens their roles" | Assumes resistance without considering what staff actually value |
| Mistakes activity for progress | "Automating more shows leadership the team is innovative" | Confuses volume of automation with quality of judgment |

### Brainstorming process
When developing options, brainstorm broadly first, then curate:
1. Generate 5 good outcomes, 5 bad outcomes, and 5 unrealistic outcomes
2. Consider impacts across categories: staff, members/customers, processes/systems, quality, public perception, business objectives
3. Present the full list for curation
4. Select the final mix (typically 3-4 realistic, 1 unrealistic distractor)

---

## Scenario Arc Design

A well-designed scenario moves the learner through distinct phases:

```
Situation (what is happening)
     |
Observation (what stands out)
     |
Analysis (apply lenses/frameworks, each doing different cognitive work)
     |
Synthesis (commit to a priority or name the tension)
     |
Transition (reinforce that judgment, not a formula, is the point)
```

### Phase-by-phase guidance

**Situation:** Set up competing obligations. The best scenarios describe a situation where the learner has legitimate responsibilities to multiple stakeholders that cannot all be fully satisfied.

**Observation:** Ask what the learner notices before applying any framework. This surfaces assumptions and primes analysis.

**Analysis:** Apply lenses or frameworks one at a time. Each lens should surface different considerations. If two lenses produce overlapping options, differentiate them:
- One lens could tie options to specific decisions and their consequences
- Another could focus on specific stakeholder relationships and how they shift

**Synthesis:** Force a commitment. This is where the learner stops analyzing and starts deciding. Single-choice questions with per-option feedback work well here.

**Transition:** Reinforce the meta-lesson. The point is not which option they chose but that they can articulate what they prioritized and what they gave up.

---

## Confirming Tool Capabilities

Before designing an interaction, confirm what the target platform supports. Common questions to resolve:

- Does the platform support matching (1:1 pairing)?
- Does it support sorting (items into categories, many-to-one)?
- Can knowledge checks have per-option feedback, or only one feedback message?
- What is the maximum number of options?
- Can questions allow multiple selections (select all that apply) vs. single selection?
- Are there non-assessed interaction types (tabs, accordion, flashcards) that could support reflection without grading?

Design the learning interaction first, then adapt to the platform. But check constraints before writing detailed content to avoid rework.

**The tool the activity teaches gets the same check, in the learner's environment.** Before an activity idea becomes a scoping doc, list the tool features it depends on (a Copilot button, a pane, a prompt surface) and confirm each one in the platform the learners use (at {{client}}, the desktop apps), not the web or personal build the designer sees daily. Web features reach desktop on a delay and the gap breaks activities; the Copilot in Excel course was reworked for this (MQ, May 2026), and the 2026-09-09 validation pass was found running in the browser while {{client}} staff work on desktop. If a feature works on web only, scope to the desktop path. Memory: `feedback_validate_in_learner_env_first`.

---

## Quality Checklist

Before finalizing a scenario, verify:

**Tension**
- [ ] Is there genuine tension between competing responsibilities?
- [ ] Would reasonable people disagree on the right approach?
- [ ] Is the tension ethical (about values and priorities), not just operational (about execution)?

**Options**
- [ ] Does each option do something the learner has to evaluate, not just recognize?
- [ ] Are distractors plausible and teachable, not obviously wrong?
- [ ] Do correct options connect decisions to consequences, not just state observations?

**Arc**
- [ ] Does each question do different cognitive work from the ones around it?
- [ ] Is there a moment where the learner has to commit, not just analyze?
- [ ] Does the feedback validate choices and name tradeoffs without judging?
- [ ] Is the arc tight enough to maintain momentum?

**Setup prose**
- [ ] Does the intro block carry the definition only, with no worked cases the scenarios also teach?
- [ ] For each intro paragraph, has the scenario that teaches the same thing been searched for and not found?

**Audience spread**
- [ ] Has the function tally been written down, not just eyeballed?
- [ ] Does the set move across functions the way the room does, or is the concentration named in the handoff with who will disengage?

**Platform**
- [ ] Have interaction types been confirmed against what the LMS supports?
- [ ] Are option counts within platform limits?
- [ ] Does the feedback format match what the platform can deliver?
