// Mellonhead Word helper (docx-js 9.0.2).
// Generalized from marketing/newsletters/2026-11-manager-manifesto/template-build/build.js
// (the Team AI Manifesto Template v4, MQ's calls 2026-11-10 to 11/13).
//
// Use from a per-document build script:
//   const mh = require('/Users/mariena/Projects/mellonhead/.claude/skills/mellonhead-word-document/scripts/mellonhead-docx.js');
//   const doc = mh.buildDocument({ title: 'Doc title', children: [ mh.header({ eyebrow: 'EYEBROW' }), mh.title('Title'), ... ] });
//   mh.save(doc, '/abs/path/My Template v1.docx');
//
// Every component returns a docx element or an array of them; spread arrays into children.
// Black text is what the reader keeps. Beige callouts (tip) and gray examples are for the
// person filling the file in, and are deleted after.

const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, Footer, LevelFormat, PageNumber,
  TabStopType, TableLayoutType, HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  TextWrappingType,
} = docx;

const ASSETS = path.join(__dirname, '..', 'assets');

// Palette and type (v4)
const INK = '1F2A24';     // body text, the words the team reads
const SOFT = '5E6A62';    // placeholders like [Team name]
const GRAY = '8A938C';    // gray italic examples ("e.g. ...")
const KRAFT = 'C4A27A';   // stitched boxes, bullets, callout rule
const KRAFT_DARK = '8B6A3E';
const KRAFT_TEXT = '6B5536';
const PAPER = 'FFFDF8';   // inside stitched boxes
const CALLOUT = 'F3E9DA'; // beige callout fill
const SERIF = 'Georgia';
const SANS = 'Arial';
const PARTS = {
  1: { c: 'F46665', tint: 'FCE9E2', dot: 'dot1.png' }, // coral (brand coral, never red)
  2: { c: '23402F', tint: 'E8EEE2', dot: 'dot2.png' }, // forest
  3: { c: '5B3F63', tint: 'EEE8F3', dot: 'dot3.png' }, // plum
};
const W = 9360; // text width in DXA: 6.5in on Letter with 1in side margins

const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const dashed = { style: BorderStyle.DASHED, size: 8, color: KRAFT };

// runs and paragraphs
const t = (text, o = {}) => new TextRun({
  text, font: o.font || SANS, size: o.size || 21, color: o.color || INK,
  bold: o.bold, italics: o.italics, characterSpacing: o.cs,
});
const ex = (s) => t(s, { italics: true, color: GRAY });          // example, deleted after
const ph = (s) => t(s, { color: SOFT });                         // placeholder, replaced
const runOf = (x) => (typeof x === 'string' ? ph(x) : x);
const para = (runs, o = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [runs],
  spacing: { before: o.before ?? 0, after: o.after ?? 120, line: o.line ?? 300 },
  alignment: o.align, border: o.border, shading: o.shading, indent: o.indent,
  keepNext: o.keepNext, numbering: o.numbering,
});
const read = (s, o = {}) => para(t(s), { after: o.after ?? 140 });
const spacer = (n = 160) => para(t(''), { after: 0, before: n });
const img = (file, w, h) => new ImageRun({
  type: 'png', data: fs.readFileSync(path.isAbsolute(file) ? file : path.join(ASSETS, file)),
  transformation: { width: w, height: h },
});

// the page-1 header: full-bleed collage anchored to the page edge
// banner-cropped.jpg is 2550x487; 816x156 px is 8.5in wide at the very top of page 1.
function header(o = {}) {
  const file = o.image || path.join(ASSETS, 'banner-cropped.jpg');
  const kids = [new ImageRun({
    type: 'jpg', data: fs.readFileSync(file), transformation: { width: 816, height: o.height || 156 },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
      verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, offset: 0 },
      wrap: { type: TextWrappingType.NONE }, behindDocument: false, allowOverlap: true, lockAnchor: true,
    },
  })];
  if (o.eyebrow) kids.push(t(o.eyebrow.toUpperCase(), { size: 16, bold: true, color: KRAFT_DARK, cs: 30 }));
  // before: 1450 clears the banner under the 0.75in top margin
  return para(kids, { before: o.before ?? 1450, after: 120 });
}
const title = (s) => new Paragraph({ heading: HeadingLevel.TITLE, children: [t(s, { font: SERIF, size: 52 })], spacing: { after: 160 } });
const lastUpdated = (label = 'Last updated', value = '[date]') =>
  para([t(`${label}: `, { bold: true, size: 19, color: SOFT }), t(value, { size: 19, color: SOFT })], { after: 240 });

