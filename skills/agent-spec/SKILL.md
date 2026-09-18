---
name: agent-spec
description: Decides whether a new capability belongs in an existing skill, a new skill, a new agent, or the store and dashboard, then writes the spec and the file. Carries the decision gate (distinct defensible job, identity vs procedure, session vs subagent), the agent file template (job, dispatcher, skills, tools, reads-first, outputs, guardrails, reviewer, store writes, report shape), the skill file template (triggers, read-first, gated steps, verification, report, discipline), and the rule for what goes in memory vs a skill vs context.md. Use when a feature request lands in operations/ai-workflows, when a pattern note asks for a capability that does not exist, when Mariena says "we need an agent for", or when a skill has grown a second job. Triggers include "should this be an agent or a skill", "write the spec for", "add a skill for", "design the agent that", "this skill is doing two jobs".
---

# /agent-spec

The org-design gate and the job description, in one pass. Devi runs it. The output is a spec that Mariena can read in two minutes and say yes or no to, then the file itself once she has.

The standing rule: **every artifact has one distinct, defensible job**. Overlap is the failure mode (`feedback_distinct_defensible_job_per_artifact` in memory). Nine agents and forty skills is already a lot of prose for one person to hold; a new file has to earn its place by removing work, not adding a place to look.

## Read first

- `CLAUDE.md` (root): the skill and agent index, and the routing table under "Skill routing".
- `.claude/agents/orca.md`: how work is dispatched and reviewed today. Anything new has to fit that loop.
- The two or three closest existing files (the skill that almost does this, the agent that almost owns it). Read them whole.
- If the ask arrived as a feature request: `operations/ai-workflows/<feature>/design.md` and `plan.md`.
- `writing-guide.md` §3: skills and agents are written to it.

## Step 1: the decision gate

Answer these in order. Stop at the first that fits.

1. **Does an existing skill already own the job?** If the ask is a new rule, a new gate, or a new input to a procedure that exists, it is a **section in that skill**. Most asks end here. Example: "capture should close questions when it records a ruling" is a step in `/capture`, not a new skill.
2. **Is it a procedure with a trigger, run by more than one agent or by Mariena directly?** Then it is a **skill**. A skill is a procedure: read this, do these steps, gate here, report like this. It has no identity and no standing responsibilities.
3. **Does it need an identity?** An **agent** is justified only when at least two of these hold: it needs a persistent voice or judgment that a procedure cannot carry (Mark's ear for Mariena's register); it needs its own guardrails that differ from Orca's (draft-only, read-only, never publishes); it needs its own reviewer or is one; it is dispatched repeatedly with the same standing responsibilities; it needs to run as the session to reach connectors. One of these is not enough. "It would be nice to have a name for it" is zero of these.
4. **Is it really a store or dashboard feature?** If the fix is "the agent should know X" and X is state (who asked what, what was delivered), the fix belongs in `operations/tasks.db` and `mh`, not in a skill telling the agent to remember. Write it up as a feature request (`operations/ai-workflows/<feature>/design.md` + `plan.md`) and stop.

Write the answer as one paragraph at the top of the spec: which of the four, and the sentence that decided it. If the answer is 1, skip to Step 4 with the section text.

## Step 2: the agent spec (only if the gate said agent)

Fill every line. A blank line means the agent is not ready to exist.

```
Name:            one word, person-like, in the house pattern (Orca, Iddy, Mark, Revi, Devi)
Job:             one sentence. What it produces, for whom.
Not its job:     the two or three nearest things it does not do, and who does
Dispatched by:   Orca via the Agent tool | runs as the session (`claude --agent <name>`) | both, and when each
Skills it runs:  the /skills it reads each time (never works from memory)
Tools:           the minimum set. Add WebSearch/WebFetch only if research is the job
Reads first:     the files it opens before working (brief, context.md, writing-guide sections, its own reference files)
Outputs:         what it writes, where it lands, how the file is named
Guardrails:      the never-list, in the description and the body: never sends, never publishes, never edits the deliverable, never writes to Notion/Slack/Drive
Reviewer:        which revi-* checks its output before Orca surfaces it (or: it is a reviewer, and what it reviews)
Store writes:    the store commands it uses (`mh task note`, `mh task done`), always with --actor <name>
Reports:         the shape of its return to Orca and its chat to Mariena (what changed, what is hers to decide, word cap)
First assignment: the task key it will be dispatched on first
```

