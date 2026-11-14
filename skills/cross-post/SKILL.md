---
name: cross-post
description: Turns one Mellonmail issue into two distribution pieces, the LinkedIn newsletter slice ("A slice of Mellonmail") and one 3 to 5 sentence teaser for the single community that best fits the issue's topic (Transform Slack, Rands Leadership Slack, Fractionals United, or The AI Exchange). The LinkedIn Article is opt-in, only for an issue worth being found cold by search. Runs automatically right after an issue's Kit send details are written, because the slug fixes the live URL, so it never waits for publish. Every link carries its own utm_source tag so signups can be traced to a channel. Applies the clearance gate and the naming ruling; only the slice goes to revi-mark. Ends in a copy-ready block (where it goes, title, exact text with the tagged link). Source is always a newsletter issue, never a LinkedIn post. Use when send details have just been written, or when Mariena says "cross-post this," "build the short versions of this issue," or "send this to the other channels."
---

# Cross-Post: the slice plus one community

Takes one newsletter issue and produces what she posts beyond the email edition: the LinkedIn slice, one community teaser, and (only when she asks) a LinkedIn Article. Ruled 2026-10-28 (`ai-workflows#35`): six bespoke pieces per issue were taking too long and four sets piled up unposted, and nothing showed whether any channel had brought in a subscriber (`marketing/newsletters/analytics/2026-10-28-kit-broadcast-analysis.md`).

**A distribution layer, never new argument.** Every line traces to the finished issue (`feedback_drafting_order`: the blank page is hers). List every line that is not in the issue under the piece it belongs to.

## When to use (the one trigger rule; other files point here)

- **Automatically, at the Kit send-details step.** The moment a send-details block with a slug is written for an issue, run this skill in the same pass. That is the send-details checklist in `/marketing-writer` ("Mellonmail send details"), which every issue goes through, whether it came from `/newsletter-from-transcripts` or she drafted it herself. Do not wait for publish: the slug fixes the URL.
- **On ask:** "cross-post this," "build the short versions of N-whatever."
- **Backstop:** `/do-work` Step 2c flags a published issue with no `cross-post.md`.

Source is always a newsletter issue: never an L-series LinkedIn post or an ATD thread (that stream is drafted separately; overlap with one is a flag for her, not a dependency). If no source issue is named, ask which one. If the send details carry no slug yet, ask for it rather than guessing a URL.

## Before drafting: five checks, in order

1. **Voice.** Load `/marketing-writer` (or confirm it is loaded). `writing-guide.md` §3.1: grep the file for `—` and `--` before calling it done.
2. **Clearance gate.** Check every figure in the issue against the clearance list in `marketing/ai-champions-content-series/content-plan.md` and anything the issue's own files flag as gated. Cut every gated figure from every piece; use the qualitative version (the shape of the story, examples without counts). The standing safe list is `content-series#12`.
3. **Naming ruling.** `content-series#10` (story vs. offer). While it waits, the default holds: first person only, never Mellonhead named as a service. If it has been ruled, apply the ruling. Say in the header which one you used.
4. **The link.** Build it from the slug: `https://subscribe.mellonhead.co/posts/<slug>`, plus the piece's source tag (below). Before publish, the header says "URL built from the slug, not live yet: open it once the issue sends and confirm it loads before posting anything." If the issue has already published, find it at `https://subscribe.mellonhead.co/profile/posts` (match on content; the public title can differ from the working title) and confirm the URL. If she changes the slug in Kit, every link in the file changes with it. If she edits the issue body after this runs, re-read the issue before she posts and cut or fix any teaser or slice line that no longer appears in it: the pieces quote her finished issue, never a version she has moved past.
5. **LinkedIn platform rules** (2026-09-14, `marketing/linkedin-distribution-mechanics.md`): never the same text twice on LinkedIn, and the link goes in the body, never a first comment.

## Source tags (one per piece, so we can test whether Kit shows which channel brings people)

Append `?utm_source=<tag>` to the issue URL. One tag per destination, fixed, so the counts add up across issues:

| Piece | Tag |
|---|---|
| A slice of Mellonmail | `linkedin-slice` |
| LinkedIn Article | `linkedin-article` |
| Transform Slack | `transform` |
| Rands #i-wrote-it | `rands` |
| Fractionals United | `fractionals-united` |
| The AI Exchange | `ai-exchange` |

**Open item, not verified (2026-10-28):** Kit's API v4 subscriber record has `referrer` and UTM fields (`developers.kit.com`, list subscribers), but whether a signup made on a newsletter-site post page carries that page's `utm_source` into them has not been tested. Until it is, treat the tags as a bet. The test: subscribe a spare address through one tagged link, then check that subscriber's referrer in Kit. Record the answer here.

