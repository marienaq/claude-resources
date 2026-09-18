---
name: cross-post
description: Turns one published or near-final newsletter issue into variations for distribution channels beyond the email edition: the LinkedIn newsletter excerpt ("A slice of Mellonmail"), a native LinkedIn Article, and short teaser-plus-link posts for Fractionals United, Rands Leadership Slack, Transform Slack, and The AI Exchange. Every destination is specified on the same five things (length, job, what to keep, close, register) because each audience needs a different cut of the same issue. Source is always a newsletter issue, never an existing LinkedIn post (LinkedIn is a destination here, not a source). Each variation links back to the newsletter issue's live Mellonmail URL to drive signups. Applies the clearance gate, drops the naming-ruling risk, and adapts angle per channel audience. Use when Mariena wants a newsletter issue "cross-posted," "turned into short-form variations," or "sent to the other channels."
---

# Cross-Post: six channels beyond the email edition

Takes one already-written newsletter issue and produces the variations for channels that sit outside the AI Champions Content Series' own three-channel plan (ATD community forum, LinkedIn, newsletter, documented in `marketing/ai-champions-content-series/content-plan.md`). Built by generalizing the first real run, N0. That draft is the calibration reference: `marketing/ai-champions-content-series/cross-post/N0-cross-post.md`.

**This is a distribution layer, not a new content plan.** It never invents new arguments. Every line in every variation should trace back to something already in the source piece.

## When to use

Mariena hands you a finished or near-finished newsletter issue and asks for short-form versions to publish elsewhere that link back to it. Trigger phrases: "cross-post this," "build short-form variations of N-whatever," "do the same [cross-post] for [piece]."

