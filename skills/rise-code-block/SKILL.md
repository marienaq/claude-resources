---
name: rise-code-block
description: Builds custom interactive HTML/CSS/JavaScript code blocks for Articulate Rise 360 when native block types cannot support the interaction, such as single-choice questions with per-option feedback but no correct/incorrect framing, reflection journals, inline popovers, and blocks that save learner input in one place and retrieve it later in the course. Captures Rise's sandboxed iframe constraints (blocked inline handlers, dialog APIs, external assets), completion signaling via postMessage, event delegation patterns, cross-block persistence via localStorage, Rise-native styling, and iframe debugging. Use when building or adapting an interactive element inside a Rise course. Triggers: "build a single-choice capstone with per-option feedback", "create a reflection journal block", "build a block that saves the learner's notes for later", "build a draft-then-refine activity", "build a custom Rise block", "adapt this code block pattern".
---

# Rise Code Blocks

Build custom interactive code blocks for Articulate Rise 360. This skill captures the technical patterns, constraints, and gotchas for writing HTML/CSS/JavaScript that works reliably inside Rise's sandboxed environment.

**References:**
- `references/styling.md` owns the CSS conventions: scoping, typography scale, Rise-native card/button/callout/checkbox/option-row styles, AI@ABA colors, and how to adapt accent colors. Load it when writing or reviewing any block's CSS.
- `references/persistence.md` owns saving and retrieving learner input across blocks: the localStorage mechanic, key naming, save-and-recap and draft-and-refine patterns, summary blocks, and the reset-for-testing snippet. Load it whenever input has to survive past the block it was typed into.

## When to Use

Use this skill when:
- Building custom interactions that Rise's native block types cannot support (e.g., single-choice with per-option feedback but no correct/incorrect)
- Creating reflection or journaling exercises with text areas
- Building an activity where the learner's input is captured in one block and shown again in another
- Building any interactive element that needs to mark itself as complete
- Adapting an existing code block pattern for new content

---

## Rise Code Block Constraints

Rise code blocks run inside a **sandboxed iframe**. This affects what works and what does not.

### What is blocked

| Feature | Why it fails | Alternative |
|---------|-------------|-------------|
| Inline event handlers (`onclick`, `onchange`) | Content Security Policy blocks them | Use `document.addEventListener` with event delegation |
| `alert()`, `confirm()`, `prompt()` | Sandboxed iframe blocks dialog APIs | Use inline callout elements styled as messages |
| Multi-line strings in double/single quotes | Line breaks inside `"..."` or `'...'` cause silent syntax errors | Use backtick template literals `` ` ` `` |
| External scripts/CDNs | May be blocked by CSP or CORS | Inline all code in the single code block |
| External images / relative paths | iframe has no access to parent file system | Base64-encode all images as data URIs |

### What works

- `<style>`, `<div>`, and `<script>` blocks in a single HTML input
- `document.addEventListener` for all event handling
- `window.parent.postMessage` for completion signaling
- CSS transitions and animations
- Template literals (backticks) for multi-line strings
- `.innerHTML` for rendering author-written HTML in dynamic content
- `localStorage`, including across separate blocks in the same course (see `references/persistence.md`)
- Base64-encoded images via `data:image/png;base64,...` in `<img>` src attributes

### innerHTML vs textContent

The rule depends on who wrote the string:

- **Author-written content** (feedback copy, popover bodies, anything in the source file) renders with `.innerHTML`, so `<strong>`, `<br>`, and `<p>` work.
- **Learner-written content** (anything typed into a textarea, anything read back out of localStorage) renders with `.textContent`. Stray characters in learner input will otherwise break the block.

---

## Naming Conventions

These apply to every code block, not just persistent ones.

### Container ID

Every block gets one outer div with a unique camelCase ID, and **every CSS rule in the block is scoped under that ID**.

```html
<div id="informYourTask"> ... </div>
```

```css
#informYourTask .save-btn { ... }
```

