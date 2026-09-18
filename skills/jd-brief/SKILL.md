---
name: jd-brief
description: Turns a job description for an AI enablement / adoption / champions role into a screened, researched prospect brief Mariena can write an outreach email from. Captures the req verbatim, screens it against the ICP and exits early when it fails, identifies the CHRO or CPO who actually owns the decision, researches what that person has published, synthesizes the gap between what they believe and what they are about to do, sets the goal for the outreach, and hands back the narrative arc as talking points. Stops at talking points and never drafts the email; Mariena writes her own copy. Use when a job req arrives from a job alert, an ATS search, or by hand. Triggers include "run jd-brief on this", "here's a job posting", "screen this req", "who's the buyer at this company", "build me a brief on this JD", "should I reach out about this posting".
---

# JD Brief

A job req for an AI enablement role is the strongest prospect signal available, because the company has named the problem in its own words and attached budget to it. This skill turns one into either a fast "no" or a brief Mariena can write from.

**The two things that make it work:**

1. **The early exit.** Most reqs will not clear the ICP. The screen runs before any research so time is not spent proving what a thirty-second check would have shown.
2. **The synthesis.** Research produces a dossier. A dossier does not produce an email. Step 6 is the step that turns one into the other, and it is the point of the skill.

**What it does not do: write the email.** Mariena drafts her own outreach in her own voice. This skill hands her the arc and the raw material. Offer a draft only if she asks for one to react against.

## The record and the prose are separate files

**`business-development/outreach/leads.tsv` is the structured record.** One row per company: fit grade, size, sector, buy signal, values, status, contact dates, outreach count, and a path to the brief. Tab-separated on purpose, so prose containing a `|` cannot corrupt a row the way it has corrupted task rows.

**The brief is the prose**, one file per company, unchanged.

**`leads.md` is generated** by `operations/build-leads.py`, grouped by fit. Never hand-edit it.

**Run `python3 operations/build-leads.py` at the end of every run that writes a row**, the same way every `mh` write regenerates the projects dashboard. It exits non-zero on a bad column count or an unknown fit or status, so a malformed row is caught by the run that wrote it rather than days later. Without this call the view is stale the moment the record changes.

Segmentation is by **lifecycle**, not by fit: `leads.tsv` holds what is live, `leads-closed.tsv` holds what is finished. Fit changes and would mean moving rows by hand; lifecycle only moves forward.

Every completed screen writes a row, including a rejection. A company screened out and not recorded gets researched again a month later.

## When to Use

- A job req arrives from a Gmail job alert, an ATS search, or a link she pastes
- She says "run jd-brief on this," "screen this req," "should I reach out about this posting"
- She asks who the buyer is at a company with an open enablement role
- Re-running after new information (the req reposts, the buyer changes, an article surfaces)

## Inputs

Two entry points.

**1. Pasted directly.** Req text, a URL, or a company plus role title. Text beats a URL: reqs come down, and the wording is the asset. This path skips the inbox and goes straight to step 1.

**2. Swept from the inbox.** `/jd-brief` with no argument processes everything in `business-development/outreach/job-descriptions/_inbox/`, oldest first. Each entry is a stub written by `/capture email` from a job-alert digest, carrying a company, a title, and a URL but not the posting body.

### Working the inbox

**Pre-screen before fetching.** A stub has a company and a title, which is enough to test size and sector. Kill the obvious misses there rather than paying to fetch a req from a 30,000-person consultancy. Write the verdict, delete the stub, move on.

**Then get the full text.** Try the URL. Workday, Greenhouse, and Lever postings usually fetch cleanly. **LinkedIn job URLs usually do not**, since they sit behind auth and bot blocking. When a fetch fails, say so and ask MQ to paste the text rather than proceeding on the snippet. A brief built from an alert snippet is not a brief.

**Clear every entry.** A prospect becomes a finished brief in the parent directory. A rejection becomes an index row plus a `signal-log.md` line with no archive file. The stub is deleted either way. An inbox entry left in place is a bug, not a backlog.

---

## The pipeline

Run in order. Steps 2 and 4 are gates: a failure at either stops the run and writes a verdict.

### 1. Capture

Write the posting into `business-development/outreach/job-descriptions/YYYY-MM-DD-company-role-slug.md` using `_template.md`.

**Capture the text verbatim.** Do not fix its punctuation, do not strip its em dashes, do not apply house style. This is a captured source document, not Mellonhead writing. `writing-guide.md` governs the analysis sections and nothing inside the quoted block.

