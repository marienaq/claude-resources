# Curriculum Pipeline Templates (Mode 6)

Full sub-mode steps and templates for `/project-tasks` Mode 6 (Curriculum). Database IDs and schemas: `references/notion-schemas.md`.

## Workshop ID Convention

Format: `{TEAM}-{N}` (all caps shorthand of team/role name + sequential number)
Examples: `CHIEFS-1`, `MC-1`, `OVERHEAD-2`, `AGENTS-1`

## Standard Phases & Tasks

Every workshop development project follows this pipeline. Tasks are created in this order and grouped by phase.

| Phase | Task Name | Task Type | Multiplies? |
|-------|-----------|-----------|-------------|
| **Discovery** | Schedule Discovery session | Task | No |
| **Discovery** | Produce Discovery Readout | Deliverable | No |
| **Scoping** | Agree on initial workshops & activities | Task | No |
| **Scoping** | Scope Activity: {Activity Name} | Task | x each activity |
| **R&D** | Activity R&D: {Activity Name} | Task | x each activity |
| **Content Development** | Create slides | Content | No |
| **Content Development** | Create facilitation guide | Content | No |
| **Content Development** | Create QRG | Content | No |
| **Delivery** | Schedule training | Task | No |
| **Delivery** | Send pre-workshop email | Task | No |
| **Delivery** | Send post-workshop survey | Task | No |

Task fields:
- **Group:** Phase name (Discovery, Scoping, R&D, Content Development, Delivery)
- **Order:** Sequential within the phase (e.g., "1", "2", "3")
- **Projects:** Link to the project
- **Priority:** Default 2-Medium unless user specifies

## Sub-mode A: Initialize Curriculum Project

**When:** Starting workshop development for a client from scratch (before or after discovery).

**Steps:**

1. **Gather info:**
   - Client name (look up Client page ID from Clients data source)
   - Program type (Role-Based Workshops, Foundational AI, Ways of Working, AI Champions)
   - Workshop name and ID (e.g., "Creating Documents & Content", ID: `CHIEFS-1`)
   - Activities (if known; can be added later via Sub-mode B)
   - Which phase are we starting in? (Default: Discovery)

2. **Create the project in Notion** (if not already tracked):
   - Use Mode 1 steps to create a Project entry of type "Client"
   - Link to the Client via Companies relation

3. **Create the Workshop in Notion:**
   - Add a page to the Workshops data source with:
     - `Name`: Workshop name
     - `userDefined:ID`: Workshop ID (e.g., `CHIEFS-1`)
     - `Client`: Link to client page URL
     - `Program`: Program type
     - `Status`: Map from current phase (Discovery/Scoping = "Scoping Required", R&D = "In R&D", Content Development = "In Instructional Design")
     - `Project`: Link to project page URL
   - Capture the returned Workshop page ID

4. **Create Activities in Notion** (if activities are known):
   - For each activity, add a page to the Activities data source with:
     - `Name`: Activity name
     - `Workshops`: Link to workshop page URL
     - `Project`: Link to project page URL
     - `Activity Status`: "Not started"
     - `Tools`, `Topics`, `Duration`: Set if known
   - Capture each returned Activity page ID

5. **Create standard tasks in Notion:**
   - Create all tasks for the current and prior phases (mark prior phases as Done if already complete)
   - For per-activity tasks (Scope Activity, Activity R&D), create one per known activity
   - Set Group = phase name, Order = sequence within phase
   - Link each task to the project

6. **Create local `task-list.md`** (or update existing one):
   - Include a Curriculum section with workshop and activity IDs:

```markdown
# {Project Name} Task List

**Notion Project ID:** `{notion-project-id}`

## Goal
{Goal description}

## Curriculum

| Workshop | ID | Notion Workshop ID | Status |
|----------|----|--------------------|--------|
| {name} | {TEAM-N} | `{notion-id}` | {status} |

### Activities: {Workshop ID}

| Activity | Notion Activity ID | Status |
|----------|-------------------|--------|
| {name} | `{notion-id}` | Not started |

## Tasks

| # | Phase | Task | Status | Notion Task ID | Notes |
|---|-------|------|--------|----------------|-------|
| 1 | Discovery | Schedule Discovery session | Not started | `{id}` | |
| 2 | Discovery | Produce Discovery Readout | Not started | `{id}` | |
| 3 | Scoping | Agree on initial workshops & activities | Not started | `{id}` | |
...

## Key Decisions
- {decisions}
```

7. **Confirm:** Show the user what was created with counts and links.

## Sub-mode B: Add Activities

**When:** Activities are identified during scoping (e.g., after "Agree on initial workshops & activities" is done).

**Steps:**

1. **Read `task-list.md`** to get Workshop and Project Notion IDs

2. **For each new activity:**
   - Create Activity in Notion Activities data source, linked to Workshop and Project
   - Create "Scope Activity: {name}" task (Group: Scoping)
   - Create "Activity R&D: {name}" task (Group: R&D)
   - Update local task-list.md with new activity row and new task rows

3. **Update Workshop in Notion:**
   - The Activities relation auto-updates via the two-way relation

4. **Confirm:** Show activities added and task count increase

## Sub-mode C: Sync Deliverable Links

**When:** Deliverables are complete and user wants to push links to Notion. Often triggered by pasting an email sent to the client for review.

**Steps:**

1. **Parse the input:**
   - If the user pastes an email, extract URLs and match them to deliverable types:
     - Google Slides / PowerPoint links = Presentation
     - Google Docs with "facilitation" or "guide" = Facilitation Guide
     - Google Docs with "resource" or "QRG" or "reference" = Resource Guide
     - Survey links (Google Forms, Typeform, etc.) = Survey Results
   - If ambiguous, ask the user to confirm which is which

2. **Read `task-list.md`** to get the Workshop Notion ID

3. **Update the Workshop in Notion** using `notion-update-page`:
   - Set `Facilitation Guide`, `Presentation`, `Resource Guide`, and/or `Survey Results` URL fields

4. **Update `task-list.md`:** Add a Deliverables section or update it:

```markdown
## Deliverables: {Workshop ID}

| Type | URL | Synced to Notion |
|------|-----|-----------------|
| Slides | {url} | Yes |
| Facilitation Guide | {url} | Yes |
| QRG | {url} | Yes |
```

5. **Optionally mark Content Development tasks as Done** if the user confirms the deliverables are final

## Sub-mode D: Advance Workshop Status

**When:** A phase is complete and the workshop status should advance in Notion.

**Phase-to-Status mapping:**

| When this phase completes... | Set Workshop Status to... |
|------------------------------|--------------------------|
| Discovery | Scoping Required |
| Scoping | In R&D |
| R&D | In Instructional Design |
| Content Development | Ready for Review |
| Delivery (training scheduled) | Scheduled |
| Delivery (survey sent) | Completed |

**Steps:**

1. Check if all tasks in the completing phase are Done
2. Update Workshop Status in Notion
3. Update Activity Status for each activity if moving past R&D (set to "Complete" when R&D task is Done)
4. Update local task-list.md curriculum table with new status
5. Notify the user of the phase transition
