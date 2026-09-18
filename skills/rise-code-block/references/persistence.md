# Saving and Retrieving Learner Input Across Blocks

How to build Rise code blocks that save what a learner types in one block and retrieve it in another. Companion to `../SKILL.md`, which owns the iframe constraints, event handling, completion signaling, and the general block types. Styling lives in `styling.md`.

Load this when a Rise activity needs learner input to survive past the block it was typed into.

---

## 1. What this pattern does

Rise code blocks each run in their own isolated iframe and do not talk to each other by default. This pattern uses the browser's built-in localStorage as a shared notepad. Block A writes a note under a key. Block B reads that key.

Two proven variants:

- **Save-and-recap.** The learner captures ideas at several points in the course. A final block gathers everything and lets them copy it out.
- **Draft-and-refine.** The learner drafts something early (a prompt, a first take, a plan). Later, after new content, a block retrieves the draft and asks them to refine it.

Both use the same mechanic. Mix and match.

This is the persistent version of the Reflection / Journal block type in `../SKILL.md`. If the notes do not need to survive past the block, use the plain reflection block instead. It is simpler and has none of the limitations below.

---

## 2. When to use it, and when not to

Good fit:

- Capturing ideas across stages of a course
- Draft-then-refine reflection
- Task shortlists learners bring to a workshop
- Anything the learner benefits from seeing again later in the same course

Not a fit:

- Anything that needs to sync across devices or browsers
- Anything the learner must not lose
- Score reporting to the LMS. localStorage is invisible to Rise's completion tracking, apart from the completion signal you send explicitly.

Test in the actual delivery environment before relying on this for anything a learner would be upset to lose.

---

## 3. How it works, in plain English

Every browser keeps a small notepad per website called localStorage. Each Rise code block, even inside its own iframe, can read and write to that notepad. Each note gets a key, like `aba_thinkingpartner_inform`. One block saves under that key. Another block reads the key and shows what was saved.

Notes persist across page reloads and across course sessions on the same browser and device. They do not sync across devices. If a learner clears their browser data, the notes are gone.

---

## 4. Key naming

Consistency across blocks in the same course matters most. Consistency across courses makes things findable later.

### Key format

```
[client]_[courseshortname]_[activityname]
```

All lowercase. No spaces, hyphens, or capitals inside the code. Underscores separate the three parts.

Examples:

- `aba_thinkingpartner_inform`
- `aba_summarizing_v1draft`
- `aba_summarizing_v2refined`
- `aba_extracting_reflection`

Container IDs and filenames follow the general conventions in `../SKILL.md`, not a separate rule for persistent blocks.

### {{client}} course short codes

Locked list. Use these exactly.

| Course | Short code |
|---|---|
| Communicating with AI | `communicating` |
| Working with Data and AI | `data` |
| AI as a Thinking Partner | `thinkingpartner` |
| Summarizing | `summarizing` |
| Extracting and Synthesizing | `extracting` |
| Creating Docs and Content | `docscontent` |
| Presentations with AI | `presentations` |

For a new client, start a table like this at the top of that project and add to it as courses are built.

---

## 5. Default UI text

Use these labels and messages across every course. Override only for a clear reason, such as a specific stage name or a different pedagogical framing. If in doubt, keep them.

| Element | Default text |
|---|---|
| Save button | `Save my notes` |
| Edit button | `Edit notes` |
| Summary reveal button | `Show my notes` |
| Summary refresh button | `Reload notes` |
| Copy button | `Copy all notes` |
| Word-count nudge | `Add at least 3 words before saving.` |
| Save confirmation | `Notes saved. You're all set.` |
| Copy confirmation | `Copied to clipboard.` |
| Empty stage in summary | `Nothing saved for this stage.` |
| Copy helper text | `Paste your notes somewhere you can refer to later: an email to yourself, a doc, or your notes app.` |
| Textarea placeholder | `Write your ideas here...` |

For any override, follow `writing-guide.md` and the `/write-learning` skill: sentence case, plain language, peer voice, no hype.

---

## 6. Boilerplate

CSS for the container, save button, edit button, and message boxes lives in `styling.md`. What follows is the markup and logic specific to persistence.

### 6a. Input block markup