Record: company, size, sector, location, posted date, req ID, source URL, capture date.

### 2. Screen (gate)

Run against `icp-screen.md` in this directory. **Four tests, and they do not simply all-must-pass.** Read the combining rules at the bottom of that file.

- **Size.** Sweet spot 250 to 1,000. Between 1,000 and 5,000 the question is whether the mandate is central or business-unit scoped, because above roughly a thousand people companies deploy a partner into a unit rather than through HR centrally
- **Sector.** Disqualifiers are fatal and cannot be overridden
- **Buy signal.** Sets the goal rather than passing or failing. A weak signal downgrades to relationship only
- **Values alignment.** Scored 0 to 9 across people-as-strategy, innovation, and collaboration. A score of 0 to 1 kills the lead whatever else passes

Values is a real gate, not a soft preference. Each dimension is a precondition for the delivery model: the champions program is cross-team by construction, so a siloed culture breaks its premise, and champions have nothing to model where experimentation is punished.

**Weight the evidence properly when scoring.** The req's own language outranks the buyer's writing, which outranks the careers-page values statement. Everyone claims innovation. **Counter-signals are more diagnostic than positive ones**, so look for AI framed as cost takeout, perpetual pilots, or IT owning it alone.

**If it fails:** write a short verdict to `../signal-log.md` with the reason, add an index row marked `Not a prospect`, and stop. Do not research a company that failed the screen. Say plainly which test it failed.

**If it is borderline,** say so and name the caveat rather than rounding to a yes. Progressive Leasing passed with a caveat on the word FinTech; that caveat is recorded, not buried.

### 3. Read the req for what it tells you

Before searching anything outside the posting, mine the posting itself:

- **The problem in their words.** Quote it.
- **How it is scoped.** "Responsibilities" means they are building a function. "Scope of the Engagement" means they are buying a project. This distinction changes the entire approach.
- **The reporting line,** if named. This hands you the org chain for free.
- **Named partner functions.** Where the work sits tells you who owns it.
- **Stated success measures.** These reveal how sophisticated the buyer is.
- **Self-disclosed constraints.** "Our team is lean" is a company answering the "why can't you build this internally" objection before it is raised.
- **What is absent.** No mention of existing programs, tools, or prior training is a gap, and gaps become questions in the email.

### 4. Identify the buyer (gate)

**Start with the req, not with a title search.** The reporting line and the partner functions are the company's own account of who owns this.

Then search, in this order:

1. Title variants, all of them: CHRO, Chief People Officer, Chief Human Resources Officer, EVP People, SVP Human Resources, VP Talent, Chief Talent Officer. Convention varies enormously by company and searching one form misses most of them.
2. `site:linkedin.com/in "Company Name" "<title>"` through a search engine. This works better than LinkedIn's own people search and needs no login.
3. `theorg.com` for published org charts.
4. Aggregator directory pages (ZoomInfo, RocketReach, Datanyze) carry name and title on free pages.
5. For public companies, the proxy statement and leadership page name executive officers outright.

**Then verify, every time.** From `../2026-08-25-chro-list-screen.md`: four of six "CHRO" headlines in one batch were personal brands rather than jobs, and one belonged to a plant-level HRBP manager at a 30,000-person company. Confirm the employer, confirm the title is a role and not a headline, confirm they are still in the seat.

**Choose the entry point from where the req sits, not by seniority.**

| Req sits in | Enter at |
|---|---|
| The People or HR team | CHRO / CPO. They hold the budget |
| L&D or Talent, reporting up | The function head, with the CPO as the approval path |
| Technology, Digital, or an AI team | **Enter there.** The CAIO, CISO, Head of AI, or CIO who owns the mandate. At the target size these are small teams with a delivery arm and no capability arm, which makes them buyers rather than a reason to walk (MQ, 2026-08-31). Apply the capacity test in `icp-screen.md` disqualifier 2 before assuming the account is dead |
| A fractional or interim AI exec building out a function | Enter there, and consider whether the better shape is **partnership rather than a sale.** See the partner-channel note below |

**The fractional-exec partner channel.** Companies at this size often bring in a fractional Chief AI Officer or equivalent who then has to assemble a team to deliver. That person is not only a prospect; they are a natural referral partner, because education and enablement is the piece they most often do not build themselves. When a req or an account turns out to be led by a fractional exec, flag it as a **partner candidate** alongside the buyer read, and route it the way `anne-griffin-partner` and `jamie-christensen-partner` are handled rather than treating it as a straight sale. (MQ, 2026-08-31.)

