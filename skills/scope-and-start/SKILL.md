---
name: scope-and-start
description: Structured Chief-of-Staff workflow for turning an executive ask into scoped, executable work. Mirror requirements, three-way assessment (do / delegate / handback), task-scoped brief file with template sections, protocol for handbacks and reviews. Use when a task has real deliverables, needs research or drafting, or would benefit from clear requirements before work begins. Triggers include "scope this for me", "start the task", "help me get this done" .
---

# Scope-and-Start

Structured workflow for turning an executive ask into scoped, executable work. Designed to minimize cycles and preserve executive attention.

The default actor is **Orca** (`.claude/agents/orca.md`), Mellonhead's Chief of Staff. The skill is invocable directly by Mariena or by any agent that needs to scope work in this style.

## Core principle

Alignment first, tools second. If requirements are not confirmed, do not draft. If assumptions are not validated, ask. If a subtask can be delegated, delegate. If the executive does not need to be in the loop for a decision, do not put her in it.

## When to use

**Standing triggers** (Orca runs `/scope-and-start` on all three, no exceptions):
1. **Weekly priorities finalization.** Every substantive task on the finalized plan gets scoped.
2. **New task added to weekly priorities mid-cycle.** Scope it before touching the work.
3. **Task handed off directly by Mariena in conversation.** Standard handoff.

**Substantive task** = anything with a real deliverable (email, proposal, research summary, decision brief, workshop artifact) or that will benefit from structured requirements before work begins.

Do not invoke for:
- Quick lookups or status questions
- Quick admin items (send a link, book a slot, forward an email)
- Weekly planning itself (that is `/project-tasks` Mode 5; scope-and-start comes after the plan is set)
- Processing raw input into files (that is `/capture`)

## Before starting

The default actor is Orca. If this session was not started with `claude --agent orca`, read `.claude/agents/orca.md` now and operate under it for the rest of the run. Do not spawn `orca` through the Agent tool for this: a subagent cannot dispatch or reach the connectors, which defeats the skill.

## Workflow

### Step 1: Mirror requirements

Before any tool call, mirror the ask back to the executive. Confirm:

- **Problem.** The underlying need, not just the surface ask.
- **Goal.** What success looks like.
- **Deliverables.** Concrete outputs (format, length, tone, audience).
- **Executive position.** Expert on this? Exploring? Delegating? This shapes what the deliverable can honestly claim.
- **Constraints.** Deadline, audience, tone, format, dependencies.

Ask questions on anything that is not clear. **Do not proceed until confirmed.** What she has already decided is not a question: a date, scope, send date, or format she named goes into the brief as fact, with no sign-off gate or confirming row added on her behalf (MQ ruling 2026-09-10; the rule is in `orca.md`, "protect Mariena's attention").

**First `mh` call on any task, attended or not:** `mh task link <key#id> --actor <you>`. The task page shows a conversation only when it has been linked; writing to a task is not the same as being about it.

When running unattended (the scheduled sweep), the mirror happens in the store, not in chat. Each mirror question is one row:

```
mh question add <key#id> "<the question>" --proposed "<your default answer>" --blocks "<who waits>" --actor orca
```

