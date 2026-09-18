# Visual Language

The visual system for Mellonhead workshop slides: layout, color, typography, imagery, and icons. Load when specifying visual treatment or reviewing a deck's look.

---

## Layout Principles

- **16:9 slides**, built in Gamma
- **AI@ABA logo** bottom-left on every slide
- **Whitespace is structural.** Slides are never crowded. If a slide feels full, split it.
- **Split-screen** for section dividers: text left (~50-60%), hero image right (~40-50%)
- **Full-width** for content slides with minimal text
- **Numbered steps** (01, 02, 03, 04) with colored top-bar separators for process/approach slides
- **Card-based layouts** (2-up or 3-up) with colored left borders for comparisons and frameworks
- **Icon + label pairs** (2-up or 3-up) with line icons above bold labels for concept slides

## Color System

| Element | Color | Notes |
|---------|-------|-------|
| Slide titles | Light gray (#58595b or similar) | Large, not bold |
| Section labels | ABA Blue (#005a8c) or Teal (#008095) | Small, bold, above main title |
| Sub-headers on slides | Bold, colored (teal, blue, maroon) | Differentiates sections within a slide |
| Body text | Dark gray/charcoal | Never pure black |
| Backgrounds | White or very light gray | Clean, corporate |
| Numbered step separators | Rotating brand colors (red, teal, blue, green) under the step numbers | Visual rhythm |
| Card borders | Full brand palette to differentiate categories | Left-border accent |
| Quote blocks | Teal border with large teal quotation marks | For citations and research |
| Callout boxes | Light gray background | Tips, notes, warnings |
| Pro tips header | Maroon (#870833) | Consistent across all Best practices slides |
| Limitations header | Maroon (#870833) | Same as Pro tips for visual pairing |

## Typography

- **Slide titles:** Very large, light weight, gray, sentence case. "How to synthesize emails" not "HOW TO SYNTHESIZE EMAILS"
- **Section labels:** Small, bold, colored (blue or teal), positioned above the main title. "Activity 1", "Demo", "Closing activity"
- **Taglines:** Light gray, small, one line, positioned below the main title on section dividers. "Stop searching, start asking"
- **Sub-headers:** Bold, colored, used to divide content areas within a slide
- **Body text:** Regular weight, smaller, dark gray
- **Font:** Helvetica Neue (or Arial as fallback)

## Imagery

- **AI-generated, photo-realistic** images on section divider slides
- **Sophisticated and contemporary.** Not cartoon-like, not garish.
- Each activity gets a **unique hero image** that metaphorically connects to the concept:
  - Email synthesis: glass building reflecting sky (fragmented reflections)
  - Document rewriting: braided rope (unifying strands)
  - Visual aids: origami crane (transforming flat material into structure)
  - Document comparison: glass panels side by side (transparency, comparison)
  - Action planning: modern office with large window (forward-looking)
- **Recurring slide types use library images.** "Your turn", "Now try again", and other recurring types pull from the stable image library at `course-material/ABA/Brand_and_Graphics/slide-image-library.md`. Embed the URL directly in markdown so Gamma uses the same image every time instead of generating a fresh inconsistent one.
- **Image-free types.** Let's Share, Let's Reflect, and Breakouts intentionally use no photo. Frame layouts and color do the work.
- **One-off hero images** are developed with the `/aba-image` skill first. That skill produces a brand-compliant concept and an AI image generator prompt with ABA hex codes. Pre-generate the image and embed the URL in markdown, or pass the concept prompt to Gamma's image generation (see `references/gamma-generation.md`).
- **Screenshots** for tool orientation slides only (Copilot interface)
- Visual requirements: brand colors, flat iconography left to right, plenty of whitespace, clean lines, max 2-3 fonts and distinct colors per image

## Icons

- **Line-style** (not filled), thin stroke, teal colored
- Used as **visual anchors** above labels on concept slides
- Simple, abstract: brain, person, group, scattered dots, connected nodes
- Always paired with a bold colored label underneath