**Handle these honestly rather than forcing a name:**

- Under roughly 500 people there may be no CHRO at all. It will be a VP of HR, a Director of People, or HR under the CFO. An empty title search is information about the company, not a failed step.
- **Never fill a gap with a plausible name.** Output a confidence level and a fallback contact. Match what `../2026-08-25-cold-outreach-targets.md` already does with "(name unverified)."

**If no buyer can be identified with reasonable confidence,** the lead is dead for now. Record it and stop. Do not proceed to research a person who has not been confirmed.

### 5. Research the buyer and the company

Now, and only now, spend the research time.

**On the buyer:**
- What they have published. Trade press, bylined articles, podcasts, conference talks. **A buyer who is quiet on LinkedIn may be loud in trade press;** check HR Executive, Chief Learning Officer, HR Brew, Training Industry, and industry-specific outlets before concluding they have no public voice.
- Their vocabulary. Coined terms and repeated phrases matter more than the argument's summary, because using their word back is what proves you read it.
- What they have committed to publicly. Hard to walk back, and good to build on.
- Awards, recognition, tenure, prior organizations.

**On the company:**
- Size, sector, ownership, recent news
- Other open reqs in the same area, and whether this one is a repost or has a sibling title
- Any prior relationship anywhere in the repo. Grep before assuming cold.
- Existing AI signals: announcements, tooling, prior programs

### 6. Synthesize (the point of the skill)

One question:

> **What do they believe, what are they about to do, and where is the gap between the two?**

The gap is the email. It is not a contradiction to catch them in and it is not a flaw to point out. It is the place where their own thinking and their own next move have not yet been reconciled, which is exactly where an outside perspective is worth reading.

Worked example, Progressive Leasing: in March the CPO published that the middle management layer is thinning and learning has to route around it. In August her team posted a req asking someone to equip managers to lead an AI transition. Not a contradiction. The space between them is the whole problem.

**Test the synthesis before moving on:** would the buyer repeat this observation to someone on their team? If not, it is flattery or it is obvious, and neither earns a reply.

### 7. Set the goal

Never default. Choose for this account and give the reasoning:

| Goal | When it fits | Cost |
|---|---|---|
| **Replace the hire** | The req is scoped as an engagement and unfilled, and the scope plainly exceeds one person | Argues against a decision they already made and published. Reads as a vendor jumping their process |
| **Complement the hire** | Almost always the right default. Whoever they hire lands alone against an enterprise mandate | None. Non-competitive, keeps "replace" alive if the req goes unfilled |
| **Relationship only** | The account fails on fit but the person is visible, publishes, or sits in a useful network | Slow. Score as intelligence, not pipeline |

**Name the timing bet.** If the req fills and it goes well, the opening closes. Say how long the window looks and whether that argues for going now.

### 8. Build the arc (talking points, not copy)

Five beats. Fill each with **this account's** material. Write them as jobs to be done plus the raw material, never as sentences to paste.

1. **Subject line.** Does anti-delete work before the email opens. Must signal engagement with their thinking, not their job posting.
2. **Orientation, two sentences max.** Who is this, why is it in my inbox, and that Mariena is not a candidate. Trap: her motivation or founding story. The reader has no reason to care yet.
3. **The bridge, one sentence.** How she got from the posting to their article. Without it, the reader fills the gap with "I am on a list."
4. **The observation.** The synthesis from step 6. Not agreement, not praise. Trap: "I loved your article" costs nothing to write, so it signals nothing.
5. **Standing, after the idea and never before.** Evidence, not credentials. A year running the thing is evidence; caring about the problem is not. Trap: swelling into a capabilities paragraph.
6. **The question.** Something only they can answer, about their situation, that a thoughtful person would enjoy answering. Not a meeting ask, which asks them to spend rather than to think. Test: if a stranger could answer it, it is too generic.

**Governing principle to state in every brief:** everything before the reader's first "huh, that's true" is overhead. Length is fine. Overhead is not.

**Then say this out loud in the brief:** the observation in beat 4 has to be something Mariena actually noticed and actually believes, or it will not survive a reply. Tell her to read the source article herself. The arc says where the reaction goes; it cannot supply the reaction.

### 9. Contact details

