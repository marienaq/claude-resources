---
name: curriculum-update
description: Updates a course that is already built and live when its source of truth changes (a revised policy, a new legal ruling, a stakeholder decision). Runs source verification, a live-state audit, cross-document reconciliation, register extraction, a single paste-order implementation checklist, ripple analysis, and a stakeholder-facing change log, and it stops before any copy is written. Use when an existing course needs changing rather than building, when several working documents about the same course disagree, or when a change is large enough that someone will need one document to work from at the keyboard. Triggers include "the policy was revised, what changes in the course", "write me a change log for the email", "audit this course against the new version", "build me the change list", "these docs contradict each other", "what else does this change break".
---

# Curriculum Update

Updating a live course is not building one. The failure modes are different, and this skill exists because the build skills do not cover them.

Building starts from a brief and ends at a deliverable. Updating starts from **a source document that moved** and ends at **a list of edits someone will make by hand, in a tool, one block at a time**, against a course that already has learners in it. The risks are stale internal documents, invisible live state, ripple into places nobody thought to check, and copy that drifts away from the voice the shipped course already uses.

**This skill stops before copy is written.** That separation is the point. When analysis and copywriting run together, the copy inherits the analysis's credibility and nobody checks it against the shipped artifacts. Write copy in a separate, gated pass, against the register spec this skill produces, and route it through `revi-iddy`.

## When to use

- A source document was revised and the course has to catch up.
- A stakeholder or legal ruling lands that changes what the course teaches.
- Several working documents about the same course disagree and you do not know which is current.
- A change is large enough that Mariena will be at the keyboard for an hour and needs one document.

Do not use it for a course being built for the first time. That is `/session-brief` into the build skills.

## Inputs

Required: the source document itself (not a summary), the course folder, and whatever working documents already exist about it.

Read the course folder's `context.md` first if one exists. Stakeholder rulings (dated, near-verbatim, source cited) and open questions live there, not in task-list cells. It is the reconciliation anchor for Step 3, and anything this update surfaces (a new ruling, a new open question) gets written back to it.

Ask for, and do not invent: which blocks are already live, and whether any rulings have been made that are not written down yet.

---

## Step 1: Verify against the source, never a summary

**Open the source document and read the section that governs the change.** Not an audit of it, not a change list quoting it, not a brief that quotes the change list.

This step exists because it is where the highest-value corrections come from. Internal documents propagate: one document invents a definition, three more quote it, and by the fourth nobody remembers it was invented. If a definition, threshold, or rule appears in several internal documents, **find its origin** before treating it as settled.

Produce: a short list of what the source actually says, quoted, with section numbers, and a flag on anything the internal documents assert that the source does not.

### When the course quotes the source, carry the clause that constrains

A citation is used to give a practice authority. Quote only the permissive half and the citation undercuts the practice instead.

The case this is written from: the course quoted the policy as saying staff are "not required to disclose every instance of AI use," then asked learners to tell their supervisor whenever AI materially contributed. The next sentence in the policy is the one that closes the gap, and it was left out. A learner who reads the quote has been handed the argument for ignoring the ask.

So: **read one clause past the end of your quote.** If it qualifies what you quoted, carry it, paraphrased plainly if the full wording is too long for the block. If you cannot carry it, cite the section without quoting it.

Related, and checked in the same pass: **a source that says what to do often does not say where to go.** Routes, mailboxes, owners, and turnaround times are the things internal documents invent most readily, because they are what staff actually ask for. If the course names a destination, find it in the source. If it is not there, the destination is an inference. Mark it, keep it if it is the sensible reading, and put it on the question list for whoever ruled on the substance.

## Step 2: Audit the live state

**What is actually in the course right now**, as distinct from what the documents say is in it.

- PDF or print exports do not render custom code blocks. If the course has them, an export tells you nothing about their contents. Say so rather than assuming.
- Check whether a block that documents describe as live was ever actually shipped.
- Where you cannot verify, mark the item **verify live first** and do not write instructions that assume a starting string.

## Step 3: Reconcile the working documents against each other

List every document that describes this course and diff them. Expect contradictions and record each one.

What to check: file references (does the change list point at a superseded file?), block numbering (do two documents number the same block differently, or collide with a block that is already live?), ordering (does a document list changes in a different order than the course actually runs?), pacing arithmetic, and any figure that appears in two places.

Produce a numbered table of contradictions and which side is right. This table goes into the final checklist so the resolution is traceable.

## Step 4: Extract the register spec

**Before any copy is written for this course, derive the house pattern from the artifacts that already shipped.** This is mechanical and takes about ten minutes. Skipping it is what produces copy that reads as generically AI-written next to the existing course.

Sample at least three shipped blocks and record:

1. **Label form.** Are headings noun phrases, questions, imperatives? Count them. If no shipped block uses a question as a heading, new copy does not get to introduce one.
2. **Voice.** Declarative, imperative, or second-person conversational? Quote three examples.
3. **Aphorism budget and placement.** A short memorable line stating a principle. Where do the shipped blocks put them, and how many per block? Aphorisms outside a labeled slot are the most common drift, because each one reads fine alone and only the stack gives it away.
4. **Sentence count per block**, for a block doing a comparable job. This is usually the real density measure; sentence *length* tends to be fine while sentence *count* doubles.
5. **Mean and max sentence length**, in words.

Write the spec into the checklist as its own section, with the numbers, so it constrains everything written afterward and can be checked mechanically.

## Step 5: Build one paste-order implementation checklist

One document. This is the deliverable Mariena works from at the keyboard, and everything else becomes a reasoning record behind it.

Requirements:

- **One numbered sequence in the order the work will actually be done**, with every changed block interleaved at its real position. Not one list per source document, and not new sections appended after existing ones.
- **Copy inline.** She should never have to open a code file or a second markdown document while working. For a code block, name the file to paste and inline any strings that live inside it so they can be verified without opening it.
- **Per item:** block number, block type, edit or new insert, what it says now, what it becomes, and the Rise-side setup where it applies.
- **The reasoning collapsed**, pointing back to the source document. At the keyboard she needs the what, not the argument.
- **A reconciled pacing total.** Price prose and dense grids or bullet lists at different reading rates; using one rate for both is how estimates come in low. State the assumption the total rests on. Rebuild any trim menu against the real total, not the one it was written for.
- **Blocked items flagged up front**, so she does not hit one mid-pass. Before you write "blocked", see the check below.
- **Consolidated open items and a decision log**, not duplicated across sections.
- **A traced drop list**, and no completeness claim without one. See below.

When it supersedes existing documents, put a banner at the top of each of those naming this file and saying what the old one is still good for. Do not delete them.

### Verify every completeness claim before you write it

**"Nothing was dropped" is a finding, not a sentence.** When this checklist consolidates two or more working documents, walk the numbered items of each source in order and confirm every one lands somewhere: an item here, or an explicit entry in the drop list with a reason. Build the trace table first; write the summary sentence from it, never ahead of it.

The failure this prevents: an item marked essential, and already shown to the client in a shared deck, fell out when two documents were merged, and the merged file carried a heading reading "Nothing instructional was dropped." The trace table underneath it is what eventually surfaced the gap, three passes later. The table was doing its job; the sentence above it was not.

Include the trace table in the final document (old item numbers to new), because it is also how anyone reading the superseded documents finds where their item went.

If something was genuinely dropped, say what the course no longer teaches as a result, in one line. A drop with a reason is a decision. A drop without one is an accident that has not been noticed yet.

### Before flagging an item blocked on a stakeholder

**Search the repo for the artifact, and state precisely what is missing.** An item can sit blocked for months on an ask nobody re-examined.

