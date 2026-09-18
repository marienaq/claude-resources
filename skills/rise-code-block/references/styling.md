# Rise Code Block Styling Reference

CSS conventions, typography scale, and color specs for custom Rise 360 code blocks. Companion to `../SKILL.md`, which owns the constraints, event handling, completion signaling, and block type patterns.

## Scoping

The snippets below use bare class selectors (`.submit-btn`, `.option`) for readability. In a real block, scope every rule under the block's container ID:

```css
#informYourTask .submit-btn { ... }
#informYourTask .option:hover { ... }
```

See the container ID convention in `../SKILL.md`. This matters most for element selectors like `input[type="radio"]`, which are the ones that bite when a snippet gets reused or two patterns get combined into one block.

Start every block's style sheet with the reset:

```css
* { box-sizing: border-box; }
body { margin: 0; padding: 0; background: transparent; }
[hidden] { display: none; }
```

## Styling Conventions

### Typography

Use the course's body font and match its type scale. These apply to all code blocks regardless of client or brand colors.

| Role | Font | Size | Color | Line-height | Example |
|------|------|------|-------|-------------|---------|
| **Body / primary** | Inter (with Helvetica Neue fallback) | 17px | `#2d2d2d` | 1.75 | Step instructions, card titles |
| **Secondary / contained** | Same | 15px | `#555` | 1.65 | Card descriptions, tips, lookfor text, callouts, option text |
| **Labels** | Same, uppercase | 12px | `#999` | 1.4 | Section markers ("What to look for", "Limitation") |
| **Prompt blocks** | SF Mono / Consolas / monospace | 15px | `#333` | 1.65 | Copilot prompts with editable placeholders |
| **Headers / block titles** | Same as body, bold | 17-18px | `#2d2d2d` or brand color | 1.35 | Section headers within a code block |

**Key distinction:** 17px is for lesson-level content the learner reads in sequence (instructions, titles). 15px is for content inside containers (cards, callouts, detail panes) where the visual boundary already signals "this is a unit." This includes tab/detail view list titles and icon list titles, which sit inside a container card.

Import Inter from Google Fonts at the top of every `<style>` block. Rise iframes do not inherit fonts from the parent page.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.75;
  color: #2d2d2d;
}
```

### Match Rise's native look

Rise quiz blocks use a white card with a subtle shadow. Custom code blocks should match this so they feel native.

```css
.container {
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  max-width: 680px;
  margin: 0 auto;
  padding: 48px 40px 40px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  line-height: 1.6;
  color: #000;
}
```

### Buttons

Rise native buttons are pill-shaped with uppercase text.

```css
.submit-btn {
  display: block;
  margin: 32px auto 0;
  padding: 12px 36px;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #fff;
  background-color: #200d78; /* adjust to course accent color */
  border: none;
  border-radius: 24px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #2e1a8a; /* slightly lighter than base */
}
```

> **Open question, flagged 2026-08-11.** This sets `font-weight: 400`, but the shipped ABA blocks in the localStorage pattern use `700`. At 12px uppercase with dark text on gold, 700 reads considerably better. Confirm which is the convention and make this file match.

#### Secondary button (outlined)

For a lower-emphasis action sitting under the primary button, such as "Edit notes" after a save. Outlined in the accent color rather than filled.

```css
.edit-btn {
  display: none;
  margin: 12px auto 0;
  padding: 8px 24px;
  font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1b1464; /* accent */
  background: transparent;
  border: 2px solid #1b1464;
  border-radius: 24px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.edit-btn:hover { background-color: #1b1464; color: #fff; }
```

#### Disabled-until-ready state

For buttons that should not be usable until the learner has entered enough. Dim and non-clickable by default, activated by adding a class from JS.

```css
.save-btn { opacity: 0.4; cursor: not-allowed; }
.save-btn.active { opacity: 1; cursor: pointer; }
```

### Divider line

A thin colored line separates the prompt from the options, matching Rise's native quiz divider.

```css
.divider {
  border: none;
  border-top: 2px solid #200d78; /* match accent color */
  margin: 0 0 28px 0;
}
```

### Callout boxes

Used for alerts (no selection) and feedback. Neutral color, not red/green.

```css
.callout {
  display: none;
  margin-top: 16px;
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.5;
  color: #200d78;
  background-color: #f0eef8;
  border-left: 4px solid #200d78;
  border-radius: 4px;
}
```

Nudge messages (the learner has not entered enough yet) and confirmation messages (the action succeeded) use the same callout treatment at slightly tighter padding. Keep them visually identical to each other. Neither is an error, so neither gets red.

```css
.nudge-msg,
.confirm-msg {
  display: none;
  margin-top: 12px;
  padding: 14px 18px;
  font-size: 15px;
  line-height: 1.5;
  color: #1b1464;
  background-color: #eeedf8;
  border-left: 4px solid #1b1464;
  border-radius: 4px;
}
```

### Multi-line learner input

Any element displaying text the learner typed needs `white-space: pre-wrap` so their line breaks survive.

```css
.notes-display { white-space: pre-wrap; }
```

### Custom checkboxes

Style radio inputs to look like Rise's square checkboxes with a checkmark.

```css
input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid #ccc;
  border-radius: 3px;
  margin-top: 2px;
  cursor: pointer;
  position: relative;
}

input[type="radio"]:checked {
  border-color: #200d78;
  background-color: #200d78;
}

input[type="radio"]:checked::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
```

### Option rows

Clickable rows with hover and selected states. Use negative margin to extend the highlight to the card edges.

```css
.option {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.option:hover {
  background-color: #f8f7fc;
  margin: 0 -20px;
  padding: 16px 20px;
  border-radius: 4px;
}

.option.selected {
  background-color: #f0eef8;
  margin: 0 -20px;
  padding: 16px 20px;
  border-radius: 4px;
}
```

---

## AI@ABA (AI Academy) Colors: ABA-specific

| Color | Hex | Use |
|-------|-----|-----|
| **Deep Purple** | #1b1464 | Primary |
| **Blue** | #047ae9 | Secondary |
| **Gold** | #f2b16f | Secondary, buttons |
| **Pink** | #c257be | Secondary |
| **Copper** | #d0774f | Secondary |
| **Cyan** | #30cbf1 | Secondary |

### ABA Button Convention

Submit/action buttons in ABA courses use Gold (`#f2b16f`) with dark text (`#2d2d2d`), not white text. The gold is too light for white text to be readable. Hover state: `#e09d5a`.

```css
.submit-btn {
  color: #2d2d2d;
  background-color: #f2b16f;
}
.submit-btn:hover {
  background-color: #e09d5a;
}
```

---

## Adapting Colors

The accent color (`#200d78` in ABA examples) should match the course or organization's brand. When changing the accent color, update it in:
- Button `background-color` and hover state
- Divider `border-top`
- Checkbox `:checked` states (`border-color` and `background-color`)
- Callout `color`, `background-color` (use a very light tint), and `border-left`
- Option row `.selected` and `:hover` background colors (use light tints)
- Textarea `:focus` border color
- Secondary/outlined button `color` and `border`, plus its hover `background-color`
- Nudge and confirmation message `color`, `background-color`, and `border-left`