Examples: `#informYourTask`, `#taskSummary`, `#draftPrompt`, `#refinePrompt`.

The iframe sandbox means unscoped selectors do not collide between blocks today, but scoping costs nothing and removes a whole class of failure the moment a snippet gets reused outside an iframe or two patterns get merged into one block. The snippets in `references/styling.md` show bare selectors for readability. Scope them when you write the real block.

### Filename

```
sectionN-[activity-name].html
```

Kebab-case for the activity part. The section number matches the Rise section where the block lives. Examples: `section3-inform-your-task.html`, `section8-your-tasks-summary.html`.

---

## Completion Signaling

Rise uses a specific postMessage format to mark a code block as complete. This is required for continue/divider blocks and lesson completion tracking.

### Correct format (Rise)

```javascript
window.parent.postMessage({ type: 'complete' }, '*');
```

### Wrong format (this is Storyline, not Rise)

```javascript
parent.postMessage(JSON.stringify({ method: 'set', key: 'complete', value: true }), '*');
```

The message must be a **plain object**, not a JSON string. The key is `{ type: 'complete' }`.

### When to fire it

Fire on the action that constitutes doing the block: submit, save, or the final interaction. Never fire on page load just because the block rendered.

**One exception.** A block with persisted state fires on load when saved input exists, because the saved value is proof the learner already did the work. Without it, a returning learner sees their own notes next to a Continue divider that will not let them past. See `references/persistence.md`.

Summary and recap blocks that only display previously captured input do not signal completion at all. Set them to not require completion on the Rise side.

---

## Event Handling Pattern

Always use document-level event delegation. This avoids timing issues (script running before DOM is ready) and works around CSP restrictions on inline handlers.

```javascript
(function() {
  document.addEventListener('click', function(e) {
    var target = e.target.closest('.my-button');
    if (target) {
      // handle click
    }
  });
})();
```

Key points:
- Wrap in an IIFE to avoid polluting global scope
- Use `e.target.closest('.selector')` to handle clicks on child elements (labels, icons inside buttons)
- Never use `onclick`, `onchange`, or other inline handlers in the HTML

---

## Derived Totals: never hardcode a count

**Any number in the markup that describes the data must be computed from the data.** Counters, progress dots, "of N" labels, completion thresholds, summary tallies.

This has now shipped wrong twice in one course. A sequential block was authored as:

```html
<div class="scenario-label">Scenario <span id="card-num">1</span> of 6</div>
```

The script updated `#card-num` and read the progress dots and the completion check from `SCENARIOS.length`, so everything looked correctly wired. But the total was a literal in the markup. The moment a seventh scenario was appended, the last card read **"Scenario 7 of 6"** to the learner, and the checklist telling the builder to append it said "nothing else needs touching."

Write the total the same way you write the current index:

```html
<div class="scenario-label">Scenario <span id="card-num">1</span> of <span id="card-total"></span></div>
```

```javascript
document.getElementById('card-total').textContent = SCENARIOS.length;
```

**Rules:**

- No integer in the HTML may describe how many items exist. If you can add an item to the array and break a string, the string is wrong.
- The same applies to prose that counts: an intro reading "Five situations" above a five-item array is a hardcoded total in a text block. It cannot be derived, so it becomes a **named dependency**: when you hand off a block whose array length is editable, list every string that has to change with it, including ones outside the file.
- **Grep before you hand off.** In any block with a variable-length array, search the file for the array's length as a literal (`>6<`, `of 6`, `"6"`) and confirm each hit is either derived or listed as a dependency.

Content edits to these blocks are made by someone working from a checklist, not by whoever wrote the JavaScript. A total that only breaks when the data changes is a trap set for that person.

---

## Debugging in Rise

Console errors from code blocks only appear in the **iframe context**, not the parent page.

To see errors in Chrome DevTools:
1. Open DevTools (F12)
2. In the Console tab, click the dropdown at the top left that says **"top"**
3. Select the iframe context
4. Reproduce the issue and check for errors