```html
<div style="margin-top: 20px;">
  <textarea class="notes-textarea" id="[[ TEXTAREA_ID ]]" placeholder="Write your ideas here..."></textarea>
  <button class="save-btn" id="[[ SAVE_BTN_ID ]]">Save my notes</button>
  <div class="nudge-msg" id="[[ NUDGE_ID ]]">Add at least 3 words before saving.</div>
  <div class="confirm-msg" id="[[ CONFIRM_ID ]]">Notes saved. You're all set.</div>
  <button class="edit-btn" id="[[ EDIT_BTN_ID ]]">Edit notes</button>
</div>
```

Wrap this inside the block's scoped container div (see the container ID convention in `../SKILL.md`).

### 6b. Core logic: save, edit, restore, complete

```html
<script>
(function() {
  var STORAGE_KEY = '[[ client_course_activityname ]]';
  var textarea  = document.getElementById('[[ TEXTAREA_ID ]]');
  var saveBtn   = document.getElementById('[[ SAVE_BTN_ID ]]');
  var nudgeEl   = document.getElementById('[[ NUDGE_ID ]]');
  var confirmEl = document.getElementById('[[ CONFIRM_ID ]]');
  var editBtn   = document.getElementById('[[ EDIT_BTN_ID ]]');

  function wordCount(str) {
    return str.trim().split(/\s+/).filter(function(w) { return w.length > 0; }).length;
  }

  function showSaved() {
    saveBtn.style.display = 'none';
    nudgeEl.style.display = 'none';
    confirmEl.style.display = 'block';
    editBtn.style.display = 'block';
    textarea.readOnly = true;
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      textarea.value = saved;
      showSaved();
      window.parent.postMessage({ type: 'complete' }, '*');
    }
  } catch (e) {}

  document.addEventListener('input', function(e) {
    if (e.target.id !== '[[ TEXTAREA_ID ]]') return;
    nudgeEl.style.display = 'none';
    if (wordCount(e.target.value) >= 3) {
      saveBtn.classList.add('active');
    } else {
      saveBtn.classList.remove('active');
    }
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#[[ SAVE_BTN_ID ]]')) return;
    if (wordCount(textarea.value) < 3) {
      nudgeEl.style.display = 'block';
      return;
    }
    try { localStorage.setItem(STORAGE_KEY, textarea.value); } catch (e) {}
    showSaved();
    window.parent.postMessage({ type: 'complete' }, '*');
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#[[ EDIT_BTN_ID ]]')) return;
    textarea.readOnly = false;
    textarea.focus();
    confirmEl.style.display = 'none';
    editBtn.style.display = 'none';
    saveBtn.style.display = 'block';
    saveBtn.classList.add('active');
    nudgeEl.style.display = 'none';
  });
})();
</script>
```

Every `localStorage` call sits inside a `try` block. Some LMS configurations throw on access rather than returning null, and an unhandled throw takes the whole block down.

The word-count threshold (currently 3) can be any value. Set it to match the kind of input being asked for.

**On the load-time completion signal.** This block fires completion on load when a saved value exists, which is the one sanctioned exception to the "never fire on page load" rule in `../SKILL.md`. It is correct here because the saved value is proof the learner already did the work. Without it, a returning learner sees their own saved notes and a Continue divider that will not let them past.

---

## 7. Worked example: save-and-recap

Built for AI as a Thinking Partner.

Structure:

- Four input blocks at different points in the lesson, one per stage of the model being taught.
- Each block: intro copy, examples, textarea, save button, edit button.
- A final summary block in a later section reads all four keys and displays them together, with a "Copy all notes" button and helper text telling the learner where to paste them.

Why it works: the model has four distinct stages, and asking the learner to apply each stage to their own task as they go turns a passive lesson into an active shortlist. By the end of the course they have built their workshop prep as a side effect of learning.

Reuse this shape whenever a multi-stage framework should be applied to the learner's own work.

---

## 8. Worked example: draft-and-refine

Two blocks. The learner drafts something early, before being taught the good version. Later, after the teaching, a second block retrieves the draft and asks them to refine it.

Mechanics:

- Block A saves under a v1 key, for example `aba_summarizing_v1draft`.
- Block B, later in the course, reads that key on load. If a draft exists it appears in the textarea alongside a prompt to refine it. If nothing was saved, because the learner skipped the earlier block, Block B shows an empty state.
- Block B saves the refined version under a separate key, `aba_summarizing_v2refined`, so both versions survive. A later summary block can then show the before and after.

Block B's load logic:

```javascript
var V1_KEY = 'aba_summarizing_v1draft';
var V2_KEY = 'aba_summarizing_v2refined';

var draft = null;
try { draft = localStorage.getItem(V1_KEY); } catch (e) {}

if (draft && draft.trim()) {
  textarea.value = draft;
} else {
  document.getElementById('[[ NO_DRAFT_MSG_ID ]]').style.display = 'block';
}

// Save logic is identical to 6b, with STORAGE_KEY = V2_KEY
```

Why it works: it makes the learning tangible. The learner sees their own before and after on one page, and the original draft is preserved for comparison in a workshop.

Reuse this whenever the pedagogical shape is "have a go, then learn the better way, then have another go."

---

## 9. Summary block pattern

The summary block reads multiple keys and displays them together behind a button click.

- **It cannot auto-populate in real time.** Rise iframes do not message each other while both are on screen. The reveal has to be triggered by a click.
- **Give the reveal button a "Reload notes" state**, so a learner who scrolls up, edits an earlier block, and comes back can refresh everything with one click.
- **Render learner input with `textContent`, never `innerHTML`.** This is the inverse of the rule for author-written content. Anything the learner typed is untrusted input and stray HTML will break the block.
- **Use `white-space: pre-wrap`** on the notes display so the learner's own line breaks survive.
- **Include a "Copy all notes" button** using the Clipboard API with an `execCommand('copy')` fallback. Some LMS iframes block the newer API.
- **Include the helper line:** `Paste your notes somewhere you can refer to later: an email to yourself, a doc, or your notes app.`
- **No file download button.** Downloads are commonly blocked in embedded iframes and behavior varies by LMS. Copy and paste works everywhere.
- **No completion signal.** Tell the Rise builder to set this block to not require completion.

---

## 10. Reset for testing

Add this to any block, or to a dedicated hidden block, and any URL carrying `?resetNotes=1` wipes every key starting with the client and course prefix.

```html
<script>
(function() {
  var PREFIX = '[[ client_courseshortname ]]';  // e.g. 'aba_thinkingpartner'
  var params = new URLSearchParams(window.location.search);
  if (params.get('resetNotes') === '1') {
    try {
      var toRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf(PREFIX) === 0) toRemove.push(key);
      }
      toRemove.forEach(function(k) { localStorage.removeItem(k); });
    } catch (e) {}
  }
})();
</script>
```

How to use it:

1. Open the Rise preview URL.
2. Add `?resetNotes=1` to the end. If the URL already has a `?`, use `&resetNotes=1`.
3. Load once. All matching keys are wiped.
4. Remove the parameter and reload normally.

Learners will never hit this. They would have to type it into the URL themselves.

Put it in one dedicated reset block at the top of the lesson, a code block with this script and no visible content, so the input blocks stay clean. Set that block to not require completion and hide it from the sidebar.

---

## 11. Limitations specific to persistence

These are on top of the general iframe constraints in `../SKILL.md`.

- **Browser and device scoped.** Notes live on one browser on one device. Switching mid-course loses them.
- **Cache clears wipe notes.** Clearing browser data removes everything.
- **LMS storage isolation varies.** Some LMS setups partition or block localStorage entirely. Test in the real environment.
- **Clipboard API is sometimes blocked in iframes.** The `execCommand` fallback covers most cases, not all.
- **No real-time sync between blocks.** A summary block cannot update live while the learner types in another block on the same page. The reveal must be click-triggered.

---

## 12. Checklist for persistent blocks

Run this in addition to the quality checklist in `../SKILL.md`.

- [ ] Key follows `[client]_[courseshortname]_[activityname]`, all lowercase, underscores only
- [ ] Course short code comes from the locked table in §4, or was added to it
- [ ] Every `localStorage` read and write is wrapped in `try`
- [ ] Input blocks fire completion on save, and on load when a saved value exists
- [ ] Summary blocks do not fire completion
- [ ] Learner input renders via `textContent`, not `innerHTML`
- [ ] `white-space: pre-wrap` on any element displaying multi-line learner input
- [ ] Copy button has an `execCommand` fallback, and there is no download button
- [ ] Reset snippet is in the lesson during build and test
- [ ] Button and message copy matches the defaults in §5, or the override has a stated reason
- [ ] Rise-side setup handed to the builder (see `../SKILL.md`)

---

## 13. Build order

The person building the Rise course is often not a coder. Explain technical decisions in plain English and do not assume a term is understood. Build one block, get sign-off on it, then replicate the pattern across the rest.
