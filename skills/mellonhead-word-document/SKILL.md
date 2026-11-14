---
name: mellonhead-word-document
description: Builds a branded, editable Mellonhead Word file (.docx) in the "Paper & felt" style with docx-js, the Mellonhead counterpart to aba-word-document. Every file gets the full-bleed torn-paper collage header at the top of page 1, the logo footer, Georgia headings and Arial body; the components are beige fill-in callouts, stitched fill-in boxes, part headings with felt dots, tinted tables, idea cards and tip cards. Downloadable templates first (the Team AI Manifesto Template is the model); other Mellonhead Word files when she asks. Never overwrites a file; writes a new version. Use when a Mellonhead resource, template or worksheet ships as Word. Triggers include "make this a Word template," "build the .docx for the download," "Mellonhead-branded Word doc," "same look as the manifesto template."
---

# Mellonhead Word document

A Mellonhead .docx people can edit and co-edit. Downloadable templates are Word, not Gamma, so leaders can fill them in with their team (MQ, 2026-11-10). Built from the Team AI Manifesto Template v4 (`marketing/newsletters/2026-11-manager-manifesto/template-build/build.js`), which is the gold standard; this skill is that build made reusable. {{client}} documents are `/{{client}}-word-document`, not this.

**Who runs it.** Mark when the file is a marketing resource (with `/kit-resource-launch` after it); Orca or Iddy for any other Mellonhead Word file; Mariena can invoke it directly.

**The content follows the drafting-order ruling** (`feedback_drafting_order`): the words in a byline resource are hers or built from her draft. This skill builds the file; it does not write the argument.

## What is in the skill

| File | What it is |
|---|---|
| `scripts/mellonhead-docx.js` | The helper module: palette, fonts, the header, every component, `buildDocument`, `save` |
| `scripts/package.json` | Pins `docx` 9.0.2. If `scripts/node_modules` is missing: `npm install --prefix .claude/skills/mellonhead-word-document/scripts` |
| `references/sample-build.js` | A build script with the header and one of each component. Copy it as the start of a new document's build |
| `references/sample.docx`, `references/render/sample.docx.png` | Its output and page 1 rendered, to compare against |
| `assets/banner-cropped.jpg` | **The default header.** 2550x487, the collage with 153px cropped off the top |
| `assets/dot1.png` to `dot3.png`, `assets/logo.png` | Felt dots for part headings (coral, forest, plum); the coral logo for the footer |
| `assets/banner_collage.py` | Generator for a new collage, only when she asks for a different header |

## Style rules (MQ's calls in the v4 rounds, 2026-11-10 to 11/13)

- **Header:** the full-bleed torn-paper collage, `assets/banner-cropped.jpg` as is, a floating image anchored to the page edge at 816x156 px (8.5in wide, top of page 1). No objects in it: no trees, no illustrations. `header()` does this; do not rebuild it.
- **Two kinds of text, kept visibly apart.** Beige callouts with a kraft left rule (`tip()`, `prompts()`) and gray italic examples (`ex()`, "e.g. ...") are only for the person filling it in and are deleted after. Black text (`read()`) is what the team reads. The first callout in a template says so.
- **Fill-in areas** are dashed kraft "stitched" boxes (`fillBox()`), tables with fixed layout (`grid()`), idea cards in three columns (`ideaCards()`), stitched tip cards (`card()`).
- **Part headings** (`partHead(n, ...)`) have a felt dot and a dashed underline in the part colour: 1 coral `F46665`, 2 forest `23402F`, 3 plum `5B3F63`. Brand coral, never red.
- **Plain-language headings.** No "X, Y" headers.
- **A "Last updated" line** (`lastUpdated()`) under the title, rather than a status column. A list that gets reviewed can carry its own "Last reviewed" line.
- **Type:** Georgia headings, Arial body, Ink `1F2A24`. The palette constants are in the helper (`COLORS`, `PARTS`); the wider "Paper & felt" (Direction 4B) palette is in `marketing/newsletters/2026-11-manager-manifesto/design-brief-template.md`.
- Letter, 0.75in top and bottom, 1in sides; footer is logo, "A living document" (change with `footerText`) and the page number.

## Steps

1. **Content first.** The source is a markdown file of the document's words (for v4, `template-team-ai-manifesto.md`). Mark which lines are for the filler (callouts, examples) and which are for the team. If no content file exists for a byline resource, stop: it waits for her draft.
2. **Write the build script** next to the deliverable, in a `template-build/` folder: copy `references/sample-build.js`, change the `require` to the helper's absolute path (`{{repo}}/.claude/skills/mellonhead-word-document/scripts/mellonhead-docx.js`), and replace the children with the document's content. Column widths in `grid()` are DXA and sum to `mh.W` (9360).
3. **Build to a new versioned file:** `node build.js "<folder>/<Name> v<N>.docx"`. `save()` refuses to overwrite. Never reuse a filename she may have open or saved over (she saved an old Word copy over v2 once); bump the version.
4. **Look at page 1 before handing over.** `qlmanage -t -s 1200 -o <dir> "<file>.docx"`, then open the PNG and check the header runs edge to edge across the top with no white margin. QuickLook does not draw paragraph shading (beige callouts look unshaded) and shrinks one-cell boxes to their text; both are fine in Word, and the shipped v4 renders the same way. Check those two in Word or LibreOffice if she asks how the page looks.
5. Hand over the path and the PNG; open the .docx for her (`open "<file>"`).

**A new header** only on her ask: `python3 assets/banner_collage.py <out.jpg>` (2550x640, needs Pillow), then crop 153px off the top to match the default: `python3 -c "from PIL import Image;im=Image.open('<out.jpg>');im.crop((0,153,im.width,im.height)).save('<cropped.jpg>',quality=88)"`, and pass it as `header({ image: '<cropped.jpg>' })`. The default stays `banner-cropped.jpg`.

## Verification

- `node <build.js>` exits clean and prints `written`.
- Page 1 rendered and looked at: header full bleed at the top, title clears it, footer present.
- The words in the file match the content markdown; grep the build script for `—` and `--` in any copy (`writing-guide.md` §3.1).

## Discipline

- Never overwrite an existing .docx; write the next version.
- Never edit the gold-standard build in the manifesto folder; copy from `references/`.
- Never add objects or illustrations to the header or the template body.
- Never upload to Drive or set sharing; she does that (`/kit-resource-launch` covers the handoff).
