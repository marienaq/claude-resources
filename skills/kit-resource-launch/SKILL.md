---
name: kit-resource-launch
description: Stands up the Kit side of a free downloadable resource (template, toolkit, guide) the way Mariena set it up for the Team AI Manifesto: a "Paper & felt" landing page with an optional, unchecked Mellonmail checkbox, the download on the thank-you page in the browser from a Drive view link, the two tags, the two automation rules, the resource welcome sequence, and the issue's teaser. Drafts the operational copy, builds the landing page through the Kit connector, and ends with numbered Kit UI steps written the way she wants them, with exact values to paste. Carries her standing setup preferences and the Kit v2 landing-page gotchas. Mark runs it; she can invoke it directly. Never sends, publishes or sets Drive sharing. Use when a resource file is finished and needs its landing page and funnel. Triggers include "set up the landing page for this template," "put this download on Kit," "launch this resource," "build the funnel for the toolkit."
---

# /kit-resource-launch

From a finished resource file to a live Kit funnel, with every step that needs her hands written as a click-by-click list. Built from the Team AI Manifesto launch (2026-11-10, `marketing/newsletters/2026-11-manager-manifesto/`; design and evidence in `operations/ai-workflows/kit-resource-launch/design.md`). That launch is the pattern: start from its copy and its live page (form `{{kit-form-id}}`), not from a blank page.

**Where it sits.** `/mellonhead-word-document` builds the file before this runs. `/marketing-writer` owns voice. `/cross-post` and the issue's send details (`/marketing-writer`, "Mellonmail send details") cover the issue that teases the resource. This skill is the Kit plumbing and the copy that lives on the form and thank-you page.

## Read first

- `marketing/newsletters/2026-11-manager-manifesto/landing-page-copy-review.md` and `landing-page-form-and-thanks-review.md`: the final copy from the first launch.
- `writing-guide.md` §3.1.

## Her setup preferences (the default shape; ask only if a launch breaks it)