**Source is always a newsletter issue.** Not an existing LinkedIn post, not an ATD forum thread. The existing LinkedIn feed posts (the L-series in `linkedin/`) are a separate, independently-drafted content stream; don't pull from them, don't check their status as part of this skill's work, and don't treat the LinkedIn Article this skill produces as something that needs to reconcile with them. If a source piece has a sibling L-series post covering similar ground, it's fine to note the overlap for Mariena's awareness (see N1's cross-post for an example), but that's a flag, not a dependency.

If she hasn't named a source newsletter issue, ask which one. Don't guess at a source.

## Before drafting: three checks, in order

**1. Load the voice rules.** Invoke `/marketing-writer` (or confirm it's already loaded this session) before writing anything. It carries the voice, the anti-patterns, and the review protocol this skill leans on. `writing-guide.md` §3.1 (zero em dashes, zero double hyphens) is an absolute rule, not a style preference; check the drafted file for `—` and `--` before calling it done.

**2. Run the clearance gate.** Check `content-plan.md`'s clearance list (needs Sharla's sign-off before publishing anywhere external) against every figure in the source piece, and also check the source piece's own file for any figure it flags as gated that isn't yet on that master list (N0 flagged its 70% figure this way, specific to that draft). Cut every gated figure from every variation. Where a number would have gone, use the qualitative version instead: the shape of the story, examples without counts, patterns framed as Mariena's own design judgment. That's the standing safe list (task 12 in `task-list.md`), and it's what let N0's five variations ship without waiting on Sharla.

**3. Check the naming ruling.** `task-list.md` task 10 ("story vs. offer") governs whether "I run an AI champions program" can appear as a named offer or has to stay a personal account. As of the N0 run this was still "waiting on MQ" and the default was: never name Mellonhead as a service, first person only, everywhere. Check its current status before drafting; if it's resolved, apply the ruling instead of the fallback default, and note in your draft's header which one you used.

**4. Try to resolve the real link before drafting, not after.** WebFetch `https://subscribe.mellonhead.co/profile/posts` and look for the source issue by its subject line (the newsletter's public title can differ from its internal working title, e.g. N0's file is "What to do after foundational training" but it published as "Your people are using Copilot as a search engine"; match on content, not just the title string). If found, confirm the specific post URL loads, then use that real URL in every draft instead of a placeholder. If the issue hasn't published yet, don't invent a URL: use `[Mellonmail link]` as the placeholder, say plainly in the header that the source hasn't sent yet, and flag it as an open item to resolve before publishing the cross-posts, not something to sequence around silently.

**5. Two LinkedIn rules from the platform side** (ruled 2026-09-14; current list and sources in `marketing/linkedin-distribution-mechanics.md`). Never the same text twice on LinkedIn: the Article must differ from any feed post drawn from the same issue, which the half-length rule below already forces, so this is a check, not new work. And the link goes in the body of the piece, not in a first comment; LinkedIn now reads a link in the comments as hiding it.

## The six destinations

Each destination is specified on the same five things, because each audience needs a different cut of the same issue (MQ, 2026-09-15):

- **Length.** How much of the source survives.
- **Job.** What this version has to do for this reader, which is what decides everything else.
- **What to keep.** Which parts of the source travel, and which stay on Mellonmail.
- **Close.** What the last line asks for.
- **Register.** How close to the source's own voice, and how much room for self-share.

These are the load-bearing part of this skill: get the angle wrong and the piece reads as spam in that room even if the prose is clean. When adding a destination, fill in all five before drafting.

### 1. A slice of Mellonmail (the LinkedIn newsletter)

The LinkedIn newsletter set up 2026-09-15 (`marketing/newsletters/linkedin-newsletter-setup.md`). Its readers subscribed on LinkedIn, so the whole job is to make them want the email edition.

- **Length:** a slice, not a half. Shorter than the Article. Enough to prove the issue is good; never enough to make the email unnecessary.
- **Job:** conversion, not indexing. A LinkedIn subscriber finishes it wanting the rest, and the rest is on Kit.
- **What to keep:** the hook, the scene (the one concrete moment the issue opens on), and the list or argument at header depth only, one line each. The reasoning under each point, the honest turn, and the "here is what I would do" close stay on Mellonmail; they are the reason to click.
- **Close:** "the rest of this issue is on Mellonmail" plus the live link, on its own line. Not a subscribe pitch; the link is to the issue, and the issue's page carries the signup.
- **Register:** the source's own voice, untranslated. Asides stay. It is her newsletter with a piece missing, not a summary of it.
- **Footer:** the canonical post-footer bio from `branding/bio.md` ("Post footer"), verbatim, below the link. It is the AI-engine-optimization move: same name, same organization, same words on every surface. Never rewrite it per issue.
- **Title:** LinkedIn asks for one per issue (100-character limit), plus a cover image. Default to the email issue's title so the two surfaces read as one piece and the search phrase matches; offer the hook's turn as the alternate. Give 2 to 3 options with a recommendation, the same as a subject line. (Added 2026-09-15 after the first slice run shipped without one.)

**Overlap rule with the Article (destination 2):** never both from the same issue without a deliberate reason. They are the same LinkedIn editor and "never the same text twice" applies. The slice is the default now that the newsletter exists; the Article is for an issue that needs to be found cold by search, and if both run, the Article must be a different cut, not the slice with more paragraphs.

### 2. LinkedIn Article (native long-form)

- **Length:** roughly half the source piece's word count. A ~900-word issue becomes a ~450 to 500 word Article. Standing rule: the full text is for indexing (SEO and GEO), so it needs real substance, but it must not duplicate the issue.
- **Job:** be read cold by someone with no relationship to Mariena yet, and be indexed. It has to work as a standalone argument, not a teaser.
- **What to keep:** the spine: the core tension, the reframe, one or two pieces of concrete evidence, the honest caveat or ceiling if the source has one. Cut the source's own reentry or gap framing (a newsletter coming back after a silence, for instance); it does not transfer. No pitch, no offer name (see the naming check above).
- **Close:** a subscribe CTA to Mellonmail. Not a sales CTA.
- **Register:** hers, compressed. The 9/10 revi-mark review of the ai-slop run found the Article had been "translated out of her register" by the compression; compress the structure, not the voice.
- **Title:** required, 100-character limit. The Article is read cold and indexed, so the title carries the reader's problem, not the answer (the same rule as the email subject line). Never the same title as the slice if both run.

### 3. Fractionals United, bulletin board channel

- **Length:** 3 to 6 sentences plus the link.
- **Job:** hand a fellow operator one idea they can use, and the link for the rest.
- **What to keep:** one real idea, usually the piece's central reframe, plus one line on why it is useful to someone running the same kind of work. First-person "I run a program" is fine here even under the conservative naming default; the room's premise is practitioners sharing what they are building.
- **Close:** the link on its own final line.
- **Footer:** none. A bio block in a Slack or forum post reads as a pitch. (Same for destinations 4 to 6.)
- **Register:** peer to peer. The channel name is the norm: it is built for members to post their own work, so self-share is expected. Pattern from MQ's 8/26 edit of this channel's draft (recorded in `/marketing-writer`): open on a standing observation ("I keep seeing..."), not a single dated client anecdote; no analytical aside on top of the observation; hedged first person ("what I think is reasonable") rather than editorial verdicts.

### 4. Rands Leadership Slack, #i-wrote-it

- **Length:** 3 to 6 sentences plus the link.
- **Job:** give an engineering leader the management pattern underneath the piece.
- **What to keep:** whatever generalizes past AI into leadership practice: distribution vs headcount, naming a ceiling instead of overselling a tier, the shape of a capability-building argument. The AI-tool specifics (Copilot, Power Automate, the tool layer) matter least here.
- **Close:** the link on its own final line.
- **Register:** explicit self-share channel, leadership angle first, AI second.

### 5. Transform Slack (HR)

- **Length:** short teaser plus link, but it can run slightly fuller than the other Slack channels because the audience overlap with the newsletter reader is highest.
- **Job:** reach the reader closest to Mellonmail's actual primary reader (an internal HR or L&D leader who believes people are the core of AI transformation, no in-house tech team; see the marketing-primary-reader memory).
- **What to keep:** the source's own framing, closest to intact of all the short versions. Do not compress hard.
- **Close:** the link on its own final line.
- **Register:** the source's voice. Do not assume this channel tolerates self-promotion the way Fractionals United and #i-wrote-it do; check with Mariena the first time a new community is added here, since "Transform Slack (HR)" was never specified as a self-share channel.

### 6. The AI Exchange, operators building playbooks

- **Length:** 3 to 6 sentences plus the link.
- **Job:** give a tactical operator the concrete thing.
- **What to keep:** whatever in the source is most operational: a definition, a test, a decision rule. The plateau-style observation or the personal story beat goes in the link-out line, not the hook.
- **Close:** the link on its own final line.
- **Register:** practical, specifics first, narrative framing last.

## Output convention

Write to `cross-post.md` inside the issue's own folder under `marketing/newsletters/<issue>/` (matches `marketing/newsletters/2026-09-ai-slop/cross-post.md`). One file per issue, next to its `drafts.md` and `planning.md`, so every version of an issue lives in one place.

*History (2026-09-15):* the first two runs wrote to `marketing/ai-champions-content-series/cross-post/N0-cross-post.md` and `N1-cross-post.md` under an older convention, and the 9/2 issue's file is `marketing/newsletters/2026-08-27-reintroduction-spine-cross-post.md`. They stay where they are (N0 is the calibration reference); do not write new ones there.

Structure:

1. **Header:** source file and version referenced, draft date, status (first pass vs. reviewed).
2. **What's carried and cut, across all destinations:** the clearance cuts made and why, the naming default applied, what travels in every version (the parts of the source that work past its original audience).
3. **One section per destination**, in the order above, each with a short posture-assumption note (flag anything you're inferring rather than confirmed) followed by the draft. The two LinkedIn destinations also get title options (and the slice a cover-image reminder); the Slack and forum posts do not have titles. Skip a destination only with a stated reason (for instance, the Article held back because the slice is running).
4. **Open items:** whether the newsletter link is real (per check 4 above) or still a `[Mellonmail link]` placeholder because the source hasn't published, the naming-ruling dependency if still open, and a note that the set hasn't been run through the marketing-writer review protocol yet if you haven't done that pass.

## After drafting

- Run the full marketing-writer review protocol (safety pass first, then scroll, arc, voice, line edit) against each version before calling them finished, or flag explicitly that you haven't yet and are handing over first drafts.
- Log the work as a task in the project's `task-list.md` (see `project-tasks` conventions), including what it depends on (source piece sent, clearance, naming ruling).
- Open the new file in Obsidian per Mariena's global file-viewing preference.

## Channel posture notes: update as evidence accumulates

One data point so far (N0, drafted 8/20). Provisional. When a future run gets real reaction from Mariena on how a channel landed, or when a new destination is added to the rotation, update the relevant destination's posture section above rather than starting a separate notes file, the same way `marketing-writer` maintains "Mariena's patterns on LinkedIn" inline.