## Piece 1: A slice of Mellonmail (always)

The LinkedIn newsletter (`marketing/newsletters/linkedin-newsletter-setup.md`). Its readers subscribed on LinkedIn; the job is to make them want the email edition.

- **Length and keep:** a slice, not a half. The hook, the opening scene, and the list or argument at header depth, one line each. The reasoning under each point, the honest turn and the close stay on Mellonmail; they are the reason to click.
- **Register:** her voice untranslated, asides kept. Her newsletter with a piece missing, not a summary.
- **Close:** "the rest of this issue is on Mellonmail" and the tagged link on its own line. Then the post footer from `branding/bio.md` ("Post footer"), verbatim, never rewritten.
- **Title:** 100-character limit. Default to the email subject so the two read as one piece; offer the hook's turn as the alternate. 2 to 3 options with a recommendation. Plus a cover-image reminder.

## Piece 2: one community teaser (always)

- **Shape:** 3 to 5 sentences in her words from the issue, carrying one idea (usually the central reframe), then the tagged link on its own last line. No title, no footer (a bio block in a Slack or forum post reads as a pitch).
- **Only the first line is tuned to the room.** The rest is the same teaser whichever room it goes to.
- **A second room** only when she asks: the same teaser, a new first line, that room's tag.

**Picking the room.** Recommend one for topic fit, name the runner-up, give the reason in a line. These notes are how the room is picked and how its first line is tuned:

| Room | Pick it when the issue is about | Tune the first line to | Note |
|---|---|---|---|
| Transform Slack (HR) | people, HR, L&D, managers; the reader closest to Mellonmail's own | the issue's own framing, nearly intact | Self-share tolerance never confirmed; ask her the first time it is picked |
| Rands #i-wrote-it | leadership practice that generalizes past AI | the management pattern underneath; AI second | Explicit self-share channel |
| Fractionals United bulletin board | how operators build and run the work | a standing observation ("I keep seeing..."), hedged first person, no analytical aside | Her 8/26 edit (`/marketing-writer`); "I run a program" is fine here |
| The AI Exchange | the tactical how: a definition, a test, a decision rule | the concrete thing first; the story goes in the link-out line | Specifics first, narrative last |

## Piece 3: LinkedIn Article (opt-in only)

Not drafted by default. If the issue carries a phrase people search for, offer it in one line under Open items; draft it only on her yes. When drafted: about half the issue's length, a standalone argument read cold (the spine, one or two pieces of evidence, the honest ceiling), a subscribe close, her register compressed in structure but not voice, a title carrying the reader's problem. Never the slice with more paragraphs, never the slice's title.

## Review

- **No reviewer pass while `revi-mark` is paused** (MQ, 2026-11-08). The slice and any Article go straight to her, after the clearance gate, the naming check, the dash grep and your own voice check against `writing-guide.md`.
- **The teaser** gets the same checks: the clearance gate, the naming check and the dash grep.

## Output: `cross-post.md` in the issue folder

`marketing/newsletters/<issue>/cross-post.md`, next to `drafts.md` and `planning.md`. (The N0 and N1 files under `marketing/ai-champions-content-series/cross-post/` and `marketing/newsletters/2026-08-27-reintroduction-spine-cross-post.md` are an older convention; leave them, write nothing new there.)

1. **Header:** source file and the version used (if a reviewed fix was never applied to the issue body, say which version of the line you used), date, link status (built from slug, or confirmed live), review status.
2. **Checks and picks:** clearance cuts and why, the naming default or ruling, the room picked with its reason and the runner-up, the slice's title options and cover reminder.
3. **Open items:** link not live yet, open naming ruling, the Article offer if any, the Kit UTM test while it is open.
4. **Ready to post (last, and the only copy of the final text).** For each piece: where it goes, the title if it has one, the exact text in a fenced `text` block with the tagged link in it, and "Lines not in the issue" under it. Posting is copy and paste.

Example of one entry:

````
### Transform Slack

```text
<first line tuned to the room>
<three or four sentences from the issue>

https://subscribe.mellonhead.co/posts/<slug>?utm_source=transform
```

Lines not in the issue: <list, or "none">
````

## After drafting

- `./operations/mh task find <issue words>` for the issue's cross-post row; if none, `./operations/mh task add content-series "Post the <issue> cross-posts" --note "Waits on the issue sending. Before posting: open the slug URL and confirm it loads, and re-check the pieces against the sent issue." --actor mark`. Then `./operations/mh task deliver <key#id> --artifact <path to cross-post.md> --actor mark`.
- Open the file in Obsidian.
- When she reacts to how a room landed, update that room's row above; this skill is where the posture notes live.
