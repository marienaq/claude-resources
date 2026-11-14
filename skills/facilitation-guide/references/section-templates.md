# Facilitation Guide Section Templates

Full specifications for each section of a facilitation guide, plus the card system, card sub-types, and cross-card threading conventions. Load this when writing or reviewing any section of a guide.

## 1. Workshop Details

The document header. Contains everything someone needs to understand the workshop at a glance.

**Required fields:**
- **Duration:** Total time (e.g., "2 hours (120 minutes)")
- **Topics:** Activity names listed (e.g., "Email History, Meeting Transcripts, Brief Assessment")
- **Audience:** Team name, function, and composition (e.g., "Member Comms team (editorial, copywriting, and operations)")
- **Manager:** Name
- **AI Champion:** Name
- **Context:** 1-3 sentences on team dynamics, buy-in level, concerns. This is facilitator-facing intel, not participant-facing framing.

**Optional fields:**
- **Day/Time**
- **Format:** Virtual/in-person, platform (Zoom, Teams), group size
- **VP/Leadership present:** Names and roles

---

## 2. Session Arc (Forest View)

The orientation section. Designed for a facilitator who's returning to this guide after a while OR a new facilitator running it for the first time. They need the whole arc at a glance (narrative, structure, activities, cross-cutting notes, and contingencies) without having to scroll through every card.

**Four components:**

### A. Master timeline table

Single table covering every card in the session, one row per named section: section name, slide numbers (filled in the second pass, see Build Mode 1; "No slide" for a demo or any stretch off the deck; the same slide numbers go in parentheses after each section name in the arc paragraph, timing rule, cross-cutting notes and contingencies), mode, time, start to end, lead, and a one-line "what happens." No position numbers (MQ, 2026-09-21: block and card numbers are hard for humans; names are the anchors).

| Section | Slides | Mode | Time | Start–End | Lead | What happens |
|---|---|---|---|---|---|---|
| Open | Slides 1 to 3 | [POLL] | 4 min | 2:00–2:04 | Mariena | "We heard you"; two-question poll; chat prompt |
| Demo | No slide | [DEMO] | 3 min | 2:27–2:30 | Mariena | Build to the first table, from the rehearsed chat by default |
| Test it | No slide, then 9 to 11 | [INDEPENDENT] | 6 min | 2:45–2:51 | Mariena, then Champions | Two words shown once; three tests; the closing line |
| ... | | | | | | |

The "What happens" column emphasizes **what participants actually do**, not just the topic.

### B. The arc, by section

Placed above the master timeline. One short paragraph per named section, in run order, with the section name in bold as the anchor: what it teaches or what participants do, in a sentence or two. Sections that form one movement can share a paragraph ("The build runs in three sections: ..."). This is what a returning facilitator reads to remember the shape, and the names it uses are the names every other part of the guide points to. Emphasizes activities and movement, not topics. *Example: "We open with a chat question that names what's been hard. {{client lead}} picks up those themes and frames the shift we're making. Champions then generate their own work history on a shared whiteboard before seeing the role framework: agency before structure. From there we move into independent Action Plan work: brainstorm, barriers, prioritization, monthly plan. Peer Troika stress-tests the draft. We close with next steps and an interest poll."*

A returning facilitator reads this paragraph and remembers the shape immediately.

### C. Cross-cutting notes (in a `<toggle>`)

Things that touch multiple cards but don't belong in any single card. Examples:
- {{client lead}} owns the recommit framing, Part A of the role calibration, and parts of the work-history whiteboard
- Whiteboard Page 1 is active during the work-history section; Page 2 reveals at its third step
- Pre-work completion rate is assumed at ~30%; session is designed to work for non-doers

Wrap in `<toggle><summary><strong>Cross-cutting notes</strong></summary>...</toggle>` so it's collapsible.

### D. Contingencies (in a `<toggle>`)

What to do if the session drifts off-plan. Examples:
- If the work-history section runs over by more than 3 min: cut the peer troika to 4 min
- If chat is dead in the open: seed with one of the post-it examples
- If a Champion is openly resistant during Role Calibration: name it briefly, move on, don't argue in front of the room

Also collapsible via `<toggle>`.

---

## 3. To Do

Pre-workshop facilitator checklist. Time-sequenced tasks with checkboxes.

**Format:**
```
- [ ] [Day] - [Task description with enough detail to execute]
```

**Examples:**
- [ ] Friday - email run of show to Evan/{{client stakeholder}}, offer to meet Monday
- [ ] Tuesday - Share transcript and briefs with attendees
- [ ] Tuesday - Fwd SBA Debanking thread

Only include items the facilitator owns. Participant prep goes in the Prep Email.

---

## 4. Prep Email

Full email text, ready to send. Include:

- **Send date** (bold header)
- **Subject line**
- **Full body text** with sections for:
  - What we're doing (frame + activity list)
  - Before [day] (Action Required): numbered prep steps
  - Sign-off

**Write it with `/write-learning`.** The prep email is participant-facing copy, not facilitator reference. Invoke `/write-learning` (Mode 6, §7) to draft or review it. Do not hand-write it inside this skill.

