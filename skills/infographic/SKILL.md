---
name: infographic
description: Designs viral-worthy infographics using Vincent Pierri's 4-step validation framework (Real Pain Point, Immediately Actionable, Less Saturated, Dense Enough to Save), then generates a Mellonhead-branded image prompt with hex codes and typography. Each step is a gate: the idea gets reworked until it passes before moving on. Use when creating infographic content for LinkedIn carousels, newsletters, workshop handouts, or social educational content. Triggers: "create an infographic about", "walk me through the framework for this idea", "generate a brand-compliant image prompt for this outline".
---

# Infographic Creator

Design viral-worthy infographics using Vincent Pierri's 4-step framework, then generate a brand-compliant image prompt for Mellonhead.

**Brand spec:** all Mellonhead colors, typography, and visual identity rules live in `branding/brand-reference.md` (canonical). Load it before generating any visual prompt. This skill keeps only infographic-specific composition rules inline.

## When to Use

Use this skill when you need to create infographic content for:
- LinkedIn carousel posts
- Newsletter visuals
- Workshop or presentation handouts
- Social media educational content
- Any visual that needs to be dense, saveable, and on-brand

## Source

This framework comes from Vincent Pierri's viral infographic methodology, shared by Christine Orchard (Marketers Do Coffee).

---

## Step-by-Step Process

Walk the user through each step sequentially. Do not skip ahead. Each step is a gate: if the idea doesn't pass, help the user rework it before moving on.

### Step 1: Real Pain Point

**Question to ask:** "Is this solving a specific problem your audience has RIGHT NOW?"

**Pass criteria:**
- The topic names a specific, actionable problem
- Someone reading the title would immediately think "I need this"
- It's narrow enough to be useful, not broad enough to be generic

**Fail signals:**
- Too broad ("Content strategy tips," "AI best practices")
- Too generic (could apply to anyone in any industry)
- No urgency (nice to know, not need to know)

**Rule:** Generic gets ignored. Specific gets bookmarked.

| Fails | Passes |
|-------|--------|
| "AI adoption tips" | "4 questions to ask before your team's first AI pilot" |
| "Leadership in the age of AI" | "What to say when your team is afraid AI will replace them" |
| "How to use AI at work" | "How to map your team's workflow to find where AI actually helps" |

**Action:** Present the user's idea back to them through this filter. If it's too broad, help them narrow it. If it passes, move to Step 2.

---

### Step 2: Immediately Actionable

**Question to ask:** "Can someone use this TODAY? Not next quarter. Not after reading a book. Today."

**Pass criteria:**
- The content is screenshot-and-use ready
- No prerequisites, no interpretation needed
- Someone could apply this in their next meeting, conversation, or work session

**Fail signals:**
- Requires setup ("First, build a change management strategy...")
- Conceptual, not tactical ("Know your audience" without showing how)
- Needs context the reader doesn't have

**Rule:** Not next quarter. Not after three books. Today.

**Action:** If the content requires too much setup or interpretation, help the user strip it down to the actionable layer. What's the thing someone can DO, not just KNOW?

---

### Step 3: Less Saturated

**Question to ask:** "Have 20 other creators already posted this exact thing?"

**Pass criteria:**
- A fresh angle or framing that others haven't used
- Deeper specificity than what's already out there
- Combines ideas in a way that hasn't been done

**Fail signals:**
- Version #21 of a common topic
- The same framework repackaged with different colors
- Nothing that would make someone stop and think "I haven't seen it put this way before"

**Rule:** If your version isn't significantly different, you're just adding noise. This is the filter most people skip.

**Action:** Search the user's memory for their unique angles, client patterns, and frameworks. The differentiator usually lives in their experience, not in the topic itself. Help them find the angle only they can take.

---

### Step 4: Dense Enough to "Save"

**Question to ask:** "Is there too much value here to absorb in one pass?"

**Pass criteria:**
- 3%+ save rate benchmark (if measurable)
- Multiple layers of useful information
- The kind of content people screenshot or bookmark for later
- Rewards a second look

**Fail signals:**
- Can be fully absorbed in a single glance
- Low information density (big fonts, lots of whitespace, few actual insights)
- Nothing to return to

