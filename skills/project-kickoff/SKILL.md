---
name: project-kickoff
description: Turns a project idea plus already-gathered context into a Notion project page that works as a shareable context hub, holding the background, scope, research, reference links (Zoom recordings, transcripts, docs), and people, ready to hand to a collaborator without a meeting. Use when starting a new project and capturing what is known, preserving in-conversation research as project context, or preparing a clean handoff page. Triggers include "kick off a project for this", "capture this context in a Notion project so I can share it with {{researcher}}", "set up a project hub for [topic]".
---

# Project Kickoff

Turn a project idea plus the context you've already gathered into a Notion project that works as a **shareable context hub**: a page whose body holds the background, scope, research, reference links (Zoom recordings, transcripts, docs), and people, structured so you can hand it to a collaborator (e.g., {{researcher}}) and they have everything they need without a meeting.

## When to Use

Use this skill when:
- You're starting a new project and want to capture what you already know into one place
- You've done research in a conversation or in files and want it preserved as project context (e.g., the Zoom transcript integration research from a chat)
- You need to hand a project off to a partner or teammate and want a clean, self-contained page to share
- You have reference material (recording links, transcripts, external docs) that should live with the project

Invoke with `/project-kickoff` or when the user says things like "kick off a project for this," "capture this context in a Notion project so I can share it with {{researcher}}," or "set up a project hub for [topic]."

---

## Relationship to /project-tasks (distinct jobs, do not overlap)

| Skill | Owns |
|-------|------|
| `/project-tasks` | The **tracking mechanics**: the Projects/Tasks DB records, statuses, `task-list.md` sync, hours, weekly planning. |
| `/project-kickoff` (this) | The **context hub + handoff**: the Notion page *body* (background, scope, research, links, people) and preparing it to share. |

This skill **reuses** `/project-tasks` conventions for the record itself: same Projects database, same schema, same local `task-list.md`, and adds the context body on top. When the kickoff calls for initial tasks, create them using the `/project-tasks` Mode 1 steps rather than reinventing them here. Read `.claude/skills/project-tasks/SKILL.md` for the record/task mechanics.

The Notion page is the **shareable** hub; the repo keeps its own record. When the kickoff gathered real context (stakeholder input, decisions with reasoning, constraints, open questions), also seed a `context.md` in the project's directory with it. That file, not the Notion body, is what sessions and agents read when working in the directory (convention: `.claude/skills/capture/SKILL.md`, "The `context.md` convention").

The one-call efficiency: `notion-create-pages` accepts both `properties` (the record fields) and `content` (Notion-flavored Markdown for the page body). So the project record and the full kickoff body are created together in a single call.

---

## Notion Database References

Same as `/project-tasks`:
- **Projects database ID:** `{{projects-database-id}}`
- **Projects data source:** `collection://{{projects-data-source-id}}`
- **Tasks data source:** `collection://{{tasks-data-source-id}}`

Projects schema key fields: `Name` (title), `Status` (Not started / In progress / Ongoing / On Hold / Done), `Priority` (HIGH/MEDIUM/LOW), `Project Type` (School / Personal / Business Development / Finance / Marketing / Client / Operations), `Project Description` (text), `Notes from Mariena` (text), `Owner` (person). Full schema is in `.claude/skills/project-tasks/references/notion-schemas.md`.

---

## The Kickoff Flow

### 1. Gather what's known

Pull context from three sources, in this order:
- **The current conversation**: research, decisions, and findings already produced in the session (this is the common trigger: "capture *this*"). Summarize it faithfully; don't re-derive.
- **Project files**: anything relevant already in the repo (related directories, prior notes, memory files).
- **The user**: fill gaps by asking, but only for what you can't infer. Keep it light; the point is to capture, not interrogate.

Confirm the essentials before creating anything:
- Project name and where it lives (directory + Project Type)
- Priority
- Who it's being shared with (the collaborator, named in the body, e.g., {{researcher}})

### 2. Draft the page body (show the user before creating)

Assemble the body from the template below. **Present the draft to the user for review before writing to Notion.** This is a handoff artifact, so the language matters. Cut sections that don't apply; never pad with empty headers.

### 3. Create the project record + body in one call

Use `notion-create-pages` with:
- `parent`: `{ "type": "data_source_id", "data_source_id": "{{projects-data-source-id}}" }`
- `properties`: `Name`, `Project Type`, `Status` ("In progress"), `Priority`, `Project Description` (a one-to-two sentence summary; the body holds the detail)
- `content`: the full kickoff body (Markdown from the template)
- `icon`: an emoji that fits the project (optional but nice for a shared page)

Capture the returned Notion page ID.

