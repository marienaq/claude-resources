# claude-resources

My personal collection of [Claude Code](https://claude.com/claude-code) skills, slash commands, and agents.

## Layout

```
skills/     one folder per skill, each with a SKILL.md (+ optional references/, scripts/)
commands/   slash commands (single .md files)
agents/     agent definitions
docs/       notes and brainstorms
```

## Install

Symlink what you want into your Claude Code config so it loads globally:

```sh
git clone https://github.com/marienaq/claude-resources ~/Projects/claude
cd ~/Projects/claude

for s in skills/*/;   do ln -sfn "$PWD/$s" ~/.claude/skills/$(basename "$s"); done
for c in commands/*.md; do ln -sf  "$PWD/$c" ~/.claude/commands/;               done
for a in agents/*.md;   do ln -sf  "$PWD/$a" ~/.claude/agents/;                 done
```

Or copy a single skill folder into `.claude/skills/` inside a project.

Placeholders like `{{client}}`, `{{your email}}` or `{{drive-file-id}}` mark spots where a skill or agent was written against my own clients, contacts, and tooling. Fill in your own, or strip the section.

Many of these were built for a solo consulting practice (AI education workshops) and reference each other, a `mh` task CLI, and a Notion/Slack/Drive setup. Treat them as worked examples to adapt rather than drop-in tools.

## Skills

- **agent-spec** — Decides whether a new capability belongs in an existing skill, a new skill, a new agent, or the store and dashboard, then writes the spec an
- **ai-tip-writer** — Writes AI tip-of-the-week content for ongoing client series (ABA all-staff forum, future clients; HumanGood is a past-client reference imple
- **call-assessment** — Assesses how well Mariena explained Mellonhead on a sales/BD call: a scored review of her messaging and positioning delivery against the can
- **capture** — Process a transcript or raw notes from any conversation (recurring internal meeting, prospecting/sales/BD call, discovery call, or an ad-hoc
- **copilot-instructions** — Writes instructions for Microsoft Copilot declarative agents and Copilot notebooks. Covers the full declarative agent structure (purpose, gu
- **cross-post** — Turns one published or near-final newsletter issue into variations for distribution channels beyond the email edition: the LinkedIn newslett
- **curriculum-update** — Updates a course that is already built and live when its source of truth changes (a revised policy, a new legal ruling, a stakeholder decisi
- **discovery-session-analyzer** — Transform meeting transcripts into structured AI opportunity readouts with clear identification of information gaps
- **do-work** — Chief-of-Staff sweep across every open in-flight brief and delegation-tagged task-list. Orca reads all briefs, processes MQ feedback and inl
- **facilitation-guide** — Writes facilitation guides for hands-on AI workshops, the facilitator's complete reference for running each section with talking points, tim
- **grill-me** — Pressure-test a new project idea before building it. Use when the user shares a project/product/feature idea and wants it challenged — to su
- **infographic** — Designs viral-worthy infographics using Vincent Pierri's 4-step validation framework (Real Pain Point, Immediately Actionable, Less Saturate
- **jd-brief** — Turns a job description for an AI enablement / adoption / champions role into a screened, researched prospect brief Mariena can write an out
- **marketing-writer** — Writes AND reviews marketing content in Mariena's voice for Mellonhead: LinkedIn posts, newsletters, conference promos, website copy, speaki
- **pdf-form-filler** — Fill out a PDF form (applications, contracts, intake forms, registrations). Reads the form to detect its fields, gathers what it can from pr
- **presentation-writer** — Writes workshop slide content matching Mellonhead's presentation DNA, covering slide taxonomy, activity arc sequences, density rules, voice,
- **project-kickoff** — Turns a project idea plus already-gathered context into a Notion project page that works as a shareable context hub, holding the background,
- **project-tasks** — Manages projects and tasks through the mh CLI against operations/tasks.db, with task-list.md and priorities.md generated from it and Notion 
- **proposal** — Analyzes client needs, qualifies deals, designs packages, and builds AI education proposals for Mellonhead prospects, grounded in Ken Yarmos
- **qrg-writer** — Writes Quick Reference Guide (QRG) content for role-based AI resources, the leave-behind reference documents participants use after a worksh
- **quality-scorecard** — Evaluates research materials using a systematic 4-step quality assessment (standards compliance, pitfall detection, checklist validation, pl
- **rise-code-block** — Builds custom interactive HTML/CSS/JavaScript code blocks for Articulate Rise 360 when native block types cannot support the interaction, su
- **scenario-design** — Designs and refines scenario-based learning activities where learners practice judgment, not pattern-matching. Covers pressure-testing scena
- **scope-and-start** — Structured Chief-of-Staff workflow for turning an executive ask into scoped, executable work. Mirror requirements, three-way assessment (do 
- **session-brief** — Interview a subject-matter expert to define what a session or course should teach, and build a living scoping brief. Use at the very start o
- **session-design-review** — Critiques and pressure-tests draft session designs (workshops, training sessions, facilitated meetings) so each moment earns its place and p
- **ss** — View the most recent screenshot from the Desktop
- **video-script** — Writes video scripts for educational how-to videos and feature overviews. Two modes: prompts for AI video editors (Cluso) that enhance short
- **write-learning** — Writes and refines language for learning resources in Mariena's voice: online courses, knowledge checks, course introductions, catalog cours

## Agents

- **casey** — Casey, Mellonhead's case study agent. Owns client case studies end-to-end, from angle and metrics through interviews, drafting, modular cuts
- **cody** — Cody, Mellonhead's event copywriter. Writes the operational copy for invite-only events: invitations at every relationship distance, registr
- **devi** — Devi, Mellonhead's toolkit developer. Owns the agents, skills, hooks, automation and memory that Mariena works with, and the skill-side use 
- **iddy** — Iddy, Mellonhead's instructional-designer agent. Builds structured-workshop deliverables (facilitation guide, slides, QRG) from a final brie
- **mark** — Mark, Mellonhead's marketing agent. Writes and reviews marketing content in Mariena's voice (LinkedIn posts, newsletters, website copy, comm
- **orca** — Orca, Mellonhead's Chief of Staff agent. Takes asks from Mariena, uses /scope-and-start to align requirements and decide whether to do, dele
- **revi-iddy** — Revi-Iddy, Mellonhead's instructional-design reviewer. Reviews ID work (course scope and objectives, test plans, session briefs, facilitatio
- **revi-mark** — Revi-Mark, Mellonhead's marketing reviewer. Takes a critical second look at marketing copy written by Mark or by Mariena (LinkedIn posts, ne
- **revi** — Revi, Mellonhead's general reviewer. Checks any non-ID, non-marketing deliverable before Orca surfaces it to Mariena: research outputs, brie
- **scout** — Scout, Mellonhead's business-development researcher. Owns the Discovery and BD lane's research: prospect and target-list research for outrea
