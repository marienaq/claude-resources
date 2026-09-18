---
name: project-tasks
description: Manages projects and tasks through the mh CLI against operations/tasks.db, with task-list.md and priorities.md generated from it and Notion as a collaboration surface, plus weekly planning, cross-project prioritization, hour logging, and workshop curriculum pipelines. Use when starting a new project, updating or adding tasks, logging time, doing the weekly check-in, or setting up curriculum development. Triggers include "create a new project", "mark task 3 as done", "add a task", "log 4 hours", "let's plan next week", "weekly check-in", "what should I prioritize this week", "set up curriculum for [client]", "sync deliverable links", "advance workshop to next phase".
---

# Project & Task Management

Manage projects and tasks through `mh`, the CLI over `operations/tasks.db`. Every project gets a directory and a generated `task-list.md`; contractor-assigned rows also get entries in the Notion Projects and Tasks databases.

## The one rule

**`task-list.md` and `priorities.md` are generated from `operations/tasks.db`. Never edit them by hand.** A hand edit is silently overwritten at the next regeneration, and `mh verify` reports the file as diverged in the meantime. Every write in this skill goes through `./operations/mh`, which regenerates the views it affects in the same call.

Pass `--actor <your name>` on every write. Full command surface: `operations/mh-reference.md`.

Note files under `<project>/task-notes/`, `context.md`, `decisions.md`, and the capacity dashboard and commitment rules at the top of `priorities.md` stay hand-written; the generator copies them through byte for byte.

## When to Use

Use this skill when:
- Starting a new project and need to set up tracking
- Updating the status of existing tasks
- Adding new tasks to an existing project
- Checking project status

Invoke with `/project-tasks` or when the user says things like "create a project for this," "mark task 3 as done," "add a task," or "update the task list."

## Reference Files (when to load)

- **All database IDs and schemas: `references/notion-schemas.md`.** Load it before any Notion read or write (Projects, Tasks, Client Hours, Clients, Workshops, Activities, the Tasks OPEN view, relation link format).
- **Curriculum sub-mode steps and templates: `references/curriculum-templates.md`.** Load it whenever Mode 6 (Curriculum) triggers.
- **The `mh` command surface: `operations/mh-reference.md`.** Generated from the CLI's own parser, so it cannot drift from what the commands accept.

---

## Mode 1: New Project

**Trigger:** User wants to start tracking a new project.

**Creation bar (MQ, 2026-08-18):** create a `task-list.md` when work has multiple related tasks toward one deliverable or end goal, where the tasks matter together rather than individually (a Champions session build; a content series). A single task with its own impact is a one-off in `priorities.md`. Register every new list in `operations/project-registry.md`.

### Steps

1. **Gather project info from the user:**
   - Project name
   - Project type (Business Development, Client, Marketing, Operations, etc.)
   - Priority (HIGH, MEDIUM, LOW)
   - Brief description
   - Initial list of tasks (ask the user, or derive from context)

2. **Create the project directory:**
   - Location: Determine from context (e.g., `marketing/`, `operations/`, `client-and-partner-logos/`, or project root)
   - Directory name: lowercase, hyphenated (e.g., `shadow-funnel`, `transform-conference-prep`)
   - If the project is client work, put it under the client directory

3. **Register the project:**

   ```
   mh project add <key> "<Project Name>" --dir <path> --actor <you>
   ```

   `--goal`, `--owner`, `--due`, `--status`, and `--notion` are available. The key is the short lowercase-hyphenated handle that `key#N` tags use. This creates the project, its generated `task-list.md`, and its registry row in one call. **Do not write `task-list.md` yourself.**

4. **Add the initial tasks:**

   ```
   mh task add <key> "<task title>" --owner MQ --due YYYY-MM-DD --actor <you>
   ```

   One call per task. `--note`, `--load`, `--day`, `--seq` (via `mh task seq`), and `--source` are available. Numbering is assigned by the store; each task gets the next free number in its project.

5. **Only for contractor-assigned tasks, create the Notion rows:**
   - Add a page to the Projects data source with Name, Project Type, Status (In progress), Priority, and Project Description
   - Add each contractor task to the Tasks data source, linked to the project via the Projects relation (format in `references/notion-schemas.md`)
   - Record the returned ids on the store rows so the generated table shows them
   - Mariena's own tasks never go to Notion

