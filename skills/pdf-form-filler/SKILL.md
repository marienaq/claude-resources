---
name: pdf-form-filler
description: Fill out a PDF form (applications, contracts, intake forms, registrations). Reads the form to detect its fields, gathers what it can from project files and memory, confirms every proposed value with the user field by field, then asks about or advises on each blank before filling. Produces a verified filled copy without altering the original. Use when the user hands over a PDF form and wants it completed.
---

# PDF Form Filler

Fill a PDF form accurately, with the user confirming the data before anything is written. The skill never guesses silently: it proposes, the user confirms, then it fills and verifies placement visually.

Works for two kinds of PDFs:
- **AcroForm PDFs** with real fillable widgets (filled by field name, cleanest).
- **Flat PDFs** that are just printed labels, blank underscore lines, and box glyphs (filled by overlaying text at coordinates anchored to the label text). Most scanned contracts and applications are this kind.

Helper script: `scripts/pdfform.py` (PyMuPDF). All coordinates are in PDF points, origin top-left, y increasing downward.

## Core Principles

1. **Confirm before filling.** Always show the user a field-by-field table of proposed values and their source, and get confirmation, before writing anything. This is the heart of the skill.
2. **Never edit the original.** Always write a new file named `<original-stem>-FILLED.pdf`. The blank original stays untouched as a reference.
3. **Verify placement by rendering.** After filling, render crops of the changed regions and read them back as images to confirm text landed in the right place and does not overlap labels. Do not declare done without looking.
4. **Blanks are a decision, not a default.** For every empty field, either ask the user for the value or advise that it should stay blank (and say why). Never leave a field blank silently.
5. **Cite the source of every value.** Each proposed value names where it came from (business license, bio, memory, user-supplied). The user can catch a wrong source fast.
6. **Flag legal-vs-brand and date-sensitive fields.** Watch for legal name vs. brand/domain spelling differences, and for fields whose correct value depends on today's date (early-bird deadlines, expiry, "before/after" pricing).

## When to Use

- The user hands over a PDF form (application, contract, registration, intake, renewal) and wants it filled.
- The user wants to update fields on a form already filled by this skill.

## Setup

Check PyMuPDF is available; install if not:
```
python3 -c "import fitz" 2>/dev/null || pip3 install --break-system-packages pymupdf
```

## Workflow

### Step 1 - Read the form and detect fields

```
python3 .claude/skills/pdf-form-filler/scripts/pdfform.py inspect <form.pdf>
```
This reports page count, page sizes, whether the PDF has real widgets, and how many checkbox glyphs exist per page. Also Read the PDF directly (the Read tool renders it) so you understand the form's intent, sections, and any terms/deadlines.

- If `has_widgets` is true: use `widgets <form.pdf>` to list field names, types, and current values. You will fill by field name (mode `widgets`).
- If `has_widgets` is false: it is a flat form. You will overlay text (mode `overlay`). Locate each field with `search` and `region` (see Step 4).

### Step 2 - Gather what you already know

Build a profile from project files and memory before asking the user anything. Typical sources in this repo:

| Info | Where to look |
|---|---|
| Legal business name, address, city, phone | `culver city business license*.pdf` (the city license receipt) |
| Founder name, title, bios | `branding/bio.md` |
| Brand colors, domain, positioning | known info from project files and session memory |
| Prior form values | any existing `*-FILLED.pdf` in the project |
| User email | the session's known email |

Pull the actual values; do not assume. If two sources disagree, surface both.

### Step 3 - Confirm every proposed value, field by field

Present a table covering **all** fields the form contains:

| Field | Proposed value | Source | Status |
|---|---|---|---|
| Company Name | Mellonhead | business license | confirm? |
| Email | {{your email}} | user-supplied | confirm? |
| Booth location | (blank) | not found | need from you |
| Signature | (blank) | leave blank | you sign by hand |

Ask the user to confirm or correct. Do not proceed to filling until they respond.

### Step 4 - Handle blank fields