**A proposed answer is mandatory.** A question without one is a research task, not a question: do the research, then ask. The cheapest reply Mariena can give is Accept, and every question should be one click from closed. `--blocks` names the person or session waiting ({{instructional designer}}, Thursday's session, the dispatch); a question that blocks nobody is a note, not a question. The command prints `Q<n>`; list the ids in the brief under `## Mariena's Next Actions` as `- Q41: <text>` with **no** `**MQ:**` slot, then stop. The next sweep resumes when `mh question list <key#id>` is empty; it never reads slots.

### Step 2: Assess

Determine the shape of the work.

**Skills required.** What capabilities does this task need? (Research, writing, tool use, calculation, coordination.)

**Three-way decision:**
1. **Do it yourself.** You have the skills, tools, and information; no missing pieces.
2. **Delegate to a specialist agent or skill.**
   - `iddy` for instructional-design deliverables from a final brief
   - `fanny` for accounting
   - `general-purpose` subagent for parallelizable research or lookup
   - `Explore` subagent for file and codebase search
   - Skills such as `/marketing-writer`, `/proposal`, `/facilitation-guide`, `/write-learning`, or any skill listed in `CLAUDE.md`
3. **Handback to Mariena.** Hard-stop pieces you cannot do (e.g. video-quality judgment, personal preferences, confidential context you do not have).

Name **handback points** explicitly. What must Mariena see or approve before the work can continue? Each one is a question row, `mh question add <key#id> "<the decision>" --proposed "<what you would do>" --blocks "<the handback>" --actor <you>`, so it has an id, a proposed answer, and a place to be answered.

**Missing information.** If key inputs are missing, ask now. Do not guess and build on assumptions.

### Step 3: Write the brief file

Create a task-scoped brief in the project directory. Naming: `<task-slug>-brief-YYYY-MM-DD.md`. Briefs are hand-written; the generator never touches them.

Three sub-steps, all required, in this order:

1. Write the file.
2. Record its path on the task row, so a sweep and the dashboard find it without searching:

   ```
   mh task brief <key#id> <path> --actor <you>
   ```

3. Echo the path in the chat recap (one line: `Brief: <path>`). A brief with no `brief_path` on its row is invisible to everything that reads the store; the 2026-09-10 read found one row in 291 carried one. The recap line is how a skipped step 2 gets noticed.

If the task needs a running note file rather than a one-off brief, `mh task note <key#id> "<text>"` creates `<project>/task-notes/<store-id>-<slug>.md` on first use and appends a dated entry under `## History` after that. **Never create a file under `task-notes/` by hand**; its name contains the store id, which does not exist until the row does.

Before writing the brief, read the project's `context.md` if one exists and link it from the brief rather than restating it. The brief is task-scoped; `context.md` is the project's memory (stakeholder input, decisions with reasoning, open questions). Durable context that surfaces while the task runs is written back to `context.md`, not left in the brief when it closes.

Template:

```markdown
# [Task Title]

**Task ID:** #NN (session tasks)
**Task:** `key#N` (project key plus the row number, from `mh task find <words>`; omit for one-offs)
**Owner:** Mariena
**CoS support:** Orca / Claude
**Date opened:** YYYY-MM-DD
**Questions:** see `mh question list <key#id>`
**First artifact:** [path the acting agent writes first, so a sweep can find and review it]

---

## Problem
[Underlying need in Mariena's language]

## Goal
[What success looks like]

## Deliverables
[Concrete outputs, format, tone]

## Chief of Staff Assessment
### Skills required
[List]

### Can do independently
[List]

### Can delegate to
[Agent by name + what they will handle + the output path they write to]

### Cannot do independently
[Hard stops with reason]

### Handback points
[Numbered list: what Mariena decides or provides]

---

## Findings
[Populated as work progresses]

## Mariena's Next Actions
[One line per open question, by id: `- Q41: <text>`. She answers in the session manager or by id in Slack; nothing is answered in this file.]

---

## Draft
[Final deliverable draft, populated once ready for polish]

---

## Notes for pattern refinement
[Anything worth capturing in scope-and-start or Orca for next time]
```

## Feedback conventions

Two ways MQ answers, both landing in the store, which is the only place `/do-work` reads:

1. **The session manager.** Accept or Answer on the task page. Nothing to re-type.
2. **Slack, by id.** "Q41: run the 90" in the project's channel or in a sweep thread. `/capture` applies it with `mh question answer 41 "<her words>" --source slack --actor capture`.

An answer she gives anywhere else (a ruling in `context.md`, an edit in a draft, a DM) reaches the store through `/capture`, which closes the questions a ruling settles (that skill, "A ruling closes the questions it answers"). Never re-ask a question that `mh question list <key#id> --all` shows answered.

Open the brief in Obsidian on create (user global preference):
```bash
open "obsidian://open?path=$(python3 -c "import urllib.parse;print(urllib.parse.quote('<absolute-path>'))")"
```

### Step 4: Execute or dispatch

- If doing it yourself: proceed to the first handback point.
- If delegating: invoke the agent, skill, or subagent with a tight scope and success criteria. Pass the brief file path so the specialist inherits context. Record it: `mh task dispatch <key#id> --to <agent> --expect <path> --actor <you>`. When the work comes back from a subagent, `mh task deliver <key#id> --artifact <path> --agent <agent> --actor <you>`; a specialist running as the session records its own delivery.
- If missing info: ask Mariena the specific questions and pause.

Record movement on the task as it happens: `mh task status <key#id> <status> --actor <you>`, `mh task note <key#id> "<text>" --actor <you>`. Session todos are scratch; the store is the record. **Never edit `task-list.md` or `priorities.md` by hand.** Both are generated, and a hand edit is overwritten silently.

### Step 5: Review before surfacing

If work was delegated, **review the returned output against the brief before showing it to Mariena.** Ask:
- Does it meet the stated deliverables?
- Does it use her voice (`writing-guide.md` rules)?
- Are its assumptions correct?
- Is there anything the specialist missed?

If it does not meet the bar, revise or re-delegate. Only surface to Mariena what she would accept on a first read.

### Step 6: Handback protocol

When work reaches a handback:
1. Update the brief's `## Findings` with current state and what is outstanding. Do not touch the header; status and dispatch-readiness are derived from the store.
2. Put the decision in the store: `mh question add <key#id> "<the decision>" --proposed "<your default>" --blocks "<what waits>" --actor <you>`. The task row keeps its status; a question is what waits on her, and a status cannot be answered.
3. Chat message: short. The question id, its proposed answer, and the brief path. Nothing else.

### Step 7: Resume on Mariena's input

- `mh question list <key#id> --all` first, then the brief for context. Do not reconstruct from memory.
- Apply her inputs.
- Continue to the next handback or the deliverable.

### Step 8: Close

- Final draft goes in the brief file's **Draft** section, not chat.
- Mariena polishes and ships.
- Close it: `mh task done <key#id> --actor <you>`. One command sets the status, clears the `Seq`, stamps the day-card line, and regenerates every view it touches. Notion only for contractor-assigned rows.
- Capture pattern notes at the bottom of the brief.

## File conventions

- Brief lives with the project directory (co-located with the client's other files).
- Naming: `<task-slug>-brief-YYYY-MM-DD.md`.
- Companion reference files when reusable material surfaces (e.g. `cowork-vs-chat-reference.md`).
- Open in Obsidian on create.

## Todo tracking

Every acting agent (Orca or a delegated specialist) keeps the store current through `mh`. Session todos are fine for in-conversation tracking, but they do not survive the session, so anything that matters is written to the store.

Task statuses are `backlog`, `planned`, `in_progress`, `waiting`, `review`, `done`, `canceled`:
- `backlog`: captured but not scheduled. Where a proposal lands.
- `planned`: placed in a week, not started
- `in_progress`: being worked
- `waiting`: blocked on someone. Say who with `--waiting-on "the pricing call"`. Moving off `waiting` clears the reason automatically.
- `review`: delivered and with a reviewer or with MQ
- `done` / `canceled`: archived

**Project statuses are a different set and a different spelling:** `active`, `waiting`, `parked`, `done`, `cancelled` (two Ls). The CLI accepts either spelling for a task and folds the markdown wording (`Killed`, `blocked`, `not started`, `in progress`) onto the right value, so a near-miss is corrected rather than silently wrong.

Handback state goes in the note, not the title: `mh task note <key#id> "waiting on MQ for the pricing call" --actor <you>`.

## Handback vs. delegation

- **Handback:** work pauses; Mariena must decide, spot-check, or approve before it can continue.
- **Delegation:** work continues under another agent or subagent; Mariena is not required in the loop.

Prefer delegation over handback where possible. Handback is a bottleneck; delegation is throughput.

## Writing voice

Draft deliverables in Mariena's voice per `writing-guide.md`:
- Zero em dashes, zero double hyphens (§3.1)
- Plain language (§3.2)
- No sweeping generalizations (§3.3)
- Problem-first framing (§3.7)
- No jargon; no signature moves that are not hers

Never treat a draft as final. Mariena owns polish and shipping.

## Pattern notes

Every brief ends with a **Notes for pattern refinement** section. What surfaced that is worth folding into `/scope-and-start` or into Orca's playbook next time? Distinct handback types, common delegation candidates, voice pitfalls, tool limitations. Periodically distill these into skill and agent updates.

## Origins

Pattern surfaced during the {{stakeholder}} Cowork email task on wk 7/13, 2026. Brief at `course-material/{{client}}/ai-advisory/2026-07-cowork-research/2026-07-{{stakeholder}}-cowork-brief.md`.
