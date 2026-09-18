---
name: do-work
description: Chief-of-Staff sweep across every open in-flight brief and delegation-tagged task-list. Orca reads all briefs, processes MQ feedback and inline answers, dispatches subagents where autonomous progress is possible, updates the worklog and task-lists, and produces a check-in report. Run a few times a day (or on demand) to keep work moving without polling. Triggers include "/do-work", "check-in", "sweep the work", "what can move forward", "any updates to process".
---

# /do-work

Sweep-and-advance across all in-flight Mellonhead work. Orca cycles through open briefs and delegation-tagged items, moves what can be moved, and surfaces what can't.

The default actor is **Orca**. `/do-work` is invocable by Mariena directly ("run do-work"); Orca also fires it implicitly after a `/scope-and-start` mirror step completes and after weekly priorities finalize.

## Core principle

The store is the async communication channel: questions, dispatches, deliveries and reviews are rows, and the brief holds the plan. `/do-work` reads the store for what changed, decides what can move, and moves it. It never greps a brief for an answer.

## When to use

- Manually a few times a day when MQ has added feedback and wants work to advance
- After a `/scope-and-start` mirror step returns MQ's answers
- After weekly priorities finalization (initial sweep)
- Any time an in-flight brief has been updated since last sweep

## Before starting

The default actor is Orca. If this session was not started with `claude --agent orca`, read `.claude/agents/orca.md` now and operate under it for the rest of the run. Do not spawn `orca` through the Agent tool for this: a subagent cannot dispatch or reach the connectors, which defeats the skill.

## Workflow

### Step 1: Read the generated board, then the worklog

**The board comes first, and it is the work lane.** Read `operations/tasks.json` and `operations/projects-dashboard.md`: every open project, its next task, due date, open count, and staleness. Both are generated from `operations/tasks.db`. Then `mh task next --all` for each project's next open action. This is the queue this sweep works from.

**Run `mh verify` before trusting the board.** Non-zero means a generated file was hand-edited or a write skipped regeneration, so the markdown and the store disagree. `mh regen` is the fix. Do not sweep against a diverged record.

Then read `operations/orca-worklog.md` for the narrative the board cannot carry: what was dispatched, what came back, what MQ ruled. **Treat it as a log, not as state.** If its last-updated date is more than 5 days old, rebuild the Current in-flight table from the dashboard before quoting anything in it; a frozen table presented as fact is worse than a blank one. The worklog has gone stale twice while task rows moved underneath it, so check the date every time.

**Two lanes, and this sweep owns one of them.** The **focus lane** is MQ's week: the day cards in `priorities.md`, the Friday proposal, the commitment rules. The **work lane** is every open task across every project, which is what the board shows. `/do-work` reads the board and advances work regardless of whether it appears in MQ's week. **It never writes a day card and never sets what MQ does on a given day.** Concretely: `mh task plan`, `mh plan propose`, and `mh plan lock` are not this sweep's commands. Surfacing something into the week is a backlog proposal, not a placement.

**Every task write here goes through `./operations/mh`**, never a hand edit. `task-list.md` and `priorities.md` are generated from the store; a hand edit is silently overwritten at the next regeneration. Pass `--actor orca` on every write. Command surface: `operations/mh-reference.md`.

| Intent | Command |
|---|---|
| close | `mh task done <key#id> --actor orca` |
| status | `mh task status <key#id> <status> --actor orca` |
| blocked on a person other than MQ | `mh task status <key#id> waiting --waiting-on "<who>" --actor orca` |
| needs MQ to decide | `mh question add <key#id> "<text>" --proposed "<default>" --blocks "<who waits>" --actor orca` |
| what is open on her | `mh question list --open` |
| sent to an agent | `mh task dispatch <key#id> --to <agent> --expect <path> --actor orca` |
| came back from an agent | `mh task deliver <key#id> --artifact <path> --agent <agent> --actor orca` |
| reviewer verdict | `mh task review <key#id> --verdict <verdict> --findings <path> --agent <reviewer> --actor orca` (verdict: `pass`, `pass-with-notes`, `back`) |
| this conversation is on the task | `mh task link <key#id> --actor orca` |
| record what happened | `mh task note <key#id> "<text>" --actor orca` |
| propose new work | `mh task add <project> "<title>" --unconfirmed --actor orca` |
| find the row | `mh task find <words>` |

Note files under `<project>/task-notes/`, briefs, `context.md`, and `decisions.md` stay hand-written.

### Step 2a: For each open brief in the worklog's Current in-flight table

Open every brief file. For each one:

1. **`mh question list --open`** once for the whole sweep, then `mh question list <key#id> --all` per task: what is still open on MQ, and what she answered since the last sweep (answered rows carry who and when).
2. **`mh task list <project> --json`** for the task's `dispatch_ready`, `open_questions` and `open_dispatches`. Dispatch-ready is derived (brief plus no open blocking question); no field in a brief says it.
3. **Compatibility, one release only:** if a brief still carries a filled `**MQ:**` slot under a question that also exists as a row, apply it with `mh question answer <id> "<her text>" --source <brief path> --actor orca` and stop reading that brief's slots. A slot with no matching row is re-raised with `mh question add` if it is still real. Phase D removes this step.
4. **Determine status:**
   - **Can move autonomously**: `dispatch_ready` is true; brief has a defined next step; no client-facing action required
   - **Waiting on MQ**: an open question with `blocks` set
   - **Waiting on team**: {{instructional designer}} / {{researcher}} / {{client lead}} / external needed
   - **Subagent output pending review**: a delegated agent completed and MQ hasn't reviewed
   - **Ready to close**: deliverable shipped and MQ confirmed

### Step 2b-1: Sweep NEW pending session tasks + priorities.md items for what can start

Before checking delegation tags, look at what was ADDED since the last sweep and identify work Orca can start on autonomously:

1. **TaskList sweep.** Any session task in `pending` status added since last sweep timestamp. For each, ask: does it have a brief file? Are inputs available? If yes to both, it belongs in this cycle's "start" queue.
2. **Week sweep.** `mh plan show` for the current week's day cards, plus the unconfirmed and backlog rows in `tasks.json`. Especially watch on-the-business items (Ken updates, outreach sends, positioning drafts) that are shallow-to-medium and drawable from existing context. Read only; this sweep never places work into a day.
3. **New-arrival check for the CoS pattern.** New {{client lead}}-requested proposals, mid-week additions, coach updates, one-pager requests. Do they have enough context to at least sketch a content outline, gather doc, or scope-and-start brief? If yes, start.

**Do not wait for MQ to type "run do-work with the new item."** If work has arrived and has sufficient inputs, Orca starts it and reports what was drafted for MQ review.

### Step 2b-2: Sweep delegation-tagged task-list items across all task-lists

Task rows also carry delegation. Any row whose owner or notes name a specialist (`Iddy`, `general-purpose subagent`, `{{researcher}}`, `{{instructional designer}}`, or similar) is a candidate for dispatch. `mh task list <project> --owner <name>` finds them per project; `tasks.json` carries the same field for a cross-project pass.

For each delegation-tagged item:

1. **Check dispatch state.** An open dispatch in `open_dispatches` (from `mh task list <project> --json`), OR a completed output file at the expected path. If either is present, skip. Note markers are not a signal any more; a `Dispatched` line in an old note is history.
2. **Check prerequisites.** Is the source brief (or inputs the specialist needs) fully ready? MQ mirror questions resolved? Any blockers cleared?
3. **If prerequisites are ready and not yet dispatched:** mark for dispatch in Step 3.

**Tagging is not dispatching.** A previous sweep that tagged an owner does not itself fire the specialist. This step is what closes that gap.

### Step 2c: Sweep for newsletter issues needing a cross-post

Nothing else in this sweep watches Mellonmail, so a published issue with no cross-post drafted is invisible until someone thinks to check. This step is that check, run every cycle rather than on a fixed day, so coverage does not depend on guessing the send day right.