For each field with no confirmed value, do one of two things and say which:
- **Ask** the user for it (e.g. preferred selections, account numbers, choices that carry cost or commitment).
- **Advise leaving it blank** with the reason (e.g. signature and date are signed by hand; "if different from above" fields when not different; optional marketing add-ons the user has not opted into).

For choice fields that change the total or commit money (booth type, billing option, add-ons), confirm the selection explicitly. If the form has "before/after <date>" pricing, compute which applies from today's date and flag it, since printed deadlines are often past.

### Step 5 - Map coordinates (flat forms only)

For each confirmed value, find where to place it:
```
python3 .../pdfform.py search <form.pdf> "Company Name"     # rect of the label
python3 .../pdfform.py region <form.pdf> 0 84 200 95        # all words on that line, with x ends
```
Placement rules that have worked reliably:
- **Text fields:** place the value a few points past the label's right edge (`x1`), at the label baseline (`y1` of the label, minus ~1). Always verify the *full* label end with `region`: a `search` for "Company" stops before "Name:" and will overlap if you anchor on it.
- **Checkboxes:** the box glyph (often `■` in the text layer) renders as an empty box. Mark it with an `X` at `box_x0 + 0.7`, baseline `box_y1 - 1`.
- **Amounts / quantities:** anchor off the `$` glyph or the blank line. Place the number a few points to its right at the line baseline.
- **Ink:** dark blue `[0, 0, 0.55]` so fills are visibly distinct from the printed form.

### Step 6 - Fill

Write a placements JSON, then fill to a new file:
```
python3 .../pdfform.py fill --in <form.pdf> --out <form>-FILLED.pdf --placements /tmp/placements.json
```
See the schema at the top of `pdfform.py`. Use mode `widgets` for AcroForm PDFs, `overlay` for flat forms.

### Step 7 - Verify and open

Render crops of every changed region and Read them back:
```
python3 .../pdfform.py crop <form>-FILLED.pdf 0 64 400 185 /tmp/check_top.png
```
Check for overlap with labels, correct line, correct values. Fix and re-fill if anything is off. Then open for the user with the right Chrome profile (per global CLAUDE.md; Mellonhead non-client work uses Profile 7):
```
open -na "Google Chrome" --args --profile-directory="Profile 7" "<abs path to FILLED.pdf>"
```

## Output Conventions

- Filled file: `<original-stem>-FILLED.pdf`, kept alongside the original.
- Do not drop form files in the project root. Put them in a sensible folder (e.g. `marketing/conference/<EVENT>/`, `business-development/<CLIENT>/`, `operations/`). Confirm the folder if unclear.
- Summarize at the end: what was filled (table), what was left blank and why, and any flags (date-sensitive pricing, name spelling, selections that need the user).

## Gotchas

- **Legal name vs. brand/domain.** The contracting/legal name (from the license) can differ from the brand or domain spelling. Keep the legal name on legal-name fields and the brand on "exhibiting as" / display fields; flag the difference.
- **Past deadlines.** "Before/after <date>" pricing deadlines are frequently already past. Compute from today, flag it, and note the user may need to confirm the rate with the vendor.
- **Anchor on the whole label.** Re-verify label end x with `region`; partial label matches cause overlap.
- **Re-run from the blank original each time.** When updating values, regenerate the full placements set against the original PDF rather than stacking overlays on an already-filled copy.
- **Edit tool for the script, not for PDFs.** PDFs are binary; only ever modify them through `pdfform.py`.

## Mellonhead business profile (derived, re-verify against source)

From the Culver City business license and `branding/bio.md`. Confirm with the user before relying on it for a new form.

| Field | Value |
|---|---|
| Legal name | Mellonhead |
| Address | {{your business address}} |
| Phone | {{your phone}} |
| Founder / title | Mariena Quintanilla, Founder & CEO |
| Website | www.mellonhead.co |
| Email | {{your email}} |
| Brand / display name | Mellonhead AI Education |