6. **Add the `## Goal` and `## Key Decisions` sections** to the generated `task-list.md` if the project needs them. These are hand-written regions the generator copies through; only the task table is generated. Key Decisions holds one-line dated entries; the reasoning, stakeholder input, and open questions live in the project's `context.md`.

7. **Confirm with the user:** Show the project directory, task count, and a link to the Notion project if one was created

---

## Mode 2: Update Tasks

**Trigger:** User wants to change the status of a task, update notes, or modify task details.

### Steps

1. **Find the row.** If you have the tag, use it: `aba-academy#25`. If you have words instead, `mh task find <words>` ranks open tasks by overlap.

2. **Write the change:**

   | Intent | Command |
   |---|---|
   | close it | `mh task done <key#id> --actor <you>` |
   | change status | `mh task status <key#id> <status> --actor <you>` |
   | say what it waits on | `mh task status <key#id> waiting --waiting-on "<who or what>" --actor <you>` |
   | add a note | `mh task note <key#id> "<text>" --actor <you>` |
   | reorder | `mh task seq <key#id> <n> --actor <you>` |

   **The two status vocabularies are different, and so is their spelling.**
   
   | | Values |
   |---|---|
   | **Task** | `backlog` `planned` `in_progress` `waiting` `review` `done` `canceled` (one L) |
   | **Project** | `active` `waiting` `parked` `done` `cancelled` (two Ls) |
   
   Open task statuses are `backlog`, `planned`, `in_progress`, `waiting`, `review`. A task is never `active` or `parked`; a project is never `in_progress` or `review`.

   The one-L / two-L split is real, but the CLI accepts either spelling for a task, along with the wording the markdown uses (`Killed`, `blocked`, `not started`, `in progress`). Write the canonical value where you can; you will not silently write the wrong state if you do not.

   Moving a row off `waiting` clears its reason automatically. `mh task done` prints the row and then the project's next open action.

3. **Only if the task is contractor-assigned:** mirror the status to Notion with `notion-update-page`, using the Notion Task ID shown in the generated table. Mariena's tasks never go to Notion.

4. **Confirm:** Tell the user what changed, and what the CLI reported as next.

### Shorthand the user may use
- "mark task 3 as done" or "task 3 done" = `mh task done <key>#3`
- "block task 5" = `mh task status <key>#5 waiting --waiting-on "..."`
- "cancel task 6" = `mh task status <key>#6 canceled`

---

## Mode 3: Add Tasks

**Trigger:** User wants to add new tasks to an existing project.

### Steps

1. **Identify the project key.** `mh project list` shows every live project with its next action.

2. **Add the task:**

   ```
   mh task add <key> "<title>" --owner MQ --due YYYY-MM-DD --note "<one line>" --actor <you>
   ```

   Numbering is the store's job; do not pick a number. `--load` tags cognitive load, `--day` places it on a day card, `--source` records where it came from, and `--unconfirmed` marks it a proposal rather than a commitment (see Mode 5 and `/capture`).

3. **Only for contractor-assigned tasks:** create the Notion row, link it to the project via the Projects relation, and record the returned id so the generated table shows it.

4. **Confirm:** Tell the user what was added, with the `key#N` tag the CLI printed.

---

## Mode 4: Log Hours

**Trigger:** User wants to log time worked on a project (e.g., "log 4 hours," "track my time," "bill 3 hours to TWG").

### Steps

1. **Gather time entry info from the user:**
   - Hours (required)
   - Date (default: today)
   - Description (required, short summary of work done)
   - Billing: Billable or Non-billable (required)
   - Task (optional, link to a specific task if mentioned)
   - Project and Client are derived from context

2. **Look up IDs:**
   - Find the Client page ID from the Clients data source (IDs and known clients in `references/notion-schemas.md`)
   - Find the Project page ID from the store, via the generated `task-list.md` header or `mh task list <project>`
   - Find the Task page ID if a specific task is mentioned

3. **Create the time entry in Notion:**
   - Add a page to the Client Hours data source with the required fields (field list in `references/notion-schemas.md`)

4. **Confirm:** Tell the user the hours logged, date, billing status, and what it's linked to.