**Voice:** Direct, warm, practical. Not corporate. The email should feel like it comes from a person, not a department.

**Rules:**
- Bold "Action Required" for urgency, and only when action is actually required
- List activities with one-line descriptions
- Include specific links, plus a time estimate for every step
- Brief personal sign-off, a name and not a department
- **Never name the authoring tool or a production acronym.** "The online course" not "the Rise module." "Thursday's virtual workshop" not "the VILT." "A reference guide to keep" not "the QRG." Full rule: `/write-learning` §0 and `/writing-guide.md` §9.2

---

## 5. Workshop Structure (Main Body)

The core of the document. One card per atomic unit of the session: each card is a self-contained thing the facilitator does or runs (a chat question, a slide, a breakout, a demo, an independent work block). What used to be "segments inside a section" are now cards in their own right.

### Card Heading Format

```
## Section title · Slide N
```

Examples: `## Build yours · Slide 8`, `## Test it · No slide, then Slides 9 to 11`, `## Demo: building it · No slide`. First pass, before slides exist: `## Build yours` alone.

Cards are named, never numbered by position (MQ, 2026-09-21). The title is the section name used in the F2 arc and timeline, so a cross-reference anywhere in the guide ("take the minutes from the Agents in practice open question") lands on a heading. In the **second pass**, after slides are generated, the heading gains every slide the section uses, and each talking-point heading and timing cue gains the slide on screen (`· Slide 4`, `· No slide`). Use the deck's own naming ("Slide" for PowerPoint, "Card" for Gamma), one convention per guide, the same in headers and in the F2 summary. The second-pass step in Build Mode 1 covers it.

### Card header: the four-pill line

Directly under the card heading, every card carries a row of pills (four in the first pass, five once slides exist), in this order:

1. **Mode pill** (solid, colored, with an icon): the interaction mode (see the mode table below)
2. **Duration pill** (outline): how long the card runs (`3 min`, `~30 sec`, `2.5 min`)
3. **Clock-window pill** (outline): the absolute start to end time (`2:14–2:16`), so the facilitator knows if they're on pace at a glance
4. **Lead pill** (outline): who runs this card (`Lead: Mariena`, `Lead: {{client lead}}`, `Lead: Champions`, `Lead: Mariena setup + Breakouts`)

In markdown source, write the pill line as: `[MODE] · X min · start–end · Lead: Name · Slide N` (the fifth pill arrives in the second pass, same value as the heading suffix: `Slides 1 to 3`, `No slide`, `No slide, then Slides 9 to 11`). In Gamma these become the styled `<label>` pills. The clock window and the named Lead are both required. They're what make the guide usable live and in a two-facilitator room. **Why the slide number is on the pill as well as the heading:** Gamma keeps the pill line intact but strips the `· Slide N` suffix from an `##` heading on import (seen 2026-09-21), so the pill is what survives the render.

### Mode pills: fixed set, one color and icon each

Every card carries exactly one mode pill, drawn from this fixed set. Each mode has a consistent color and Gamma icon so the guide is scannable by "what's the room doing right now":

| Mode | Color | Gamma icon | When |
|---|---|---|---|
| `CHAT` | `#005A8C` | `message-sms` | A free-text chat prompt is running. Facilitator monitors chat, may call out responses. |
| `SLIDES` | `#008095` | `presentation-screen` | Facilitator is on slides, speaking to a deck. Default for talking-point-heavy cards. |
| `DEMO` | `#C0392B` | `screenpal` | Facilitator shares screen and demonstrates a tool, prompt, or workflow live. |
| `INDEPENDENT` | `#B7860B` | `person` | Participants work solo, heads-down, in their own canvas. Facilitator is silent or monitoring. |
| `WHITEBOARD` | `#870833` | `presentation-screen` | Participants add to or vote on a shared Zoom Whiteboard (reveal-and-vote cycles). |
| `BREAKOUT` | `#6B3FA0` | `heart-crack` | Participants are in Zoom breakout rooms (pods, Troikas, pairs). Facilitator rotates or waits in the main room. |
| `POLL` | `#005A8C` | `poll-people` | A structured Zoom poll is running. Facilitator reads results and reacts. |

**The pill names the interaction MODE, not the tool.** If a specific tool is in play (Zoom Whiteboard, a specific slide), name the tool in the stage-direction line under the pills, not in the pill itself. This keeps the mode pill and the Session Arc timeline in sync. An earlier version drifted here, with a card pill reading "whiteboard" while the timeline read `[INDEPENDENT]` for the same card. Don't reintroduce that split.

**Stage-direction line (optional):** Directly under the pills, a single plain sentence describing the physical action ("{{client lead}} shares the Zoom Whiteboard, Page 1, walks the board, then adds her own post-it as a live demo"). This is not a talk track. It sets up what the facilitator is doing before the talking points begin.

When a card legitimately spans two modes (a setup talking point plus a heads-down block), use the **dominant mode** for the pill and call out the shift inside the card. If the two are roughly balanced in time, split into two cards.

### Card components

