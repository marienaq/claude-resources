# QRG Section Specifications

Full specs for the seven standard sections of every QRG activity section, plus the cover page. Load before writing any activity section. Custom blocks (section 8) have their own file: `references/custom-blocks.md`.

---

## Cover Page

Every QRG starts with a cover page containing:

1. **Series label** (h4, bold, teal): "Group AI Resource"
2. **Title** (large): "AI for [Role/Team]"
3. **Red horizontal rule**
4. **Description** (always the same): "This resource provides guidance on how to use AI. Each section covers the technique, sample prompts, and guidance for getting reliable results."
5. **Two gray cards side by side:**
   - **Left: "How to Use This Resource"**: lists the section types with bold labels + short descriptions
   - **Right: "Core principles"**: 3 concise bullets. Universal across resources unless there's a reason to customize.
6. **"Included:"**: linked list of activities using the format **Title:** short explanation. The title is the activity name. The explanation (a few words after the colon) tells the reader what the activity actually teaches, specific enough that they can remember which section to revisit. Avoid abstract titles that don't help the reader connect back to the technique.

**Default Core Principles:**
- Start with intent, not the tool
- Treat AI output as a draft
- Validate results based on how they'll be used

**Default "How to Use This Resource" section types:**
- **Why it matters:** When this capability is valuable
- **Approach:** What tool and prompting techniques to use
- **Sample prompts:** Starting points you can adapt
- **Pro tips:** Practical advice for better results
- **Limitations:** What AI can and can't do well
- **Refining your results:** Suggestions to improve results

---

## 1. Title + Opening

**Title:** Activity name that helps the reader recognize what the section teaches. The title should connect back to the technique or task, not just the workshop activity label. "Getting up to speed", "Understanding changes", "Brief assessment". Large heading. This title must match the **Title** used in the cover page "Included:" list.

**Opening paragraph:** 1-3 sentences. Rules:
- Frame the pain in the reader's world, not in AI terms
- Name the operational headache before introducing what AI does
- End by connecting AI's role to their outcome. Frame around **process improvement** (repeatable, specific feedback, better handoffs) rather than speed ("in seconds," "quickly")
- Each opening must stand alone. Never reference other sections ("the previous section covered...") or assume a reading order
- Plain language, no jargon: word swaps and jargon rules per `/writing-guide.md` §3.2 and §9

**Example (Email Synthesis):**
> When information is fragmented across multiple threads, replies, and dates, Copilot can help you quickly piece together context so you can act, brief others, or make decisions.

**Example (Document Comparison):**
> Leaders rarely read documents in isolation. More often, you're trying to contextualize information: this year vs. last year, one policy vs. another, what's evolving vs. what's stable.

**Pattern:** [Name the reader's situation] + [What AI helps with] + [Their outcome, not AI's capability]

---

## 2. Key Mental Shift

**Format:** Gray callout card with checkbox icon. One bold sentence.

**Purpose:** Reframe how the reader thinks about this task. Not what to do, but how to think about it differently.

**Rules:**
- One sentence only
- Bold the entire sentence
- Should feel like an insight, not an instruction
- The reframe should make the rest of the section click

**Examples:**
- "Define the voice and style upfront. After that, rewriting is just applying it."
- "You don't need a clear picture in your head. Describe the concept, see what AI generates, then refine, or start over with a more specific request."
- "Going into a comparison with specific questions and framing will result in a more nuanced analysis."

---

## 3. Approach

**Format:** Two parts: a visual diagram and expandable cards.

### Approach Diagram

- Uses the **Bubbles smart diagram** in Gamma
- Numbered steps: "1. [Label]", "2. [Label]", etc.
- Each bubble uses a **different color** from the brand palette (rotate through teal, blue, maroon, etc.)
- Typically 3-5 steps (3 minimum, 6 maximum)
- Step labels are short verb phrases in sentence case: "Lock the scope", "Extract the facts", "Run the check"
- **Title formatting:** Always h4 bold for smart diagram titles. Title font color should match the bubble color.

**When writing markdown for Gamma:** Write as a numbered list separated by pipes. Gamma will render the Bubbles smart diagram visual. Example: `1. Lock the scope | 2. Select the thread(s) | 3. Extract the facts | 4. Organize for your needs`

### Expandable Cards (Nested Cards)

One card per approach step. In web view: collapsible accordion. In PDF: fully expanded with border.

**Card structure:**
- **Colored header bar** with bold title matching the step name
- **Body:** 2-5 bullets or 2-3 short sentences
- **Optional:** Example/Not pairs, "Think:" prompt lists, sub-bullets

**Card color progression:**
- Steps 1-2: Teal or blue headers (setup, orientation)
- Middle steps: Blue headers (core technique)
- Final step: Maroon/red header (validation, critical action)

**Density per card:** 30-80 words. If a card exceeds 80 words, it needs sub-structure (sub-bullets, a short list) to stay scannable.

**Tool mechanics in approach cards:** When an activity requires uploading or attaching documents (transcripts, briefs, email threads), include the specific mechanics in the relevant approach card. For Copilot: local files use "+" > "Upload images and files"; cloud-stored files use "+" > "Work Content." These details change over time, so present them as current guidance without implying permanence.

