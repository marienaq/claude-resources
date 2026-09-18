# Custom Blocks (Activity-Specific Content)

Section 8 of the QRG activity pattern. Load when the activity research contains content that doesn't fit the standard sections 1-7 (specs: `references/section-specs.md`).

Most of the QRG follows a repeating template. Custom blocks are where a specific activity needs content that doesn't fit into the standard sections. These are often the most valuable parts of a QRG: they capture knowledge that's unique to this activity, this audience, or this organization.

**Custom blocks require a deliberate design conversation before writing.** Don't default to the standard template and skip what doesn't fit. If the activity research surfaces important content that has no home in sections 1-7, that's a signal to design a custom block, not to cut the content.

---

## Discovery: Identifying When Custom Blocks Are Needed

After reading the activity research and mapping to the standard sections, ask:

1. **Is there a prerequisite the reader might not have?** If the activity assumes the reader already has something (a style guide, a criteria list, access to a tool), some readers won't. They need a "what to do if you don't have this" pathway.
2. **Does the activity have a distinct sub-workflow?** If the research describes a related but separate technique that uses different steps or a different tool, it may deserve its own mini-arc rather than being crammed into the main Approach.
3. **Are there organizational or tool-specific rules that constrain the output?** Brand guidelines, formatting standards, compliance requirements: things the reader must follow that affect how they use AI for this task.
4. **Does the research contain depth that's important but would break the scannability of the standard sections?** Extended examples, decision trees, edge case handling, comparison matrices.

If any answer is yes, **discuss with the user before writing.** The decisions involved are:
- What type of custom block is it?
- Where does it sit in the section hierarchy?
- How much detail does it need?
- What's the framing? (prerequisite? extension? context? reference?)

---

## Custom Block Types

### Type 1: Prerequisite Workflow. "What if I don't have [X]?"

When the main approach assumes the reader has something they might not.

- **Chiefs example:** "Don't have a style guide?" in Document Rewriting: 4 expandable cards walking through how to create one (Start with purpose, Audit the document, Make decisions, Generate the guide)
- **Format:** For multi-step workflows: heading as a question, followed by expandable cards for each step (uses the same card patterns as the main Approach). For simple linear steps: a table with Step and What to Do columns is often cleaner (see Member Comms "Getting the Transcript": 4 steps in a table).
- **Placement:** Before the main Approach (if the reader needs to complete the prerequisite before the approach makes sense) or after the main Approach/Sample Prompt.
- **Framing:** Helpful, not judgmental. The reader didn't fail by not having a style guide. This is a common situation and here's what to do.
- **Detail level:** Enough to actually do it, not just acknowledge the gap. If the prerequisite workflow has 3+ steps, give it its own mini approach diagram.

### Type 2: Sub-Workflow. A distinct use case within the broader activity

When the activity research describes a related technique that uses different steps, a different tool surface, or produces a fundamentally different output.

- **Chiefs example:** "Supporting visuals" in the Visual aids activity: its own 4-step approach diagram (Define the aesthetic, Choose a concept, Generate the image, Review and adjust) with expandable cards and separate sample prompts
- **Format:** Full mini-arc. Can include its own approach diagram, expandable cards, and sample prompts. Essentially a section-within-a-section.
- **Placement:** After the main Pro Tips. Visually distinct from the main activity content.
- **Framing:** "Here's another way to use this capability" or "Here's a related technique." Not a replacement for the main approach: an extension.
- **Detail level:** As much as the main approach if the sub-workflow is equally important. Can be lighter if it's a "bonus" technique.

### Type 3: Organizational Context. Rules, guidelines, or standards that constrain the output

When the reader needs to follow specific rules that affect how they use AI for this task. These are often client-specific or role-specific.

- **Chiefs example:** "{{client}} visual guidelines" in Visual aids: Core visual rules (5 numbered items: Composition, Subject matter, Lighting, Color palette, Texture) plus Notable constraints
- **Format:** Numbered rules or structured reference content. Can use cards, but often works as a clean numbered list with bold labels. May include a constraints/exclusions sub-section.
- **Placement:** After the main Sample Prompt or after Pro Tips, depending on whether the reader needs the context before or after trying the technique.
- **Framing:** Reference material, not instruction. "Here's what applies to your context." The reader consults this, they don't follow it step by step.
- **Detail level:** Enough to apply correctly. Include specific values (hex codes, terminology, naming conventions) when they exist. Err toward precision. This is reference material.

### Type 4: Other Uses. Broadening applicability beyond the primary scenario

When the technique taught in the activity has clear applications beyond the specific pain point framed in the opening. Helps readers who come to the QRG for a different use case see themselves in it.

- **Member Comms example:** "Other uses for this approach" in Getting up to speed: three additional scenarios (reconstruct decision timelines, track approvals and feedback, surface stakeholder perspectives) where the same two-step extract-then-organize technique applies
- **Format:** Heading + brief intro sentence + bold scenario titles with 1-2 sentence descriptions each. Lightweight, not full approach cards.
- **Placement:** After Limitations + Refining your results, at the end of the section. It's an expansion, not core content.
- **Framing:** "[Primary scenario] is one use case, but the same technique works for other [category] situations." Don't reference the workshop.
- **Detail level:** Light. Each scenario gets a bold title and 1-2 sentences. Enough to recognize the situation and understand how the technique applies differently (e.g., "organize the second prompt around people rather than topics"). Not enough to be a standalone guide.

### Type 5: Extended Reference. Decision trees, comparison matrices, edge case handling

When the activity research contains important nuance that would overwhelm the standard Approach cards but that readers need when they encounter specific situations.

- **Format:** Tables, matrices, decision trees, or structured if/then guidance. Uses cards or formatted blocks, not prose. **For comparison tables** (e.g., human-efficient vs. machine-scorable language): use evaluative language on the "good" side ("Includes three adjectives..." not "List three adjectives...") so the criteria read as checkable statements, not actions.
- **Placement:** After Pro tips. Clearly labeled as reference/deep-dive content.
- **Framing:** "When you need to go deeper" or situation-specific headers. The reader dips into this when they have a specific question, not on first read.
- **Detail level:** As detailed as the situation requires. This is where the activity research depth lives that doesn't fit anywhere else.

---

## Information Architecture Decisions

For each custom block, resolve these questions with the user:

| Decision | Options | Depends on |
|----------|---------|------------|
| **Hierarchy** | Same level as Approach/Pro Tips? Nested under a parent section? Separate page? | How important is this relative to the standard sections? |
| **Placement** | Before Pro Tips (core)? After Pro Tips (supplementary)? End of section (reference)? | Does the reader need this before or after trying the main technique? |
| **Detail level** | Light (1-2 cards)? Medium (3-4 cards)? Heavy (own approach diagram + prompts)? | How much would a reader need to actually use this independently? |
| **Framing** | Question-based ("Don't have X?")? Topic-based ("Visual guidelines")? Task-based ("Supporting visuals")? | Is this addressing a gap, providing context, or teaching a technique? |
| **Collapsibility** | Always visible? Collapsed by default in web? | Is this core to the activity or consulted occasionally? |

**The principle:** Custom blocks should feel like they belong, not like they were bolted on. They use the same visual language (cards, headers, color system) as the rest of the QRG. The reader shouldn't notice a shift in quality or structure when they reach a custom block.
