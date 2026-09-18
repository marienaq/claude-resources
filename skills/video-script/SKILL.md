---
name: video-script
description: Writes video scripts for educational how-to videos and feature overviews. Two modes: prompts for AI video editors (Cluso) that enhance short screen recordings with intro/outro cards, step or feature overlays, and fully written narration; and scene-by-scene production scripts for longer avatar-narrated videos (Camtasia/HeyGen) with track layout and asset prep. Use when turning a screen recording into a polished how-to video or building a narrated tool/course overview. Triggers: "write a Cluso prompt for this how-to video," "draft intro and outro narration," "write a production script for the overview video."
---

# Video Script Writer

Write video scripts for educational courses. This skill covers two distinct formats: short how-to video prompts (for AI video editors like Cluso) and longer feature overview scripts (for production in Camtasia or similar editors).

## When to Use

Use this skill when:
- Creating prompts for an AI video editor to enhance screen recordings with intros, outros, overlays, and narration
- Writing scene-by-scene production scripts for avatar-narrated overview videos
- Drafting narration text for any instructional video

---

## Mode 1: How-To Video Prompts

Short screen recordings (12-60 seconds) that already have pen annotations and zoom effects. The prompt tells an AI video editor (Cluso) what to add: intro/outro cards, step or feature overlays, narration, and music.

### When to use this mode

When you have a screen recording and need to turn it into a polished how-to video with branded intro/outro, step-by-step overlays, and narration.

### Prompt structure

```
1. Context block (course name, audience, lesson placement)
2. What the video shows (1-2 sentence description)
3. First task instruction (tell the editor to identify steps/transitions)
4. Style guide reference
5. Intro card (title, subtitle, narration)
6. Step or feature overlays with narration
7. Outro card (text, narration)
8. Background music direction
```

### Two overlay formats

**Step-by-step** (for tutorials with a clear sequence):
- Overlay format: "Step [number]: [short action description]"
- Narration reads the step aloud with one short clarifying phrase
- Reset step numbering at each new section if using section cards

**Feature tour** (for demonstrating multiple capabilities):
- Overlay format: "[Feature name]" (no step numbers)
- Narration explains what the feature does and why it's useful
- Each feature gets its own overlay that appears when that feature is shown on screen

### Narration style

**Intro narration (2 sentences):**
- Sentence 1: Name the problem or situation the learner is in
- Sentence 2: Say what the video shows them how to do
- Tone: conversational, like a colleague explaining something. Not robotic, not marketing-speak.

Example:
> "Created a page or image in Copilot and not sure where it went? Here's how to find everything you've made in the Copilot library."

**Step/feature narration:**
- Read the step or feature text aloud
- Add one short clarifying phrase if the action needs context
- Do not editorialize or explain why unless it's essential

**Outro narration (1 sentence):**
- Reinforce where to find or use the feature
- Or restate the key takeaway in practical terms

Example:
> "Any time you create a page or image in Copilot, it'll be saved right here in your library."

### Intro and outro cards

- Deep purple (#1b1464) background, white text, centered
- Title in bold, subtitle in regular weight below
- Keep text minimal (title + one line subtitle)
- Background image may be provided manually; default to solid purple

### Step overlay bar

- Full width across the top of the screen
- Blue (#047ae9) background with white text
- Semi-transparent so it doesn't fully obscure screen content

### Section cards (for longer videos with distinct tasks)

- 1-2 seconds duration
- Deep purple background, white text
- Task title only
- Insert before each new section begins in the recording

### Production notes

Include production notes at the top of the prompt when:
- A second video clip may be attached (specify where to insert it)
- The video covers content from multiple recordings
- There are specific timing constraints

### Key rules

1. **Narration must be explicitly written out.** Never instruct the AI editor to generate narration. Write every word.
2. **Tell the editor to identify steps from the recording.** The editor watches the mouse movements and clicks. But the narration for each step comes from your script.
3. **Keep it tight.** A 20-second video doesn't need 6 steps. Match the granularity to the video length.
4. **Intro/outro shouldn't repeat each other.** The intro sets up the problem. The outro reinforces the takeaway. Different jobs.

### Reference

See `course-material/base/foundation/ms-copilot/q1-2026-curriculum/cluso-video-prompts.md` for 16 video prompts that established this pattern.

---

## Mode 2: Feature Overview / Intro Videos

Longer videos (1-3 minutes) combining AI avatar narration, screen recordings, graphics, and text overlays. Produced in Camtasia or similar multi-track editors.

### When to use this mode

When building a narrated overview video that introduces a tool, course, or concept with a mix of avatar, screen demos, and graphics.

### Script structure

```
1. Production workflow (tools, export settings)
2. Asset prep (graphics to design, screen recordings to capture, avatar settings)
3. Scene-by-scene script with:
   - Timestamp and duration
   - Narration text
   - Track 1 (avatar) direction
   - Tracks 2-5 (overlays) direction
   - Transition notes
4. Scene summary table
5. Production notes (track discipline, text styling, animations, audio, captions, export)
```

### Track layout convention

```
Track 5: Text overlays, callouts, annotations (always on top)
Track 4: Graphics (PNGs from Canva)
Track 3: Screen recordings
Track 2: Transitions, shapes, background elements
Track 1: Avatar MP4 (full duration, base layer)
```

### Narration style

Same voice profile as Mode 1 (conversational, not corporate), but slightly more structured since these are longer:
- Each scene has a clear topic
- Narration carries the story even when the avatar is covered by screen recordings
- Keep sentences short enough that they pair naturally with visuals

### Key rules

1. **Avatar MP4 runs on Track 1 for the full duration.** Never cut or split it. The voice is continuous.
2. **Screen recordings go on Track 3.** When they end, the avatar is revealed underneath.
3. **Keep animations simple.** Fade in/out (0.3-0.5s) is the default. Avoid spinning, bouncing, zooming text.
4. **Don't add Camtasia zoom on top of Screen Studio zoom.** It will feel over-animated.
5. **Mute system audio on screen recordings.** Only the avatar narration and background music should have audio.

### Reference

See `course-material/base/foundation/ms-copilot/q1-2026-curriculum/lesson-1-video-script.md` for the full production script that established this pattern.

---

## Shared Conventions

### Voice and tone
- All voice and style rules: `/writing-guide.md` at the project root (canonical). For learning-content structure, see the `/write-learning` skill.
- Conversational, like a knowledgeable colleague
- No hype, no marketing-speak, no filler phrases
- Use the client's brand colors and fonts from their style guide

### Naming conventions
- Use "M365 Copilot app" (not "Copilot Chat") for the standalone application
- Use "Copilot in [app name]" for in-app features
- Use "chat" lowercase only when referring to the act of having a conversation

### Working with the user
- Use the options-then-refine pattern: offer 2-3 options for narration, card text, and framing, then let the user pick or mix
- When the user describes what happens in a recording, draft the full prompt with narration; don't ask them to write the narration themselves
- If a video's purpose changes (e.g., from step-by-step to feature tour), restructure the overlay format accordingly

---

## Quality Checklist

Before finalizing a video prompt or script:
- [ ] Intro names the problem, not just the feature
- [ ] Outro reinforces the takeaway, doesn't repeat the intro
- [ ] Narration is written out explicitly (not left to AI generation)
- [ ] Step/feature overlays match the video content
- [ ] Brand colors and fonts are specified
- [ ] Production notes included if there are special considerations
- [ ] Naming conventions are correct (M365 Copilot app, not Chat)
