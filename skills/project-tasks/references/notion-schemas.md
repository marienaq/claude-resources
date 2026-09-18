# Notion Database IDs and Schemas

All Notion database IDs, data source IDs, view IDs, and schemas used by `/project-tasks`. Load this file before any Notion read or write.

## Projects and Tasks

- **Projects database ID:** `9cc1ad07-e329-49b8-a05b-5f1673046796`
- **Projects data source:** `collection://c1f3b496-b2f7-485d-9b60-b678d1aa3897`
- **Tasks database ID:** `724b6005-09a7-4e3e-b3f8-99cfdce5c25a`
- **Tasks data source:** `collection://55c3013a-e57a-4ac9-95f4-827418b72f6d`
- **Tasks OPEN view (for weekly planning):** `view://75ce9065-1a4e-4eff-ad9c-bb4d11b9b450`

### Projects Schema (key fields)

| Property | Type | Options |
|----------|------|---------|
| Name | title | |
| Status | status | Not started, On Hold, Ongoing, In progress, Done |
| Priority | select | HIGH, MEDIUM, LOW |
| Project Type | select | School, Personal, Business Development, Finance, Marketing, Client, Operations |
| Project Description | text | |
| Notes from Mariena | text | |
| Owner | person | |
| Companies | relation | |
| Opportunity | relation | |

### Tasks Schema (key fields)

| Property | Type | Options |
|----------|------|---------|
| Task name | title | |
| Status | status | Not Started, Blocked, Done, Canceled |
| Priority | select | 1-High, 2-Medium, 3-Low |
| Task type | select | Task, Deliverable, Content, Content-Subtask, Phase |
| Projects | relation | Link to Projects data source |
| Due | date | |
| Assign | person | |
| AssigneeType | select | Designer, Intern, VA, MQ, Contractor (Learning Expert), Lapis, Diana |
| Notes/Comments | text | |
| Milestone | text | |
| Group | text | |
| Order | text | |
| Parent task | relation | Self-relation for subtasks |
| Subtasks | relation | Self-relation for subtasks |
| Dependencies | relation | Self-relation |

## Client Hours (time logging)

- **Client Hours database ID:** `2216d218-9ed6-8016-8013-dc5194333af9`
- **Client Hours data source:** `collection://27f6d218-9ed6-80a9-9fd7-000b97f2a544`
- **Clients data source:** `collection://ef875432-2cfe-4a89-9025-9879df4fcc5a`

### Time entry fields

| Field | Value |
|-------|-------|
| `Title` | "work" (matches existing convention) or short label |
| `date:Date:start` | ISO-8601 date |
| `Hours` | number |
| `Description` | text summary |
| `Billing` | "Billable" or "Non-billable" |
| `Client` | `"https://www.notion.so/{client-page-id}"` |
| `Project` | `"https://www.notion.so/{project-page-id}"` (if available) |
| `Task` | `"https://www.notion.so/{task-page-id}"` (if available) |

### Known Client IDs (for quick reference)

- **TWG:** `1a06d218-9ed6-8088-877f-fdc43b345e2e`
- **ABA:** look up from Clients data source

## Curriculum databases

- **Workshops data source:** `collection://2209276d-9af2-45e9-b276-63e19e5ce51c`
- **Activities data source:** `collection://064c7238-02b4-4838-aaaa-14dd3eddf024`
- **Clients data source:** `collection://ef875432-2cfe-4a89-9025-9879df4fcc5a`

## Relation link format

Link a task to a project via the Projects relation: `"[\"https://www.notion.so/{project-id-no-dashes}\"]"`