### Shorthand the user may use
- "log 4 hours" = 4 billable hours today on the current project
- "log 2 hours non-billable" = 2 non-billable hours today
- "bill 3 hours to TWG for video editing" = 3 billable hours to TWG with description

---

## Mode 5: Weekly Planning & Prioritization

**Trigger:** End of week check-in, "let's plan next week," "what should I focus on," "weekly priorities," or user asks to update `priorities.md`.

### Steps

1. **Read the generated state. Do not reconstruct it.**
   - Read `operations/projects-dashboard.md` and `operations/tasks.json`: one row per project with its next task, due date, open count, and staleness, plus the milestone table, the directories with no task list, and the skip report. Both are generated from the store.
   - **Run `mh verify` first.** It is non-zero if a generated file was hand-edited or a write skipped regeneration. Fix that before planning, because you are otherwise planning against a picture that does not match the record. `mh regen` is the fix.
   - Then run `mh task next --all` (every project's next open action) for the detail behind the summary.
   - **Never hand-write a cross-project summary.** The dashboard is generated and carries its own timestamp, so staleness is visible. A hand-written copy of project state is the failure this rebuild removed; do not reintroduce one.
   - Read `priorities.md` at the Mellonhead root to see what was planned
   - **Reconcile the STALE block before planning anything.** A frozen row presents its status as current, which is worse than a blank file. For each stale row, first try to resolve it against `priorities.md` (its weekly review sections and `[x] (done YYYY-MM-DD)` markers usually settle it). Only ask Mariena about rows the record genuinely cannot answer, and ask them in one batch.
   - **How "next task" is chosen, settled 2026-08-31.** Among a project's open rows owned by MQ, the earliest due date inside 7 days wins; when nothing is due that soon, the lowest `Seq` wins. `Seq` is the author's intended order; a date someone else is waiting on beats it. The rule has one implementation; never re-implement it elsewhere.
   - When a project is dormant on purpose rather than neglected, `mh project status <key> parked`. It is then reported separately and stops counting against capacity.
   - Cross-reference: identify what's Done, what's still open, and what's new
   - Present a scorecard and ask the user to confirm completions and flag anything missing

2. **Update the Capacity Dashboard:**
   - **Update team capacity:**
     - Jennifer: which 2 task slots is she in? Are either open or about to open?
     - Anushka: which workshop is she on? Is her slot open or about to open?
   - **Update Mariena's Cognitive Budget:** Count deep/medium/shallow items for the coming week from the dashboard's next tasks, its milestone table, `## Backlog`, and the weekly goals
   - **Update the Reactivation Risk table:** Which "Waiting" workstreams could become active? What's the trigger, likelihood, and impact on Mariena?
   - **Check commitment rules:**
     - Are there 3+ deep work items this week? If so, something needs to move.
     - Are Jennifer's or Anushka's slots full? If so, don't commit to new R&D or content timelines.
     - Are 2+ items pending reactivation within 2 weeks? If so, recommend holding 1 deep work day as buffer.
     - Flag if commitment rules suggest not taking new discovery calls.
     - **Is one non-ABA revenue conversation scheduled this week?** A conversation is a live exchange with a prospect, partner, or warm contact that could lead to revenue: a call booked, an outreach message actually sent, a follow-up that asks for a next step. Drafting, scoping docs, and strategy work do not count. If none is on the plan, flag it with the same weight as a Rule 1 violation and ask which one goes in. Pipeline building does not wait for offers to be finished.

3. **Gather inputs for next week:**
   - Check Notion calendar (search for the week's dates) to find meetings. Results will be partial.
   - **Ask the user:** "How many meetings do you have each day next week, and which days are heaviest?" (This is required because calendar search is unreliable.)
   - Ask about any new work, deadlines, or blockers that have come up

4. **Estimate cognitive load for each task:**

   Cognitive load is tagged per task based on what the *specific task* requires, not the category. The same type of work can be deep or shallow depending on whether it requires original thinking vs. assembly from existing material. **Ask the user if you're unsure** rather than inferring from task type alone.

   | Level | Signals | Time | Rule |
   |-------|---------|------|------|
   | **Deep** | Requires original thinking, synthesis, or design judgment. Examples: workshop content dev from research, writing discovery readouts, building new course content, designing scenarios | 4-8 hrs | Max 1 per day. Cannot pair with another deep task. |
   | **Medium** | Time-consuming but cognitively lighter. Execution from known inputs. Examples: video production/editing, document drafting from templates, notebook instructions, pricing/scoping from existing outline | 2-4 hrs | Max 1-2 per day depending on meetings. |
   | **Shallow** | Quick actions, no deep thought. Examples: emails, follow-ups, scheduling, outreach, status updates, documenting from known information | 15-60 min | Can batch. Good for meeting-heavy days. |

5. **Build the weekly plan:**
   - Assign tasks to days based on urgency, dependencies, AND capacity
   - Max 1 deep work block per day
   - Pair shallow tasks together on meeting-heavy days
   - If reactivation risk is high, leave 1 day lightly scheduled as buffer
   - Keep buffer: don't fill every day to 100%
   - Flag if a day looks overloaded
   - **Hold the two named on-the-business days** (Rule 6 in `priorities.md`; MQ 2026-08-17): **Tuesday is outreach, Thursday is content.** Small strategy work rides along on either. Name specific tasks on them, never themes: an outreach day is named people with a per-person message state, a content day is named pieces with their clearance status. Client delivery scheduled into either day is a rule break to name in the proposal, not a judgment call; the failure on record is a named day eaten mid-day by client work that arrived.
   - **Monday-holiday weeks split two and two** (MQ 2026-09-06): two ABA days and two on-the-business days, for that week only (the week of 9/7 ran Tue and Thu ABA, Wed and Fri on the business). Propose the split, say it is the holiday exception, and restore Tuesday-outreach / Thursday-content the following week. Do not argue with the inverted shape as a Rule 6 break.
   - **A `Question:` row is never a day-card item** (MQ 2026-09-06), however urgent. It is a request for a ruling, not work. Surface it around the plan (the generated `## Open questions`, the Slack check-in); when it gates a dated deliverable, say so next to the deliverable ("ships Wednesday, blocked on `key#N`"). The task it blocks gets the day card; the question does not.
   - **Place the week's non-ABA revenue conversation on a specific day** (Rule 8 in `priorities.md`). It is usually Shallow (a send, a booked call, a follow-up with an ask), so it can ride on a meeting-heavy day; the point is that it appears as a dated task, not a backlog item. If the candidate is "send staged outreach," pick the named recipients during planning so execution is mechanical.

   **Placement is a write, so it goes through the CLI:**

   | Intent | Command |
   |---|---|
   | put a row on a day | `mh task plan <key#id> <YYYY-MM-DD> --actor <you>` |
   | take a row back off the week | `mh task plan <key#id> --actor <you>` |
   | tag its cognitive load | `mh task load <key#id> <load> --actor <you>` (`deep`, `medium`, `shallow`, or `none`) |

   Never type a day card into `priorities.md`. The week is generated from these writes.

6. **Present draft plan with effort estimates:**
   - Show each day with tasks tagged as [Deep], [Medium], or [Shallow]
   - Include meeting count per day
   - Include capacity dashboard summary: "X deep items this week, Y days available, Z items could reactivate"
   - Ask: "Does this feel realistic?"

7. **Finalize:**
   - **Read the proposed week rather than writing one.** `mh plan show <monday>` prints the day cards and their state (`unconfirmed`, `proposed`, `locked`). The week in `priorities.md` is generated from the store; do not type into it.
   - **Annotate, don't rewrite.** Where the proposal is wrong, change the underlying row, not the rendered week: `mh task status`, `mh task seq`, `mh task note`, `mh task done`.
   - **Batch the questions.** Start from `mh question list --open --json`: those are already asked and are not asked again. Anything new the record cannot settle becomes a row, `mh question add <key#id> "<text>" --proposed "<your default>" --blocks "<what waits>" --actor <you>`, and the proposal's open-decisions block is the list of ids with their proposed answers, not prose.
   - **Close completed tasks with `mh task done <key#id> --actor <you>`, never by hand.** One command sets the status, clears the `Seq` so a closed row cannot resurface as next, stamps the day-card line, and regenerates every view it touches.
   - **Two stamps, in order, and they mean different things.** `mh plan propose <monday> --notes "<the reasoning>" --actor <you>` says a week has been assembled and is waiting on MQ. `mh plan lock <monday> --actor <you>` says she has accepted it. Propose is yours; **lock is hers**, and you run it only after she says yes. Propose refuses a week that is already locked unless you pass `--force`, which is the right default: re-proposing over a locked week would silently unwind a decision she made.
   - Every day-card line that belongs to a project carries its `key#N` tag; the generator writes it. Untagged lines are one-offs.
   - Archiving the outgoing week to `operations/weeks/YYYY-MM-DD.md` is the generator's job, not a hand move.
   - Notion only for contractor-assigned rows.

### Proposing a week unattended

The Friday 1pm job (`automation/weekly-proposal.sh`) runs Steps 1 through 6, places the rows it is proposing with `mh task plan` and `mh task load`, marks the week with `mh plan propose <monday> --notes "<why this shape>"`, and posts a summary to Slack. **It never locks and never closes a task.** The generated week header carries its own state, so `(proposed YYYY-MM-DD, not confirmed)` is what the Monday nudge looks for.

A proposed week is a draft in the store, not a commitment. MQ moves rows or takes them off with `mh task plan`, and the week becomes real only when she locks it.

Two rules for that path, because nobody is watching it:

- **Say what it could not see.** The job has no calendar, no Gamma, no reading of MQ's intent. Every item that depends on one of those carries a **confirm** marker rather than an assumption presented as fact.
- **Name every rule break in the proposal itself.** A week that breaks Rule 1, 6, 7, or 8 is often the correct week; a week that breaks one silently is not. State which rule, why, and what the alternative would cost.

### Structural changes are coordinated, content changes are not

**`priorities.md` and the `task-list.md` files are outputs.** The store is the source; the generator writes the task tables and the week and copies everything else through byte for byte. A structural change to a generated region does not survive, and a structural change to a hand-written region can break the copy-through.

- **Content changes go through `mh`.** Adding, editing, moving, or closing a row regenerates the views in the same call.
- **Structural changes must be flagged before they are made:** a new or renamed section heading, a change to the day-card line shape, a new column, a different tag format. These are changes to the generator, not to the markdown.

**This has already happened once.** A `### Not this week, deliberately` section was added on 8/31 under `## Weekly Goals`. It was not a day card, not Blocked, not Backlog, so the parser held its previous bucket and filed all four deferred items as **Friday 9/4 commitments**, the exact inverse of the heading. Nothing errored. The section has been dissolved and those items now sit in `## Backlog`, which is where deferred work belongs.

**The rule that follows: deferred work goes to `## Backlog`, never to a new heading.** If a week genuinely needs a bucket the convention below does not have, that is a structural change, so raise it first.

### Priorities File Convention

`priorities.md` lives at the Mellonhead project root and holds the **current week only**; outgoing weeks move to `operations/weeks/`. The week and the day cards are generated; the capacity dashboard and the commitment rules at the top are hand-written and copied through. The header strings below are exact, because the generator writes them and `mh verify` checks them.

```markdown
<!-- section ownership comment -->
# Mellonhead Priorities

## Capacity Dashboard
### Team Capacity
### Mariena's Cognitive Budget
### Reactivation Risk
### Commitment Rules (vX)

## Week of {date} Review

**Week of {Month D, YYYY}**

## Weekly Goals

### {Day} {M/D} | {lane}
- [ ] Task [Deep/Medium/Shallow]: context `key#N`

### Blocked or waiting
- [ ] item, and what it waits on

## Backlog
- [ ] captured or deferred items, tagged `key#N` where they belong to a project
```

There is no Active Projects table. Project state lives in the task-lists and reaches this mode through the generated `operations/projects-dashboard.md`.

A week header carries its state: `(PROPOSED)` when the Friday job wrote it and MQ has not reacted, `(confirmed by MQ YYYY-MM-DD)` once she has. The Monday nudge looks for exactly that difference.

---

## Mode 6: Curriculum

**Trigger:** User is setting up or managing workshop curriculum development. Phrases: "set up curriculum for [client]," "create workshop [ID]," "scope this workshop," "sync deliverable links," or "parse this email for deliverable links."

**Load `references/curriculum-templates.md` for the full steps and templates.** It contains the workshop ID convention, the standard 5-phase task pipeline (Discovery, Scoping, R&D, Content Development, Delivery), and the four sub-modes:

- **Sub-mode A: Initialize Curriculum Project.** Create the project (Mode 1 steps), the Workshop record, Activity records, standard phase tasks, and the local `task-list.md` with a Curriculum section.
- **Sub-mode B: Add Activities.** Create Activity records plus their "Scope Activity" and "Activity R&D" tasks after scoping identifies them.
- **Sub-mode C: Sync Deliverable Links.** Parse pasted emails for deliverable URLs, match them to types, and push them to the Workshop record and `task-list.md`.
- **Sub-mode D: Advance Workshop Status.** When a phase completes, advance the Workshop status per the phase-to-status mapping and update activity statuses.

Curriculum database IDs (Workshops, Activities, Clients): `references/notion-schemas.md`.

---

## Conventions

- **`operations/tasks.db` is the system of record. The markdown is a generated view of it, and Notion is the collaboration surface.** Set 2026-08-17 (local over Notion), extended at Phase 2 cutover (store over markdown), replacing the previous "Notion is the system of record / always sync both directions" rule. That rule described a sync that had already stopped: 16 of 17 `task-list.md` files carried no Notion IDs at all, so Notion reads were returning a months-old picture and every read cost real time. Do not restore two-way sync.
- **What goes in Notion** (write these, keep them current):
  - **Contractor-assigned tasks.** Jennifer primarily, Anushka as applicable. They cannot read this repo, so anything they own must live in Notion with everything they need to act, and no local paths.
  - **Workshops and Activities** databases, and project pages that carry context a contractor needs.
  - **Client Hours and Clients.** No local equivalent exists.
- **What stays local only:** Mariena's own tasks. Do not create Notion tasks for them, and do not query Notion to find out what she is working on. The reason closures stopped happening is that closing required a second write to a system she does not open; removing that second write is what makes closure likely.
- **Never read Notion to establish current state.** Read `operations/projects-dashboard.md` and `operations/tasks.json`, or run `mh task next --all` / `mh project list`.
- **Task numbering** is assigned by the store, sequential within a project and never reused (even if a task is canceled). A task created through the UI or the CLI gets the next free number in its project. `key#N` tags written before cutover all still resolve.
- **There is no `→` next-task marker.** It was retired in favour of the `Seq` column, which the store owns. Do not reintroduce an arrow.
- **Owner, Due, and Seq columns** sit after Notes. Owner is MQ, Orca, Iddy, Fanny, Jennifer, Anushka, or a stakeholder name; Due is `YYYY-MM-DD` or blank; Seq is the author's intended order within the project.
- **Link convention.** A `priorities.md` line that belongs to a project ends with `` `key#N` `` (registry key, row number). No tag means a one-off. The prose form ("Champions task 24") is retired.
- **The local `task-list.md` is the quick-reference file.** It should be readable on its own without Notion access, and readable without SQLite. `mh export` writes `operations/tasks-export.md` as the rollback copy.
- **Run `mh verify` when anything looks off**, and `mh regen` to fix it. Non-zero means a generated file was hand-edited or a write skipped regeneration.
- **After editing any skill or agent file that quotes an `mh` command, run `mh check-skills`.** It parses every quoted invocation with the real parser. A skill naming a command that does not exist fails silently at runtime: the write never lands and nothing says so. Zero problems is the bar.
- **Don't create empty projects.** Every project should have at least one task.
- **Project directory names** are lowercase-hyphenated, descriptive, and stable (don't rename after creation).
- **Ask about Notion page content at task milestones.** When a task is completed or significant work product is generated (files, lists, analysis), ask the user: "Should any of this go into the task page in Notion?" Use `notion-update-page` with `replace_content` to add tables, headings, and structured data to the task page. For large datasets, add a summary or the most important subset and reference the local file path for the full version.
- **Use comments for status workarounds.** The Notion API cannot set statuses in the `in_progress` group (In Progress, On Hold, In Review, Update Required) due to a known bug (notion-mcp-server #232). Use `notion-create-comment` to log the actual status, and flag to the user to update the status field manually in the Notion UI.