- Email pattern for the domain, with the method: search `"@domain.com" email format`; Hunter, RocketReach, LeadIQ, and Anymail Finder publish patterns with confidence percentages on free pages. If they disagree, hunt a real published address with `"@domain.com" -site:domain.com` or `filetype:pdf "@domain.com"`, and check SEC filings for public companies.
- Flag which domain, where a subsidiary and a holding company both exist.
- **Verification step before sending,** and note that a catch-all domain will return "accept all" and cannot be confirmed.
- **Warm path check.** Mutual connections change the note entirely. Worth sixty seconds before any drafting.
- **Recency flag.** Per `feedback_outreach_recency_check`, ask MQ to veto anyone she has contact with that the files would not know about.

### 10. File

- Archive entry complete, with capture and analysis kept visibly separate
- Index row added to `business-development/outreach/job-descriptions/README.md`
- Cross-reference written to `../signal-log.md` with the verdict
- Add the row to `business-development/outreach/leads.tsv` only when the verdict is a live prospect and MQ has cleared the recency check

---

## Hard rules

These are safety rules, not style preferences. They apply to every brief.

- **ABA and TWG may be named to a prospect (MQ ruling, 2026-09-01).** This **supersedes** the 8/18 default of writing "a national trade association," which Revi found does not survive contact with the reader: a banking buyer resolves the description to one organization instantly, so the anonymization concealed nothing and cost the credential its force. `branding/bio.md` already names both publicly. **Naming a client is not the same as using its numbers.** Sharla's clearance gate covers the champions figures and is unchanged, so a note may say who the work was with but may not carry a figure. Choose the client by the reader's industry; see `[[client-naming-in-outreach]]`.
- **No figures** while Sharla's clearance on the content-series numbers is pending. Describe shape without numbers.
- **No pricing.** Enablement prices as monthly retainers and the amounts are undefined. There is nothing to quote.
- **No offer, no meeting request** in the arc. Per Rule 8 the ask is a conversation. Per the 2026-08-18 rule, the job of the note is to engage the person and learn their problem, and what-we-sell language appears as one light line at most.
- **AI is never the hero,** and here it is usually not even the subject. The buyer's subject is capability, learning, or change. AI is the occasion.
- Voice and style: `writing-guide.md`. Positioning: `strategy/what-we-sell.md`, which wins over anything remembered.

---

## Intake: how reqs arrive

**1. Job alerts into Gmail, automatically.** Standing LinkedIn and Indeed alerts on "AI enablement," "AI adoption," "AI champion," "AI literacy," "AI workforce enablement" deliver daily. A Gmail filter auto-labels them `job-alerts`, and `/capture email` sweeps that label on its own track, splitting each digest into inbox stubs. No per-email tagging: alerts arrive too often for a manual habit to survive.

**2. ATS searches, run by hand.** Workday, Greenhouse, Lever, and iCIMS postings are where mid-sized non-tech companies actually land, and they do not always surface in LinkedIn alerts. Strings live in `../linkedin-listening-searches.md`. Drop findings into `_inbox/` or paste them straight in.

### The flow, end to end

```
Gmail job alert  ->  /capture email  ->  _inbox/*.md  ->  /jd-brief  ->  brief + signal-log
   (auto-labeled)      (splits digest)     (stubs)         (screens)      (or a rejection row)
```

### Directory map

```
business-development/outreach/job-descriptions/
  _inbox/          pending reqs; presence of a file is the only state
  _template.md     output shape
  README.md        purpose, operating principle, index of everything screened
  YYYY-MM-DD-*.md  finished briefs (prospects only)
```

**The operating principle behind both:** LinkedIn is a discovery surface for **companies**, through job reqs. It is not a contact channel for **buyers**, who are systematically quiet on it. The searches find the account; email and introductions reach the person.

---

## Worked example

`business-development/outreach/job-descriptions/2026-08-25-progressive-leasing-ai-workforce-enablement-consultant.md` went through this whole sequence by hand before the skill existed. Read it for what a finished brief looks like, including how a borderline ICP call and an unresolved approach question get recorded rather than smoothed over.

## Files this skill touches

| Path | Role |
|---|---|
| `.claude/skills/jd-brief/icp-screen.md` | The screen. Source of truth for step 2 |
| `business-development/outreach/job-descriptions/_inbox/` | Intake queue. Read it, clear it |
| `business-development/outreach/job-descriptions/` | Archive, template, index |
| `business-development/outreach/signal-log.md` | Verdict cross-reference |
| `business-development/outreach/leads.tsv` | The structured record; live prospects land here as a row |
| `business-development/outreach/linkedin-listening-searches.md` | Intake search strings |
| `strategy/what-we-sell.md` | Positioning, read at runtime |
| `writing-guide.md` | Voice and style |