Common silent failures:
- Line breaks inside `"..."` strings (use backticks instead)
- Referencing DOM elements before they render (use event delegation)
- Inline `onclick` handlers silently ignored by CSP

---

## Block Types

### Single-Choice with Per-Option Feedback (Capstone)

Use when Rise's native knowledge check would force correct/incorrect framing but all options are defensible.

**Structure:**
- Prompt text (can use `<p>` tags for paragraph breaks)
- Divider line
- Radio-style options (styled as clickable rows)
- Submit button
- Alert callout (shown if no selection made)
- Feedback callout (shown after submit, updates if selection changes)

**Key behaviors:**
- Selecting an option highlights the row and fills the checkbox
- Submitting shows feedback and hides the submit button
- Changing selection after submit updates the feedback live
- Empty submit shows an encouraging nudge, not an error

### Reflection / Journal

Use for open-ended writing exercises where learners capture their thinking.

**Structure:**
- Header and intro text
- Text area with placeholder
- Submit button
- Alert callout (shown if textarea is empty on submit)
- Confirmation callout (shown after successful submit)

**Key behaviors:**
- Typing in the textarea hides any visible alert
- Submitting with content shows confirmation and hides button
- Nothing is stored. The note is gone once the learner leaves the page. Use the persistent variant below if it needs to survive.

### Saved Reflection (persistent across blocks)

Use when the learner should see their own input again later: a recap at the end of the course, or a draft they come back and refine after being taught the better approach.

Same shape as the reflection block, plus a save button that writes to localStorage, an edit button that unlocks the textarea again, and restore-on-load. A later block reads the same key and displays what was captured.

Two proven arrangements:
- **Save-and-recap.** Several input blocks across the course, one summary block at the end with a copy-to-clipboard button.
- **Draft-and-refine.** One block captures a first attempt, a later block retrieves it and asks for a revision under a second key so both versions survive.

Full mechanics, key naming, default UI copy, boilerplate, summary-block gotchas, and the reset-for-testing snippet are in `references/persistence.md`. Load it before building one of these.

### Inline Popover (Supplementary Content)

Use when a card or section has optional supplementary content (troubleshooting tips, additional context) that shouldn't increase the card's default height.

**Structure:**
- A text link at the bottom of the card (e.g., "Still having trouble?")
- A fixed overlay with semi-transparent backdrop that centers the popover within the card grid area
- Close button (x) in the top-right corner of the popover
- Clicking outside the popover also dismisses it

**Key behaviors:**
- Clicking the link shows the overlay with centered popover
- Clicking the close button or the backdrop dismisses the overlay
- The popover uses `position: absolute` within the card grid (not `position: fixed` on the viewport) so it appears centered among the cards
- Use `e.stopPropagation()` on the popover itself so clicks inside it don't dismiss it
- Content inside the popover can use `<strong>` lead-ins with `<br><br>` between items, or `<p>` tags
- When using `.innerHTML` to render HTML content in callouts or popovers, switch from `.textContent` to `.innerHTML`

**Reference:** `course-material/base/foundation/ms-copilot/q1-2026-curriculum/excel-expect-agent-mode.html` (the "Still having trouble?" popover in the Edits require the Excel agent card)

---

## Styling

All CSS conventions live in `references/styling.md`: the typography scale (17px lesson-level, 15px contained, 12px labels), the Inter font import, the Rise-native white card, pill buttons, dividers, callouts, custom checkboxes, option rows, the AI@ABA color palette and gold button convention, and the checklist of places to update when adapting the accent color to a new brand.

---

## Rise Knowledge Check Limitations

Rise does not support a "one attempt then lock" mode for knowledge checks. The two options are:
- **Unlimited retries:** Learners can retry as many times as they want. Risk: signals they *should* keep trying, which undermines reflection-oriented questions.
- **No retries:** Shows "you have reached your maximum retries" after one attempt. Reads as punitive for ungraded content.