> Notion body content is **Notion-flavored Markdown**. Standard headings (`##`), bullets, numbered lists, tables, links (`[text](url)`), and callouts (`> `) all work. For anything fancier (toggles, columns, embeds), read the MCP resource `notion://docs/enhanced-markdown-spec` first. Do not guess block syntax.

### 4. Write the local mirror

Create the project directory (lowercase-hyphenated; under the client dir if it's client work) and write two files:
- **`kickoff.md`**: the source of truth for the page body. Same content you sent to Notion, so it's editable locally and re-syncable.
- **`task-list.md`**: the `/project-tasks` tracking file, with the Notion Project ID embedded. Create initial tasks per `/project-tasks` Mode 1 only if the kickoff surfaced concrete next steps worth tracking; otherwise leave the task table empty with a note.

### 5. Prepare the handoff

The API can't reliably manage Notion page permissions, so **sharing is a manual step the user takes in the Notion UI.** Close by giving the user:
- The Notion page link
- A one-line "ready to share with [collaborator]" confirmation
- A reminder to click **Share** in Notion and add the collaborator (and to check any Zoom recording links are set to the right visibility for that person)

If the user wants the collaborator tagged on the record, set the `Owner` (person) property, but default to body-only + manual share unless asked.

---

## Kickoff Page Body Template

Use these sections in this order. Drop any that don't apply.

```markdown
> **Kickoff context for [collaborator, e.g. {{researcher}}].** Everything you need to get up to speed on this project is on this page. Last updated [date].

## Background & Goal
[Why this project exists, what prompted it, and the goal in one short paragraph. Who it's for.]

## Scope
Workshops or problem areas identified so far:
- **[Area / workshop 1]**: [one line on what it covers or the problem it addresses]
- **[Area / workshop 2]**: [one line]

What's explicitly out of scope (if known): [so a collaborator doesn't chase the wrong thing]

## Research & Findings
[The substance already worked out. Capture it faithfully from the conversation or files,
e.g., "How to pull Zoom transcripts via API / MCP / connector." Use subheadings and
bullets so it's skimmable. Include the reasoning and any caveats, not just conclusions.]

## Reference Links
| Resource | Link | Type | Notes |
|----------|------|------|-------|
| [Kickoff call recording] | [url] | Zoom recording | [date, who's on it] |
| [Transcript] | [url] | Transcript | |
| [Related doc] | [url] | Doc | |

## People & Next Steps
**People**
- [Name]: [role on this project]
- [Collaborator, e.g. {{researcher}}]: [what they're being brought in to do]

**Open questions**
- [Anything unresolved a collaborator should know]

**Next steps**
1. [First concrete action]
2. [Second]
```

### Reference Links: capturing Zoom recordings

Zoom recording and transcript links are a first-class part of a kickoff. When the user provides them (or when a recording exists for the kickoff call):
- Put each in the Reference Links table with a clear **Type** (`Zoom recording` vs `Transcript`) and a note (date, participants).
- If the user wants transcripts pulled programmatically later, note the mechanism in the body: Zoom's Cloud Recording API returns transcripts as VTT files, the official Zoom MCP connector exposes `get_transcript`/`get_recording`, and a Power Automate Zoom connector can land them in M365. Transcripts only exist if the meeting was cloud-recorded with transcription enabled.
- Flag visibility: a recording link is only useful to the collaborator if they have access. Remind the user to check sharing on the Zoom side too.

---

## Adding to an existing kickoff

If the project already has a `kickoff.md` and Notion page (from a prior run), don't recreate it:
1. Read the local `kickoff.md` to get the Notion Project ID and current structure.
2. Draft the addition (new research, new links, updated scope) and show the user.
3. Update Notion with `notion-update-page`. Prefer `insert_content` (append/prepend) or `update_content` (targeted search-replace) over a full `replace_content`.
4. Update the local `kickoff.md` to match. Bump the "Last updated" line.

---

## Quality Checks

- **Self-contained:** a collaborator could read the page cold and understand the project without asking you a question. That's the bar for a handoff page.
- **Faithful capture:** research and findings reflect what was actually established (in the conversation or files), not a fabricated or inflated version.
- **Scope is honest:** what's in and what's out are both stated when known, so the collaborator doesn't chase the wrong thing.
- **Links work and are accessible:** every reference link resolves, and Zoom recordings are shared to the right people.
- **Local mirrors Notion:** `kickoff.md` matches the page body; `task-list.md` has the Notion Project ID.
- **Distinct from tracking:** this page is context, not a task tracker. Tasks live in the Tasks DB via `/project-tasks`.
- **Sharing is the user's step:** you prepared the page; the user clicks Share in Notion. Don't claim you shared it.
- **Voice:** follow `/writing-guide.md`: plain language, no em dashes, no jargon category-words.