**Rule:** If they can absorb it all in one read, they won't save it. Density is the save driver.

**Action:** If the content is too thin, help the user add layers: examples, a framework, a checklist, a comparison table, a decision tree. The goal is value density, not visual clutter.

---

## After All 4 Steps Pass: Content Outline

Once the idea clears all four gates, draft the infographic content:

1. **Title:** Specific, pain-point-driven. Follow the pattern: [Number] + [Specific outcome] (e.g., "4 Steps to Create a Viral Infographic," "3 Questions That Turn AI Skeptics into Advocates")
2. **Subtitle:** One line that names why most people get this wrong
3. **Sections:** 3-5 distinct chunks, each with:
   - A clear heading
   - A pass/fail or do/don't comparison where applicable
   - A practical rule or takeaway
4. **Cheat sheet or self-test:** A quick-reference summary at the bottom that rewards saving

Present the content outline to the user for feedback before generating the visual prompt.

---

## Visual Prompt Generation

After the user approves the content outline, generate an image prompt using the palette, typography, and visual identity in `branding/brand-reference.md`.

### Infographic Composition Rules

Infographic-specific applications of the brand spec:

- **Layout:** Clean sections with clear visual hierarchy
- **Background:** White (#FFFFFF). Cream is a small fill or band only, never the canvas (brand reference, changed August 2026)
- **Section headers:** Navy
- **Accent elements:** Coral for emphasis, callouts, and key takeaways
- **Secondary accents:** Golden Yellow for highlights, badges, or pass/fail indicators
- **Body text:** Dark navy or near-black for readability
- **Dividers/visual flow:** Use the arch motif or simple geometric shapes in brand colors
- Follow the brand reference's No/Yes style rules (no neon, dark backgrounds, cartoons, stock cliches, clutter; yes to white space, hierarchy, punchy text, section contrast)

### Prompt Template

Generate a prompt in this format, customized to the specific infographic (hex codes from the brand reference are inlined because the image generator can't follow links):

```
Create a vertical infographic with a clean, modern design.

Background: white (#FFFFFF), with cream (#FDF5E6) used only for small section bands or callout fills.
Title: [INFOGRAPHIC TITLE] in navy (#1E3A5F), bold sans-serif (Hiruko style).
Subtitle: [SUBTITLE] in smaller navy text beneath the title.

Layout: [NUMBER] sections flowing top to bottom, each in a white card with subtle shadow.

Section headers: navy (#1E3A5F) with coral (#F46665) accent bar or number badge.
Key callouts and rules: coral (#F46665) text or coral-bordered callout boxes.
Pass/fail or do/don't comparisons: golden yellow (#FFC512) for pass/do, coral (#F46665) for fail/don't.
Body text: dark navy, clean sans-serif.

Bottom section: "Cheat Sheet" or "Self-Test" box with cream background, navy border, coral checkmarks or bullet points.

Overall style: warm, approachable, professional. Abundant white space. No clutter.
Include subtle arch/rainbow motif in coral and golden yellow as a decorative element near the title or between sections.

No people, no stock photos, no cartoons. Typography-driven with geometric accent shapes.
```

Adjust the template based on the specific content structure (number of sections, whether it uses a funnel, grid, flowchart, or linear layout).

**Scope note on "no people."** That line is a composition rule for infographics, which are typography-driven by design. It is **not** a Mellonhead brand rule, and it does not carry to other visuals. `branding/brand-reference.md` bans stock-photo cliche, not people; illustrated human figures are allowed and sometimes correct in web resource art, slides, and social graphics. Do not cite this line as brand policy outside this skill.

---

## Output Checklist

Before delivering the final prompt, verify:

- [ ] All four Pierri gates passed
- [ ] Content outline approved by user
- [ ] Brand colors correctly applied per `branding/brand-reference.md` (hex codes included in prompt)
- [ ] Typography specified (Hiruko for body, Qliche for decorative only)
- [ ] Visual style matches Mellonhead identity (warm, clean, approachable)
- [ ] Layout suits the content structure
- [ ] Cheat sheet or save-worthy summary included