For reflection-oriented knowledge checks (not graded, no requirement to answer correctly), use unlimited retries with framing language that sets expectations (e.g., "These aren't graded. Answer based on your thinking, read the feedback, and move on."). If this remains a friction point, consider replacing with custom code blocks that enforce single-attempt behavior.

---

## Rise-Side Setup

Code that signals completion only works if the course is configured to listen. Hand these instructions to whoever assembles the Rise course, which may be you.

- **Each interactive block:** set to **require completion**. The block sends `postMessage({ type: 'complete' })` when the learner acts.
- **After each interactive block:** add a **Continue divider** and set it to **require completion**. Without the divider, Rise will not stop learners from scrolling past.
- **After a block that saves input:** add a short **text block** telling the learner what happened, since nothing else on screen says so. Default copy:
  - First one in the course: `Your notes are saved. At the end of this course, you'll find a summary of everything you've captured. From there you can copy and paste them somewhere handy.`
  - Every one after: `Your notes are saved and will appear in your summary at the end of the course.`
- **Summary and recap blocks:** set to **not require completion**.
- **Reset or utility blocks:** set to **not require completion**, and hide from sidebar navigation.

---

## Quality Checklist

Before deploying a code block to Rise:

**Strings**
- [ ] All multi-line strings use backticks, not quotes
- [ ] No line breaks inside `"..."` or `'...'` string literals
- [ ] No double `##` in hex color codes

**Structure**
- [ ] Outer div has a unique camelCase container ID
- [ ] Every CSS rule is scoped under that ID
- [ ] Script is wrapped in an IIFE
- [ ] `[hidden] { display: none; }` is present in the style block

**Events**
- [ ] No inline event handlers (`onclick`, `onchange`) in the HTML
- [ ] All events attached via `document.addEventListener` with event delegation
- [ ] Click handlers use `e.target.closest()` to handle child element clicks

**Content rendering**
- [ ] Author-written HTML renders via `.innerHTML`
- [ ] Anything the learner typed renders via `.textContent`

**Derived totals**
- [ ] No integer in the HTML describes how many items exist; every "of N", progress count, and tally is computed from the array
- [ ] Grepped the file for the array length as a literal and confirmed every hit is derived
- [ ] Any prose outside the file that states the count (an intro saying "Five situations") is listed as a named dependency in the handoff

**Completion**
- [ ] Uses `window.parent.postMessage({ type: 'complete' }, '*')` (not the Storyline format)
- [ ] Completion fires on the action that constitutes doing the block, not on page load. The one exception is a persistent block restoring saved input, which also fires on load.
- [ ] Summary and recap blocks do not fire completion at all
- [ ] Rise-side setup handed to the course builder (require completion, Continue divider, reminder text)

**Images**
- [ ] All images are base64-encoded as `data:image/png;base64,...` data URIs (no relative paths or external URLs)
- [ ] Icons used inline in text use the `.icon-inline` class pattern (20x20px, `vertical-align: middle`)

**Typography** (values in `references/styling.md`)
- [ ] `@import` for Inter font is at the top of the `<style>` block
- [ ] Font family is `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`
- [ ] Body/primary text is 17px, color `#2d2d2d`, line-height 1.75
- [ ] Secondary/contained text (card descriptions, tips, callouts) is 15px, color `#555`, line-height 1.65
- [ ] Labels are 12px uppercase, color `#999`
- [ ] Prompt blocks use monospace at 15px, color `#333`
- [ ] Titles and bold headings use line-height 1.35

**Styling**
- [ ] White card with shadow matches Rise's native quiz block
- [ ] Button is pill-shaped, uppercase, matching Rise's native buttons
- [ ] No correct/incorrect color coding (no red/green) on judgment questions

**Testing**
- [ ] Test in Rise preview (not just a browser), since the iframe sandbox behaves differently
- [ ] Switch to the iframe context in DevTools console to check for errors
- [ ] Test all interaction states: no selection + submit, selection + submit, change selection after submit

For blocks that save learner input, also run the persistence checklist in `references/persistence.md`.