Then the two checks that catch most bad agents:
- **Subtract it.** If this agent did not exist, who would do the job, and what would go wrong? If the answer is "Orca, and nothing," it is a skill on Orca.
- **Overlap.** Name the closest existing agent and the sentence that separates them. If the sentence needs a "but also," the boundary is wrong.

## Step 3: the skill spec

```
Name:         kebab-case, a verb or a noun-phrase for the deliverable (facilitation-guide, capture, toolkit-audit)
Description:  what it does, then "Use when", then "Triggers include" with three or four of Mariena's own phrasings. This is the routing surface; it is read before the body
Who runs it:  the agent(s), and whether Mariena invokes it directly
Read first:   the canonical files, with section numbers where the guide is long
Steps:        numbered, each with its output; gates named as gates ("stop and hand back if")
Routes itself: if the skill has modes, it decides from what it is handed; it never asks her which mode
Verification: what the skill checks before calling itself done (a script, mh check-skills, a re-read, a dry-run against a past input)
Report:       the shape and the word cap
Discipline:   the never-list
Files:        SKILL.md, plus scripts/ for anything deterministic and references/ for long lookups the body should not carry
```

Rules of construction:
- **Delta only.** Voice, dashes, jargon, generalizations are in `writing-guide.md`. The skill points at the section; it does not restate it.
- **The model reads the file cold every time.** Front-load what decides routing. Put the never-list at the end under its own heading so it is the last thing read.
- **Deterministic work goes in a script.** If a check can be a script, it is a script under `scripts/`, and the step says how to run it. Prose asking the model to "carefully check every path" is how drift happens.
- **One gate per handback.** Every place the skill stops and waits for Mariena is a named step with what it hands her and what it needs back. Questions carry a proposed answer.
- **Store writes go through `mh`** with `--actor`; the exact command is quoted so `mh check-skills` can verify it.

## Step 4: where a rule lives

When the ask is a rule rather than a capability, put it in exactly one place and point from the others:

| Rule is about | Lives in | Pointer from |
|---|---|---|
| voice, style, wording | `writing-guide.md` | the skill that applies it |
| how a procedure runs | that skill's SKILL.md | memory, one line, with the ruling date |
| how an agent behaves | that agent's file | memory, one line |
| a client's stakeholders, decisions, constraints | the project's `context.md` | task-list Key Decisions, memory (key facts only) |
| Mariena's working preferences that cross projects | memory (`feedback_*`) | the skill it governs, as a rule with the date |
| what exists and how it chains | `CLAUDE.md` index | nothing; it is the index |

Memory is the last resort, not the first: it is recalled by relevance, so a rule that has to hold every time belongs in the file the agent reads every time.

## Step 5: write the file, then prove it

1. Write the agent or skill file from the spec. Match the register of the neighbours (`revi.md` for reviewers, `mark.md` for specialists, `do-work` for sweeps). Sentence-case headers. Zero em dashes.
2. Index it: the `CLAUDE.md` line in the right section; the `orca.md` delegate list if Orca dispatches it; the routing table if Mariena would ask for it in her own words.
3. Verify: frontmatter parses and `name` matches; `./operations/mh check-skills` clean; `python3 .claude/skills/toolkit-audit/scripts/audit.py` shows no new findings against the file.
4. Dry-run: take one real past input (a brief, a transcript, a draft) and walk it through the steps. Write down what the file would produce. If a step has no answer for that input, the step is not finished.
5. Hand to `revi` with the spec and the dry-run. Revi's toolkit checklist is in `revi.md`.
6. Record: `./operations/mh task note <key#id> "spec + file at <path>, dry-run on <input>" --actor devi`.

## What to hand Mariena

The spec, the dry-run, and one question if there is one: usually "should this exist" (with your recommendation and the subtract-it answer) or "is this the boundary" (with the sentence that separates it from its neighbour). Under 200 words in chat; the spec file carries the rest. She decides; you build.

## Discipline

- Never create an agent without the spec first and her yes.
- Never give an agent a tool it does not need for its job.
- Never let a skill restate the writing guide.
- Never put a rule in memory that the agent needs every time.
- Never reintroduce Mellonhead Labs framing, in any file.
