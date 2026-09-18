# Notion Database IDs and Schemas

All Notion database IDs, data source IDs, view IDs, and schemas used by `/project-tasks`. Load this file before any Notion read or write.

## Projects and Tasks

- **Projects database ID:** `{{projects-database-id}}`
- **Projects data source:** `collection://{{projects-data-source-id}}`
- **Tasks database ID:** `{{tasks-database-id}}`
- **Tasks data source:** `collection://{{tasks-data-source-id}}`
- **Tasks OPEN view (for weekly planning):** `view://{{tasks-open-view-id}}`

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

- **Client Hours database ID:** `{{client-hours-database-id}}`
- **Client Hours data source:** `collection://{{client-hours-data-source-id}}`
- **Clients data source:** `collection://{{clients-data-source-id}}`

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

- **{{client 2}}:** `{{client-page-id}}`
- **{{client}}:** look up from Clients data source

## Curriculum databases

- **Workshops data source:** `collection://{{workshops-data-source-id}}`
- **Activities data source:** `collection://{{activities-data-source-id}}`
- **Clients data source:** `collection://{{clients-data-source-id}}`

## Relation link format

Link a task to a project via the Projects relation: `"[\"https://www.notion.so/{project-id-no-dashes}\"]"`