Each card contains, in order:

1. **Card heading** (`## Title · Slide N`, or `## Title` before slides exist)
2. **Four-pill header** (mode · duration · clock window · Lead)
3. **Stage-direction line** (optional): plain sentence, the physical setup
4. **Body**: the talking points and any activity scaffolds (see below)
5. **Facilitator notes**: a grey callout at the bottom of the card (see "Facilitator notes")

**Body structure.** Sequential talking points are numbered `TP1`, `TP2`, `TP3`, each with its own sub-heading that carries a short time estimate, e.g. `TP1 — Acknowledgment (~1 min)`. Under each TP sub-heading, the spoken lines sit in blockquotes. Parallel content (roles, do/don't contrasts, brainstorm categories, poll options) is unnumbered and laid out as boxed cells rather than TP1/TP2/TP3. In Gamma these render as smart-layout boxes; in markdown, use a bold sub-heading per cell and blockquotes for any spoken lines.

**Talk track: three ways to mark a line.** This is the signature convention of the format, and it's a color/weight distinction, not just quotation:

- **Say this**: spoken content in a blockquote, rendered in brand blue (`#005A8C`). Suggested phrasing; the facilitator hits the intent, not the exact words: `> "OK, pencils down on brainstorm. Take a breath."`
- **Do this (don't say it)**: facilitator directions in **bold plain text**, imperative voice: `**Let the chat fill for 60 to 90 seconds. Read the responses. Don't rush.**` and timer lines like `**6 minutes on the clock. Go.**`
- **Improvise here**: a bracketed insert in grey (`#595959`) inside the spoken line, marking where the facilitator fills in live: `> "I see what's in chat. [{{client lead}} names 2 to 3 specific themes she sees.] Some of this has been hard."`

Heads-down and breakout work always ends on a bold imperative timer line (`**6 minutes on the clock. Go.**`).

**Talking point density:**
- Spoken lines: 1-3 sentences each, conversational rhythm. Intent to hit, not scripts.
- Facilitator directions: 1 line, imperative voice.
- Don't time individual bullets. The card-level metadata carries timing; bullets within the card flow naturally.

### Facilitator notes (grey callout)

Every card ends with a grey callout box, led by a bold **Facilitator notes:** label. It holds the rationale, watch-fors, and "if X then Y" guidance for that card. It's the detail a returning or new facilitator needs, kept visually distinct from the live talk track.

In Gamma this is an `<aside color="#F2F2F2" variant="info">`. In markdown source, write it as:

```markdown
> **Facilitator notes:** TP1 must reference the specific chat themes Champions just dropped. "We haven't done a great job" is the unlock; don't soften it. TP2's "your commitment to yourself, to us, and to your manager" sets up the monthly plan and the closing micro-commitment.
```

If a card genuinely has nothing worth noting, omit the box. The big cross-session contingencies also collect into the global Contingencies grid in the front matter (see the F3 Facilitator Notes card), so a card-level note and a global contingency can intentionally repeat.

---

## Card Sub-Types

The standard card (four-pill header, talk track, grey notes) covers most of the session. A handful of recurring card shapes have their own internal layout:

- **Talking-points card**: numbered `TP1/TP2/TP3`, each with a time estimate in its sub-heading. Used for framing and forward-expectations cards.
- **Setup + demo card**: an "Instructions" block plus a "Live Demo" block; include any tool link both as a hyperlink and as raw "Copy in chat:" text.
- **Independent / heads-down card**: a stage-direction line stating the setup/work split ("Mariena setup ~2 min + Champions brainstorm ~6 min"), then either monitoring-role cells (`🔇 Monitors Silently`, `🚫 No Commentary`) or content scaffolds (brainstorm categories, barrier types), then the bold "N minutes on the clock. Go." timer.
- **Reveal-and-vote cycle card**: two cells: the reveal script and the vote instruction, against a fixed 4-option scale (Achievable / Stretch but Doable / Unrealistic / Disagree).
- **Boundary / contrast card**: a script plus a two-cell `✅ [Role]'s Job` vs `🚫 NOT [Role]'s Job` layout.
- **Mini-teach card**: scoring questions with a bold `Score: X (1–5)` rubric and an italic "Target mix:" line, plus the fixed prioritization vocabulary (Just Try It / Big Bet / Defer).
- **Breakout card**: setup cells, a `Round Structure` table (Time / Phase / Who Speaks), a `Stress-Test Prompts` list, and a pod-count logistics note.
- **Poll card**: the question in a bold blockquote, an emoji-headed cell per option, and closing lines.

---

## Cross-Card Threading

The format is a linked narrative, not a list of independent cards. In the facilitator notes, name what a card **sets up** and what earlier card it **pays off**, by section name: "sets up Show and tell," "that is Test it's job," "the demo does the full WIIFM." The To Do checklist and Contingencies grid also reference cards by name ("if the opening chat is dead", "if short on time, cut the Agents in practice open question"). Never by position number. This threading is what lets a facilitator understand why each card exists and what depends on it. Write it once the section names are stable, which is before slides exist; the slide-number pass does not change it.