// headings
function partHead(n, s) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, keepNext: true, spacing: { before: 360, after: 200 },
    border: { bottom: { style: BorderStyle.DASHED, size: 10, color: PARTS[n].c, space: 8 } },
    children: [img(PARTS[n].dot, 30, 30), t('   '), t(s, { font: SERIF, size: 36, color: PARTS[n].c })],
  });
}
const h2 = (s) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [t(s, { font: SERIF, size: 27 })], spacing: { before: 320, after: 100 }, keepNext: true });
const h3 = (s, part = 1) => new Paragraph({ children: [t(s, { font: SERIF, size: 23, color: PARTS[part].c })], spacing: { before: 220, after: 80 }, keepNext: true });

// for the person filling it in (deleted after)
const CB = { shading: { type: ShadingType.CLEAR, fill: CALLOUT, color: 'auto' }, border: { left: { style: BorderStyle.SINGLE, size: 24, color: KRAFT, space: 10 } } };
function tip(text, questions = [], label = 'To fill in: ') {
  const out = [new Paragraph({ ...CB, keepNext: true, spacing: { before: 80, after: questions.length ? 60 : 160, line: 280 },
    children: [t(label, { bold: true, size: 19, color: KRAFT_DARK }), t(text, { size: 19, color: KRAFT_TEXT })] })];
  questions.forEach((q, i) => out.push(new Paragraph({ ...CB, keepNext: true, numbering: { reference: 'p', level: 0 },
    spacing: { after: i === questions.length - 1 ? 160 : 40, line: 280 }, children: [t(q, { size: 19, italics: true, color: KRAFT_TEXT })] })));
  return out;
}

// dashed kraft "stitched" box people type into
function fillBox(placeholder = '[Write it here.]', lines = 1) {
  const kids = [para(t(placeholder, { color: GRAY, italics: true }), { after: 0 })];
  for (let i = 1; i < lines; i++) kids.push(para(t(''), { after: 0 }));
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    borders: { top: dashed, bottom: dashed, left: dashed, right: dashed, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({ children: [new TableCell({ width: { size: W, type: WidthType.DXA }, borders: { top: dashed, bottom: dashed, left: dashed, right: dashed },
      shading: { type: ShadingType.CLEAR, fill: PAPER, color: 'auto' }, margins: { top: 160, bottom: 160, left: 200, right: 200 }, children: kids })] })] });
}

// table with a tinted header in the part colour. Cell strings render as gray examples;
// '' is a blank row to fill; pass a TextRun for anything else. widths in DXA, summing to W.
function grid(part, headers, rows, widths) {
  if (!widths) widths = headers.map(() => Math.floor(W / headers.length));
  const line = { style: BorderStyle.SINGLE, size: 4, color: 'E3DACB' };
  const hdr = new TableRow({ tableHeader: true, children: headers.map((h, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: PARTS[part].tint, color: 'auto' },
    borders: { top: none, left: none, right: none, bottom: { style: BorderStyle.SINGLE, size: 12, color: PARTS[part].c } },
    margins: { top: 100, bottom: 100, left: 140, right: 140 }, children: [para(t(h, { bold: true, size: 19 }), { after: 0 })] })) });
  const body = rows.map((r) => new TableRow({ children: r.map((c, i) => new TableCell({ width: { size: widths[i], type: WidthType.DXA },
    borders: { top: none, left: none, right: none, bottom: line }, margins: { top: 120, bottom: 120, left: 140, right: 140 },
    children: [para(typeof c === 'string' ? (c ? ex(c) : t('')) : c, { after: 0, line: 360 })] })) }));
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: widths,
    borders: { top: none, left: none, right: none, bottom: line, insideHorizontal: line, insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'F1ECE2' } },
    rows: [hdr, ...body] });
}

// bullets
const bl = (runs) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 60, line: 300 }, children: Array.isArray(runs) ? runs : [runs] });
// "Label: value" bullet; a string value renders as a placeholder ([link]), or pass ex('e.g. ...')
const bullet = (label, value = '[ ]') => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 100, line: 300 }, children: [t(label, { bold: true }), runOf(value)] });
function prompts(list, label = "Prompts to get you started (delete these when you're done)") {
  return [para(t(label, { size: 16, bold: true, color: 'A08A66', cs: 10 }), { before: 60, after: 60, keepNext: true }),
    ...list.map((q) => new Paragraph({ numbering: { reference: 'p', level: 0 }, spacing: { after: 60, line: 280 }, keepNext: true, children: [t(q, { italics: true, color: GRAY, size: 20 })] }))];
}