- **Never force the newsletter.** The opt-in is an unchecked checkbox on the form ("Newsletter (optional)" / "Yes, send me Mellonmail too"). Ruled 11/10.
- **The download happens on the thank-you page, in the browser.** No "check your email for the file." Kit's double opt-in / confirmation email is **off** for resource forms. Her words: "is there a way to just have them download from the browser instead of this convoluted enter your email, get an email, view the email, click, open browser."
- **The file lives on Google Drive**, Mellonhead shared drive, folder `Free Resources` (`{{drive-folder-id}}`). She sets link sharing herself (the agent's share call is blocked as a permission grant). The thank-you button uses the Drive **`.../view`** link, never `uc?export=download` (that one fails for people signed into several Google accounts).
- **Downloadable templates are Word files** (.docx), not Gamma, so leaders can edit and co-edit them (11/10). Build with `/mellonhead-word-document`.
- **Tags:** `Resource downloaded` (`{{kit-tag-id}}`) for everyone who submits any resource form; `Mellonmail opt-in` (`{{kit-tag-id}}`) from the checkbox. No tag per resource; the form itself records which resource.
- **Automations (she builds these in the UI):** Rule 1, trigger "Joins form [this resource]" → add tag Resource downloaded. Rule 2, trigger "Tag Mellonmail opt-in added" → skip if already subscribed to the newsletter site form (`{{kit-form-id}}`), otherwise subscribe to the welcome sequence. Trigger on the form, not on the tag (she hit this).
- **Two welcome sequences:** `{{kit-sequence-id}}` "Mellonmail welcome: resource downloads" and `{{kit-sequence-id}}` "Mellonmail welcome: direct signups." The resource one is reused for every launch; only its first line may mention the resource.
- **Links to the newsletter always go to `subscribe.mellonhead.co`.**
- **Copy:** the H1, sub line and closing heading are hers (drafting-order ruling); the operational copy (form labels, under-form line, thank-you line, buttons) is agent-drafted. Copy review: Mark for the byline lines, Cody for the form and thank-you mechanics.
- **Under-form line pattern:** say the format and answer both readers' catch: "Your template (a Word file) is on the next page. Leaving the box unchecked won't change your Mellonmail."
- **Teasing the download in the issue:** preview text plus a P.S. with the landing page link (`?utm_source=mellonmail`).
- **Don't poll or load-test the live page.** She asked to stop (11/10). A 404 right after publish is propagation; wait.

## Visual style: "Paper & felt" (Direction 4B)

- Fonts: Libre Baskerville (headings) and Inter (body), matching the Demo Days toolkit page. Brand coral `#F46665`, never red. Logo: the coral PNG.
- Buttons styled like the original whimsical landing page.
- Hero art: a tall felt-and-paper scene (Gamma `generate_image`, photo, 9:16, with the mood board as inspiration); she uploads it. Final for the first launch: `marketing/newsletters/2026-11-manager-manifesto/landing-hero-gamma-felt-trail-cropped.jpg`.

## Writing Kit UI steps for her

She does every Kit UI step herself and had never set up a funnel before the first launch. What worked:
- **Numbered steps naming the exact Kit screen and button**, in the order she'll click. One task per block.
- **Say why when it isn't obvious** (e.g. why trigger on the form, not the tag), in one line.
- **Give her the exact value to paste** (link, tag name, line of copy) inline.
- **When she sends a screenshot (`/ss`), answer from what's on screen**, not from what Kit's docs say the screen should show. Kit's labels moved under her twice ("I don't see incentive email").
- **Tell her up front what the connector can't do** so she isn't waiting: upload files, edit the confirmation/incentive email, build automations/rules, set a broadcast's SEO description, schedule a send, set Drive sharing.
- Options with a recommendation for any choice (her standing rule), never "which do you want" cold.

## Kit landing page gotchas (v2 editor, via the Kit connector)

- `update_landing_page` replaces the whole content tree; read first, change, write back.
- **Custom CSS pseudo-elements are hidden** under the absolute `.kit-section-edge-layer`, which paints section backgrounds. Texture, torn edges and kraft tags must be **section `backgroundImage` data URIs** or **html blocks**, not CSS `::before`.
- html blocks render in a shadow root and are **sanitized at publish**; test after publishing.
- Torn-paper strips need explicit zero padding and margin, or gaps show.
- `columnRatio` accepts fixed values only ("55-45" fails; "60-40" works).
- **SVG art loses texture and colour in Kit's preview**; rasterize to JPG (headless Chrome screenshot) before using.
- The second CTA button can link to `#get` to jump to the form.

## Steps

1. **Intake.** The resource file (final version, path), the issue that will tease it, and the row: `./operations/mh task find <resource words>`. If the file is not final, stop; the page links to one file.
2. **Say what is hers before starting**, in one short block: the connector-can't list above, and that the H1, sub line and closing heading come from her. If her issue or her notes already hold those lines, quote them as the proposal; otherwise ask for them with the first launch's lines as the example.
3. **Draft the operational copy** in `resource-launch.md` in the issue folder: form labels, the checkbox label, the under-form line (pattern above), the thank-you line and button, the second CTA. Start from the first launch's two review files. Run the voice check on her lines; send the form and thank-you mechanics to `cody` for review (through Orca when running as a subagent).
4. **Build the landing page** through the Kit connector: read the page, change, write back, in the "Paper & felt" style, against the gotchas above. Leave the hero as a placeholder until she uploads the art.
5. **Write her Kit steps** at the bottom of `resource-launch.md`, in click order, each with its exact value: upload the file to `Free Resources` and set link sharing; paste the `.../view` link into the thank-you button; turn off double opt-in for this form; Rule 1 and Rule 2 with the IDs above; check the resource welcome sequence's first line; publish.
6. **The teaser in the issue:** the preview text and a P.S. with the landing page link plus `?utm_source=mellonmail`, added to the issue's send details (`/marketing-writer`, "Mellonmail send details").
7. **After she publishes**, one check of the page. A 404 is propagation; wait and do not poll.

## Verification

- Every ID, link and tag name in `resource-launch.md` matches this file character for character.
- The thank-you button link ends in `.../view`, never `uc?export=download`.
- The checkbox is unchecked by default and the copy never implies the newsletter is required.
- Grep `resource-launch.md` for `—` and `--` (`writing-guide.md` §3.1).

## Report

To her, under 150 words: what is built in Kit, her steps by number with the first one named, the lines that are hers, the file path. Open `resource-launch.md` in Obsidian. Then `./operations/mh task deliver <key#id> --artifact <path to resource-launch.md> --actor mark`.

## Discipline

- Never send, schedule or publish a broadcast, and never publish the landing page; she does (Mark is draft-only).
- Never set Drive sharing or upload to Drive.
- Never write the H1, sub line or closing heading; those are hers.
- Never make the newsletter a condition of the download.
- Never poll or load-test a live page.