The case this is written from: an item was marked blocked on a stakeholder since March, waiting for a policy PDF. The PDF was in the repo the whole time. What was actually missing was a *hosted link* staff could open, which is a different and much smaller ask, and half the blocked item (a revision number that could be read straight off the file's cover page) was not blocked at all.

So, three questions before the word "blocked" goes in:

1. **Is the artifact already here?** Search the repo. Check the compliance, reference, and source folders, not just the course folder.
2. **What is actually needed, in the smallest terms?** A file, a URL, a name, a yes or no. "Send me the policy" has a different response time than "what is the intranet link for this."
3. **What can proceed now?** Split the item. A label change that is correct regardless of the destination goes in today; only the destination waits.

A blocked item should name the smallest ask that unblocks it and what ships without it.

## Step 6: Ripple analysis

For each change, ask what elsewhere in the course now contradicts it. This is the step that catches the expensive things.

Check at minimum:

- **Assessments.** A knowledge check or sorting activity may now grade learners against a rule that just changed. This is the highest-severity ripple there is and it is easy to miss, because activity content usually lives in code rather than prose.
- **Callbacks and payoffs.** A line late in the course that pays off an earlier section may no longer be true.
- **Metaphors and defined terms.** If a phrase is removed from where it was defined, find every later use that depended on the definition.
- **Counters.** Hardcoded totals ("of 5", "of 6") in markup that a trimmed or extended set silently breaks.
- **Other courses in the program** that share vocabulary with this one.
- **Downstream artifacts** that must match: the interaction map, the QRG, any course that references this one.

### Run it backwards too: sweep for copy the ruling silently invalidated

Everything above runs one direction: this change, what breaks. **A ruling runs the other direction.** It settles a question the course was already answering, in places that are on no change list, because they were written before anyone asked the question and they still look correct.

The case this is written from: a guideline card said "If you find a mistake after the work is out, report it." It had been in the course for months, it was on nobody's list, and it read fine. Then legal ruled that only errors that could affect a decision, a member, or an external communication need reporting. The sentence now taught a threshold the ruling had rejected, and the new activity ten blocks later graded learners wrong for following it. Nothing in the source-document diff touched that card.

So for every ruling in the log, not every change in the diff:

1. **Name the question the ruling settled**, in plain words. "When does a mistake have to be reported."
2. **Search the whole course for anything that answers it**, prose and code both. Search the concept, not the ruling's vocabulary; copy written before a ruling will not use its words.
3. **For each hit, ask whether the ruling makes it wrong, incomplete, or fine.** Wrong is a required fix. Incomplete usually means it states a rule without the threshold, which is worth fixing when the threshold is the point.
4. **Check it against the assessment**, in both directions. When prose and an activity disagree, work out which one the ruling supports before assuming the older one is right.

Pre-existing copy that contradicts a ruling is more dangerous than a missing update, because it will be read as current and nobody flagged it. Rank it accordingly.

## Step 7: Write the stakeholder change log

Always produce this, without being asked. It is a separate file from the paste-order checklist and it has a different reader: the stakeholder, the legal reviewer, the person who approved the source document. They do not want block numbers, file names, pacing, or reasoning. They want to see what moved and be able to find it in the course.

Write it to `YYYY-MM-DD-<course>-change-log.md` next to the deliverable.

**Three sections, in this order:**

1. **New sections:** content that did not exist before.
2. **Major updates:** changes to what the course teaches or requires.
3. **Minor updates:** wording, vocabulary, labels, counters, and anything mechanical.

**Format rules:**

- **Prefix every bullet with the name of the section or block heading it changed, bolded, followed by a colon.** Use the heading exactly as a learner sees it in the course, so the reader can navigate straight to it. Not a block number, not a file name.
- One sentence fragment per bullet. Two full sentences only when the change genuinely cannot be stated in one.
- **No reasoning.** No "because", no tradeoffs, no rationale. The reasoning lives in the checklist.
- Repeat a heading across several bullets rather than packing several changes into one bullet.
- Use **Throughout:** as the heading for changes that are not tied to one section.
- Group the mechanical residue into the minor section without calling attention to it. Do not label it as trivial or apologise for it.

**Open a short preamble** naming what the update was aligning to, with the source document's title, number, revision, and date.

**Flag anything not yet live** in a line after the log, so the reader does not assume everything listed is already in the course.

---

## Working rules

### Keep a ruling log

Create `rulings.md` next to the deliverable and append every decision as it lands, in Mariena's words, dated. Read it at the start of every pass.

This is not bookkeeping. Rulings arrive mid-flight during an update, and a pass that started before a ruling will return work that contradicts it. The log is what prevents that, and it also prevents a ruling from being silently lost when copy is later rewritten.

Every return states, at the top, which rulings it applied.

### Do not generate options against a stated direction

Options are for genuinely open decisions. Once Mariena has said what she wants, build it. Offering three variants of something she already chose stalls the work and reads as not listening.

When a direction creates a design problem, solve the problem inside the design and say what you did. Do not hand the problem back as a question.

### Plain language in anything she reads

No letter-number codes in a report, a recommendation, or a summary. Codes are fine as internal anchors inside the checklist's own tables. Everywhere else, name the thing: "the read-only agent question", not "P7".

### Budget the questions for stakeholders

A round trip to legal or a stakeholder costs days. Include only questions whose answer would change what ships. For everything else, take the conservative reading, write it down as an inference, and move on. When a list grows past a handful, propose which to drop and why.

### Preserve provenance when copy carries legal or ruling weight

When language traces to a specific ruling, keep a clause-by-clause mapping table: the course's words on the left, the ruling on the right. Rewriting for register is allowed; the table is what proves nothing was lost, and it is what gets handed to the person who ruled.

---

## Handoff: writing the copy

When the checklist is done, copy gets written as a separate pass:

1. Read the register spec from step 4 first.
2. Write against it, and check the finished copy back against its numbers.
3. Route through `revi-iddy`, which can fail a draft on register alone.
4. Never rewrite copy Mariena has written or edited herself unless she asks. Flag issues in her copy; do not silently apply fixes to live text.

## Quality checks

Before surfacing the checklist:

- Every instruction traces to the source document or to a dated ruling.
- Nothing asserts a rule the source does not contain, unless it is explicitly marked as an inference. Routes and destinations get checked specifically; they are the most commonly invented.
- No quote stops one clause short of the qualification that follows it.
- The paste order matches the order the course actually runs, checked against the live export rather than the interaction map.
- Every open item has an owner and says whether it blocks.
- Every blocked item names the smallest ask that unblocks it, and what ships without it. The artifact was searched for in the repo before the item was called blocked.
- Every completeness claim ("nothing was dropped", "all of it carried across") is backed by a trace table built before the sentence was written.
- Each ruling in the log was run backwards against the whole course, not only against the change diff.
- The pacing total states its assumption.
- Assessments have been checked against every changed rule, and against every ruling, including rules the source-document diff did not touch.
- The register spec is present, with numbers.
- The change log exists, uses the three sections, and prefixes every bullet with the learner-facing heading it changed.
- The change log contains no block numbers, file names, or reasoning.