// idea cards in a row (three by default). cards: [{ theme, ideas: [..], example: true|false }]
// example cards render gray italic ("e.g."), the rest render as placeholders.
function ideaCards(cards, part = 1) {
  const n = cards.length; const cw = Math.floor((W - 60 * (n - 1)) / n);
  const cell = (p, c) => para(c, { after: p.after ?? 80, line: 300, before: p.before ?? 0 });
  const card = ({ theme, ideas, example }) => new TableCell({ width: { size: cw, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'FBF7EF', color: 'auto' },
    borders: { top: { style: BorderStyle.SINGLE, size: 18, color: PARTS[part].c }, bottom: dashed, left: dashed, right: dashed }, margins: { top: 160, bottom: 160, left: 180, right: 180 },
    children: [cell({ after: 120 }, [example ? t(theme, { bold: true, italics: true, color: GRAY }) : t(theme, { bold: true, color: SOFT })]),
      ...ideas.map((i) => bl(example ? ex(i) : ph(i)))] });
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: cards.map(() => cw),
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: { style: BorderStyle.SINGLE, size: 24, color: 'FFFFFF' } },
    rows: [new TableRow({ children: cards.map(card) })] });
}

// a full-width stitched card with labelled blocks (the v4 "tips card").
// { part, heading, example, blocks: [{ label, bullets: [..] } | { label, text }] }
function card({ part = 2, heading, headingLabel = '', example = false, blocks = [] }) {
  const lab = (s) => t(s, { bold: true, size: 19, color: PARTS[part].c });
  const v = (s) => (example ? ex(s) : ph(s));
  const cp = (runs, o = {}) => para(runs, { after: o.after ?? 80, line: 300, before: o.before ?? 0 });
  const kids = [cp([headingLabel ? t(headingLabel, { bold: true, font: SERIF, size: 24 }) : t(''),
    example ? t(heading, { font: SERIF, size: 24, italics: true, color: GRAY }) : t(heading, { font: SERIF, size: 24, color: SOFT })], { after: 140 })];
  blocks.forEach((b, i) => {
    kids.push(cp(lab(b.label), { before: i ? 120 : 0 }));
    if (b.bullets) b.bullets.forEach((s) => kids.push(bl(v(s))));
    if (b.text) kids.push(cp(v(b.text)));
  });
  return new Table({ layout: TableLayoutType.FIXED, width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    borders: { top: dashed, bottom: dashed, left: dashed, right: dashed, insideHorizontal: none, insideVertical: none },
    rows: [new TableRow({ children: [new TableCell({ width: { size: W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: PAPER, color: 'auto' },
      borders: { top: { style: BorderStyle.SINGLE, size: 18, color: PARTS[part].c }, bottom: dashed, left: dashed, right: dashed },
      margins: { top: 180, bottom: 180, left: 220, right: 220 }, children: kids })] })] });
}

// the document
function buildDocument({ title: docTitle, children, footerText = 'A living document', creator = 'Mellonhead' }) {
  return new Document({
    creator, title: docTitle,
    styles: {
      default: { document: { run: { font: SANS, size: 21, color: INK } } },
      paragraphStyles: [],
      title: { run: { font: SERIF, size: 52, color: INK }, paragraph: { spacing: { before: 0, after: 160 }, keepNext: true } },
      heading1: { run: { font: SERIF, size: 36 }, paragraph: { spacing: { before: 360, after: 200 }, keepNext: true } },
      heading2: { run: { font: SERIF, size: 27, color: INK }, paragraph: { spacing: { before: 320, after: 100 }, keepNext: true } },
    },
    numbering: { config: [
      { reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } }, run: { color: KRAFT } } }] },
      { reference: 'p', levels: [{ level: 0, format: LevelFormat.BULLET, text: '?', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 360, hanging: 260 } }, run: { color: KRAFT, font: SERIF } } }] },
    ] },
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
      footers: { default: new Footer({ children: [new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: W }],
        border: { top: { style: BorderStyle.DASHED, size: 6, color: KRAFT, space: 6 } },
        children: [img('logo.png', 90, 18), t(`   ·   ${footerText}`, { size: 16, color: SOFT }),
          new TextRun({ children: ['\t', PageNumber.CURRENT], font: SANS, size: 16, color: SOFT })] })] }) },
      children,
    }],
  });
}

// Never overwrites: MQ may have the file open, or have saved her own edits over it.
// Bump the version in the filename instead (Template v4.docx, then v5).
async function save(doc, outPath) {
  if (fs.existsSync(outPath)) throw new Error(`Refusing to overwrite ${outPath}. Write a new versioned file.`);
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buf);
  console.log('written', outPath, buf.length);
  return outPath;
}

module.exports = {
  docx, ASSETS, W, COLORS: { INK, SOFT, GRAY, KRAFT, KRAFT_DARK, KRAFT_TEXT, PAPER, CALLOUT }, PARTS, SERIF, SANS,
  t, ex, ph, para, read, spacer, img, header, title, lastUpdated, partHead, h2, h3,
  tip, fillBox, grid, bl, bullet, prompts, ideaCards, card, buildDocument, save,
};
