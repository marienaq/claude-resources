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

Single table covering every card in the session: card number (filled in second pass, see Build Mode 1), mode, time, start to end, lead, and a one-line "what happens."

| # | Card | Mode | Time | Start–End | Lead | What happens |
|---|---|---|---|---|---|---|
| 1 | Opening + chat question | [CHAT] | 3 min | 2:00–2:03 | Mariena | Welcome + chat question on hardest part of being a Champion |
| 2 | Acknowledgment + recommit framing | [SLIDES] | 5 min | 2:03–2:08 | {{client lead}} | Pick up chat themes + frame the manager-in-the-loop shift |
| ... | | | | | | |

The "What happens" column emphasizes **what participants actually do**, not just the topic.

### B. Narrative arc paragraph

A short prose paragraph (3-5 sentences) that walks through the session's narrative arc. Emphasizes activities and movement, not topics. *Example: "We open with a chat question that names what's been hard. {{client lead}} picks up those themes and frames the shift we're making. Champions then generate their own work history on a shared whiteboard before seeing the role framework: agency before structure. From there we move into independent Action Plan work: brainstorm, barriers, prioritization, monthly plan. Peer Troika stress-tests the draft. We close with next steps and an interest poll."*

A returning facilitator reads this paragraph and remembers the shape immediately.

### C. Cross-cutting notes (in a `<toggle>`)

Things that touch multiple cards but don't belong in any single card. Examples:
- {{client lead}} owns Cards 2, 5 (Part A), and parts of 4
- Whiteboard Page 1 is active during Card 4; Page 2 reveals at Card 4 Step 3
- Pre-work completion rate is assumed at ~30%; session is designed to work for non-doers

Wrap in `<toggle><summary><strong>Cross-cutting notes</strong></summary>...</toggle>` so it's collapsible.

### D. Contingencies (in a `<toggle>`)

What to do if the session drifts off-plan. Examples:
- If Card 4 runs over by more than 3 min: cut Card 11d to 4 min
- If chat is dead in Card 1: seed with one of the post-it examples
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
## Card N: Card title
```

Example: `## Card 7: Phase 2 Barriers (Independent Work)`

The card number (`N`) is filled in during the **second pass**, after slides are generated, so card numbers can match the slide deck numbering. In the first pass, write cards as `## Card: Title` (no number). The second-pass step in Build Mode 1 covers numbering.

### Card header: the four-pill line

Directly under the card heading, every card carries a row of exactly four pills, in this order:

1. **Mode pill** (solid, colored, with an icon): the interaction mode (see the mode table below)
2. **Duration pill** (outline): how long the card runs (`3 min`, `~30 sec`, `2.5 min`)
3. **Clock-window pill** (outline): the absolute start to end time (`2:14–2:16`), so the facilitator knows if they're on pace at a glance
4. **Lead pill** (outline): who runs this card (`Lead: Mariena`, `Lead: {{client lead}}`, `Lead: Champions`, `Lead: Mariena setup + Breakouts`)

In markdown source, write the pill line as: `[MODE] · X min · start–end · Lead: Name`. In Gamma these become the styled `<label>` pills. The clock window and the named Lead are both required. They're what make the guide usable live and in a two-facilitator room.

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

1. **Card heading** (`## Card N: Title`)
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
> **Facilitator notes:** TP1 must reference the specific chat themes Champions just dropped. "We haven't done a great job" is the unlock; don't soften it. TP2's "your commitment to yourself, to us, and to your manager" sets up Cards 14 and 21.
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

The format is a linked narrative, not a list of independent cards. In the facilitator notes, name what a card **sets up** and what earlier card it **pays off**, by number: "sets up Cards 14 and 21," "that's Card 13's job," "Card 20 does the full WIIFM." The To Do checklist and Contingencies grid also reference cards by number ("Dead Chat (Card 1)", "if short on time, cut Card 23"). This threading is what lets a facilitator understand why each card exists and what depends on it. Write it during the numbering pass, once card numbers are stable.