1. **WebFetch `https://subscribe.mellonhead.co/profile/posts`.** Note each post's title, URL, and how long ago it published.
2. **Canonical source location going forward is `marketing/newsletters/<slug>/`** (a folder with `drafts.md`/`planning.md`/`reviews.md`, and `cross-post.md` once built). Two older conventions still hold unmigrated back-catalog: `marketing/newsletters/YYYY-MM-DD-slug.md` (flat file) and the original `ai-champions-content-series/newsletter/N#-slug.md` with drafts in `ai-champions-content-series/cross-post/N#-cross-post.md`. Check all three locations for an existing cross-post file; do not create anything new in the two older patterns.
3. **Match each live, published post to its local source by substance, not string.** A published title routinely differs from the working title (confirmed pattern: N0's file was "What to do after foundational training," published as "Your people are using Copilot as a search engine"; N1 published as "What I missed about getting teams to use AI"; N2 as "What your top performer can't see"). Read the candidate local draft's latest version to confirm before treating it as a match.
4. **A live post with a matched local source and no cross-post file yet is a candidate.** `mh task add content-series "Cross-post the published issue" --owner Mark --note "Live URL and local source path in the task note" --actor orca`, then `mh task note` with the live URL and local source path. Note the row `ready for dispatch (live session or B2)` per the same B1 phrasing used elsewhere in this skill. It is not this sweep's job to dispatch Mark or draft the variations itself: `/cross-post`'s clearance and naming checks are Mark's job, not this sweep's, and Mark is not on the autonomous-dispatch list in Step 3. Surface it; do not build it.
5. **A live post with no local source found at all** gets a question, not a guess: `mh question add content-series "Published issue has no matching local draft" --proposed "Skip until a local source turns up" --blocks "cross-post" --actor orca`, with the title and URL in a follow-up `mh task note`.
6. **Skip anything already covered.** A post with an existing cross-post file, whichever of the three locations it lives in, needs no row.
7. Surface any new row from this step in the Slack post under **Ready to dispatch when you open Orca** (unattended) or the normal "advanced this cycle" framing (live session), same as any other tagged-for-Mark item.

### Step 3: Take autonomous action where possible

For briefs in "Can move autonomously" state AND task-list items ready for dispatch:

**OK to autonomously:**
- Fire read-only subagents (research pulls, audits, cross-file scans)
- **Dispatch tagged specialists (Iddy, Fanny, general-purpose subagents) for items whose prerequisites are ready and where no open dispatch exists.** `mh task link <key#id> --actor orca` first if this conversation has not yet linked the task. Pass the brief file path so the specialist inherits scope, plus the project's `context.md` path when one exists (stakeholder rulings live there); tell it to raise anything it cannot decide with `mh question add`, never inline in the brief.
- Draft refinements for MQ review (in the brief file's Draft section)
- Record status with `mh task status`; the narrative of what happened goes in `mh task note`. Dispatch, delivery and review are their own verbs (below), not notes.
- **Closing a task:** `mh task done <key#id> --actor orca`. One command sets the status, clears the `Seq` so a closed row cannot resurface as next, stamps the day-card line, and regenerates every view it touches. It then prints the project's next open action.
- **Route every returned deliverable through its reviewer before it is marked ready:** `revi-iddy` (instructional design), `revi-mark` (marketing copy), `revi` (everything else). Reviewers are read-only and may run in any tier. Record the verdict: `mh task review <key#id> --verdict <pass|pass-with-notes|back> --findings <path> --agent <reviewer> --actor orca` (a reviewer running as the session records its own). `back` re-dispatches the builder with the findings file; `pass` and `pass-with-notes` move the item to review with the findings file path beside it.
- Move items into the Worklog "Ready for your review" section

**After any dispatch, immediately record it:** `mh task dispatch <key#id> --to <agent> --expect <path> --actor orca`, so the next sweep sees an open dispatch and does not double-fire. **When it returns:** stat the artifact, then `mh task deliver <key#id> --artifact <path> --agent <agent> --actor orca`, which closes the dispatch. Orca records both for subagents (design §8, decision 5); a specialist running as the session records its own delivery.

**After any Gamma publish for a client-facing deliverable, add it to the client's resource index.** For {{client}}, the index is at `course-material/{{client}}/{{client-program}}-Resource-Index.md`.

Auto-add triggers:
- Orca published a Gamma this cycle via `mcp__claude_ai_Gamma__generate`, AND
- The source brief marks the deliverable as client-facing (audience is {{client}} staff, Champions, Steering Committee, or a named {{client}} stakeholder like {{stakeholder names}})

When triggered:
1. Pick the right section by content (Foundations course? Skills course? Champions monthly? Team workshop? Advisory/Policy? Reference?). If no section fits, add a new subsection with a clear name; do not dump into a "Miscellaneous" bucket unless the doc genuinely has no home.
2. Add a link with a one-line description of what the doc is and who it is for.
3. Update the `**Last updated:**` date at the top of the index.
4. Note the addition in the check-in report so MQ can confirm the placement.

Do not auto-add:
- Draft or work-in-progress Gammas that MQ has not yet reviewed for external polish
- Gammas that are pilots not yet formally rolled out (e.g., Office Hours during its Champions-feedback phase; add after Steering Committee sign-off)
- Gammas that are purely internal working tools (worklog, task briefs, agent scaffolds)

**Never autonomous:**
- Send client-facing emails, messages, or files
- Modify strategic content in `priorities.md`, brand assets, or positioning docs
- Place a row on a day (`mh task plan`), propose a week, or lock one. The week belongs to MQ and to the Friday job
- Confirm a proposal on MQ's behalf (`mh task confirm`); an `--unconfirmed` row stays unconfirmed until she keeps it
- Dispatch subagents that require an MQ mirror step to scope (those get flagged for MQ instead)
- Dispatch a specialist for a task whose `dispatch_ready` is false (an open question blocks it, or it has no brief)
- Delete or archive files
- Publish anything externally (Drive uploads that share broadly, Notion updates to client-visible records)

### Step 4: Agent questions become rows

If a working subagent surfaced a question that needs MQ input, it becomes a row, never a line in the brief: `mh question add <key#id> "<text>" --proposed "<what the agent would do>" --blocks "<the agent>" --actor orca`. `question add` refuses a near-duplicate and prints the existing id, which is the "check before creating" rule enforced. If the agent gave no proposed answer, that is the defect to fix before asking: decide the default yourself or send the agent back for it.

### Step 5: Update the worklog

**The history lives in `operations/tasks-audit.log` now**, one line per write with the actor on it, so the worklog no longer has to carry a durable record of what changed. What it keeps is the short rolling narrative the audit log cannot express: what was dispatched and why, what came back, what MQ ruled. Keep it brief and do not restate rows the board already shows.

Rewrite `operations/orca-worklog.md`:

- **Update Current in-flight table** with new statuses / blockers / next steps
- **Waiting on you** is pasted, not written: the output of `mh question list --open`, verbatim, under a line that says so. It cannot drift because it is not prose.
- **Waiting on team** is pasted from `mh task list <project> --json` filtered to `status == waiting` with a `waiting_on`, one line per row, across projects.
- **Ready for your review** is pasted from the same JSON filtered to the last `review` event with verdict `pass` or `pass-with-notes`, with the findings path.
- "The week in one line" and "Rolling check-ins" stay hand-written (design §8, decision 3).
- **Append a new entry to Rolling check-ins** with the sweep timestamp and what changed

Keep the check-in history to the last 10 entries (trim older into a `check-in-archive.md` if needed).

### Step 6: Produce a concise chat report

After the worklog is updated, hand MQ a short chat message:

- What advanced this cycle (1-3 items, most important first)
- What's now waiting on MQ: the top three open questions by what they block, each as `Q<id>`, the question, and the proposed answer, so she can accept from her phone
- What's still stuck on team members (with any suggested nudges)
- Ready for your review (with file paths)
- Ready to close (if any)

Do NOT paste the full worklog into chat. The worklog is the durable source; chat is the recap.

### The report rules (MQ ruling 2026-09-09; these are hard limits, not preferences)

The sweep reports had grown to the point where MQ could not keep up with them, which defeats the purpose of a sweep. **Every rule below removes something the report was doing. None of them are about writing better sentences; they are about not writing the sentence at all.**

**1. Nothing found is one word.** Not a sentence, not an explanation of how you established it.

> ❌ *"Slack DMs: nothing from either of them. The only new message is your own 10:22am answer to {{instructional designer}}; her pointer advanced to it. {{instructional designer}} has not replied yet. {{researcher}} silent since your 11:44am on 9/8, pointer unmoved."*
> ✅ *"Slack: nothing."*

The pointer mechanics, who was checked, when they last spoke, and how the absence was verified are all invisible work. Do it, log it in the worklog, do not report it.

**2. Never list what you did not do.** No roll call of unchanged rows, no *"Not re-asked: aba-academy#34, #32, #31…"*, no "still carried from last time." An item that has not changed does not appear. MQ can read the board when she wants the board.

**3. No compliance footer. Ever.** Delete every line of this shape: *"Verify clean. No day cards touched, plan untouched, nothing confirmed, no Notion, no memory, no email sent or drafted, no DMs."* The standing limits are assumed held; that is what "standing" means. **Report a breach, never adherence.** If a guardrail actually stopped you from doing something MQ would want done, that is a finding and gets one line.

**4. No standing instructions.** Drop *"Reply in this thread with the task id and your answer; the next sweep applies it."* She set up the mechanism. Repeating it every sweep costs a line each time and teaches her nothing.

**5. A finding is a claim plus its consequence. Two sentences, maximum.** The derivation belongs in the file, and the report points at the file.

> ❌ *"The travel line is missing from what you sent. The floor brief recommended in-person delivery at {{day rate}} per day plus {{travel rate}} per travel day plus expenses. The card you sent has no travel or expense line anywhere, and {{prospect}} is UK-based with US clients running through {{contact}}. As quoted, in-person work carries its own travel uncompensated. You said virtual is firm and left in person open, so the {{contact}} call is the natural place to add it. Recorded on outreach#16; not raised as a question row because it is yours to take or leave."*
> ✅ *"Your rate card has no travel line, so in-person work as quoted eats its own travel. The {{contact}} call is the place to add it (`outreach#16`)."*

**6. Colour is not a finding.** *"This is the first facilitation rate you have actually quoted that exists on file"* is an observation about the record, not something she can act on. It goes in the worklog if anywhere.

**Budget: 150 words for the Slack post, hard.** If it does not fit, the answer is fewer items, not shorter sentences: surface the top three and let the worklog hold the rest. A sweep that surfaces one real thing has done its job.

### Step 7: Post to Slack (mandatory)

Every `/do-work` sweep ends with a post to Slack channel `#agent-work-updates` (channel ID `{{slack-channel-id}}`). This gives MQ a phone-scannable update when she is away from the terminal.

Structure the post in standard markdown (the Slack MCP tool converts). Use `**bold**` for section headers, bullets with `•` or `-`.

```
**Orca /do-work update, YYYY-MM-DD HH:MM**

**Ready for your review:**
• [item] → [what's next after your review]

**Waiting on you (top three, by what they block):**
• Q41 [question]. Proposed: [answer]. Blocks [who].

**Waiting on team:**
• [person: item]

**Autonomous work this cycle:**
• [advanced item]
• [closed/killed item]

Full state in `operations/orca-worklog.md`.
```

Guidelines:
- **The report rules above apply to this post in full, and the 150-word cap is on this post.** It is the one MQ actually reads on her phone, so it is the one that has to stay scannable.
- Keep to 6-10 bullets total across sections. This is a scan, not a full report.
- If a section is empty, omit it (do not post empty headers). Do not replace it with a line saying it was empty.
- **A sweep with nothing to surface posts nothing.** A "no change" post is noise that trains her to skim the channel, which costs the one real finding its audience. Silence is a valid sweep result.
- Use file paths, not file URLs; MQ opens files in Obsidian on her laptop.
- Never post client-sensitive names or content to this channel unless it is already public. When in doubt, generalize.

Tool: `mcp__claude_ai_Slack__slack_send_message` with `channelName: "agent-work-updates"` and the drafted post as text.

**Project channels (MQ ruling 2026-09-11, Q6).** Each question this sweep created is also posted once, on its own, to the owning project's Slack channel: `Q<id> [question]. Proposed: [answer].` The channel comes from the `Slack channel` column in `operations/project-registry.md`; read the row for the question's project before posting. Blank means the project has no channel yet, so the question appears only in the `#agent-work-updates` post above, and nothing is posted elsewhere. A channel that is not in that column is one this sweep may not post to. The `#agent-work-updates` post keeps only the top three by what they block; the project channel carries the rest. Post a question to its channel once, in the sweep that created it, never again.

## Brief-file conventions (that `/do-work` depends on)

Every brief file supports these three sections:

- **`## Mariena's Next Actions`** lists open question ids (`- Q41: <text>`). The questions themselves are rows; the brief never carries an answer slot.
- **`## Findings`** and **`## Draft`** are where the work lives; `## Notes for pattern refinement` closes every brief.
- Older briefs may still carry `## MQ Feedback Log`, `**MQ:**` slots and `## Agent Questions`. Step 2a's compatibility rule handles a filled slot once; empty ones are ignored, not read as "waiting".

## Guardrails on autonomous subagent dispatch

Only fire a subagent from `/do-work` if:

1. The brief exists and has a clear next-step defined
2. The subagent's scope is well-bounded and read-only-ish (no client action)
3. MQ has answered any open mirror questions the subagent needs
4. There's a specific output file path the subagent will write to (so `/do-work` can find + review it next cycle)

Otherwise, flag the item for MQ or wait for the next cycle.

## Handback: when to stop and ask MQ

Some situations always halt autonomous action and route to MQ:

- Brief has ambiguity about what MQ actually wants
- A subagent output needs a judgment call MQ owns (voice, positioning, relationship)
- New information changes the scope of the task
- Something failed in an unexpected way (subagent errored, file mismatch, etc.)

In those cases: one `mh question add` with a proposed answer, and the id in the chat recap. The worklog's "Waiting on you" picks it up from the store.

## Frequency

MQ triggers manually a few times a day. No fixed schedule.

- Morning `/do-work`: kick off day's work
- Midday `/do-work`: process any feedback added between meetings
- Evening `/do-work`: close the day, prep tomorrow

Later, a cron can automate this. For now, on demand.

## Related

- `/scope-and-start`: creates the briefs `/do-work` processes
- `/project-tasks`: weekly planning; feeds `/do-work` at plan finalization
- `orca.md`: Orca's playbook; `/do-work` is one of the two standing procedures (the other being `/scope-and-start`)
- `operations/orca-worklog.md`: the durable state file `/do-work` reads and writes