**Example/Not pairs** (use in approach cards to correct anticipated misuse):
- Format: `Example: "Emails from John Doe in Q4 about the board presentation"` / `Not: "emails with the word 'board'"`
- Use the checkmark/X convention: Example line, then ✗ Not: line in italic
- Apply wherever the reader might default to the wrong mental model
- Show the gap rather than describe it

**"Think:" lists** (use when the step requires the reader to consider multiple factors):
- Intro: "Think:"
- Bulleted list of considerations
- Keep items to one line each

---

## 4. Sample Prompt

**Format:** Full prompt text in a styled block (gray box), with color-coded annotations.

**Rules:**
- One full-length prompt per activity (minimum). More if the activity has distinct sub-workflows.
- Prompt must be **role-grounded**: anchored in a believable scenario for this audience. Generic prompts signal the facilitator doesn't understand the audience.
- Include all prompt components, clearly structured.

**Color-coded prompt components:**

| Component | Color | What it is |
|-----------|-------|------------|
| TASK | Blue | The core action requested |
| INPUT | Purple | What content to include (emails, documents, etc.) |
| PURPOSE | Pink | The goal, audience, or other context |
| FORMAT | Green | Specific output requirements (optional) |

**Annotation format:** Label badges above or alongside the prompt text, with arrows/lines pointing to the relevant sections. Each label includes the component name and a brief description.

**"Notice:" callout** below the prompt highlighting the structural principle (optional but common):
- Example: "Notice: Clear scope (emails) and clear goal (purpose). Formatting is optional, but helpful when you know what you're looking for."

**When writing markdown for Gamma:** Write the prompt text in a blockquote. List the component annotations separately with their colors. Gamma will render the visual.

---

## 5. Pro Tips

**Format:** Numbered grid, typically 2 columns x 2-3 rows.

**Rules:**
- Each tip: circled number + **bold title** + 1-2 sentence description
- Tactical, not conceptual. "Do this" not "Think about this."
- 3-6 tips per activity
- If a tip needs more than 2 sentences, it should be an approach card instead
- Last tip can span full width if there are an odd number
- **Don't duplicate the Approach or Opening.** If a concept is already the core teaching (e.g., "use two prompts" is the approach, "use transcripts not summaries" is the opening framing), don't repeat it as a Pro Tip. Pro Tips add new tactical advice beyond what the approach already covers.
- **When reusable criteria or prompts are involved,** mention creating an AI agent (e.g., Copilot agent) to automate the process so the reader doesn't have to copy-paste every time.

**Density:** 15-30 words per tip.

**What makes a good Pro Tip:**
- Specific tool instruction ("Work side-by-side in Word")
- Concrete technique ("Use 'Just give me the revised copy' when you get confident")
- Named shortcut ("Start with General Understanding: generate audio overviews in OneDrive")

**What doesn't belong in Pro Tips:**
- Conceptual reframes (those go in Key Mental Shift)
- Step-by-step processes (those go in Approach)
- Warnings about what can go wrong (those go in Limitations)

---

## 6. Limitations

**Format:** Left column of a two-column layout (paired with Refining Your Results).

**Rules:**
- 3-4 items
- Each item: **bold lead-in phrase** + colon + explanation sentence
- Red/maroon bullet dots
- Honest, specific, named failure modes
- Name what the tool actually can't do well and why
- Not hedging. Not softening. Direct.

**Density:** 15-30 words per limitation.

**Examples:**
- **Nuance can be lost:** If you need exact wording, ask to "extract specific parts" or "maintain original language"
- **Attachments and links aren't read:** The AI only sees email text and may struggle with tables.
- **Draft quality:** LLMs can be unreliable, potentially missing changes or hallucinating information not in the document. This happens more often as document size and complexity increases.

**Pattern:** [What goes wrong] + [Why or when] + [What to do about it, if applicable]

---

## 7. Refining Your Results

**Format:** Right column of the two-column layout (paired with Limitations).

**Rules:**
- Intro: "Ask yourself these questions to determine next steps if you aren't happy with the results."
- 3-5 items in teal speech-bubble styled cards
- Most items are **self-diagnostic questions** that imply the fix without stating it
- Items can also be **actionable suggestions** when the fix is concrete and specific (e.g., "Try giving AI examples of what good and bad look like for a criterion, and ask it to help you write better criteria" or "If the raw transcript is noisy, try a pre-processing step first")
- Items should address the most common reasons results fall short
- Questions should reflect the most common failure modes taught in the workshop, and the reflection language participants saw there (the arc's reflection structures are defined in `methodology/activity-arcs.md`). The QRG section sequence itself is fixed and arc-independent.

**Examples:**
- "Do I need more context in my prompt?"
- "Was my goal clear enough?"
- "Given my criteria, are there emails that may come up that aren't relevant?"
- "Did I explain what questions I want answered and why?"
- "Should I be more specific about themes or areas to compare?"

**Pattern:** Questions move from input quality ("Did I give enough context?") to goal clarity ("Was I specific enough?") to output refinement ("Are there edge cases I missed?").
