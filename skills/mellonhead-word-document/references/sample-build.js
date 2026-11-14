// Sample build: the header plus one of each component. Copy this file next to the
// deliverable as the starting point for a new document's build script.
// Run: node sample-build.js "<abs path to new .docx>"
const path = require('path');
const mh = require(path.join(__dirname, '..', 'scripts', 'mellonhead-docx.js'));
const { header, title, lastUpdated, tip, h2, h3, read, partHead, fillBox, grid, ideaCards, card, bullet, prompts, spacer, ex } = mh;

const children = [
  header({ eyebrow: 'Sample template' }),
  title('[Team name]: Sample Mellonhead template'),
  lastUpdated(),
  ...tip("anything in a beige box like this one is for you. Replace anything in [brackets] and delete the beige boxes and gray examples when you're done. The black text is what your team will read."),

  h2('Start here'),
  read('Black text like this is what the team reads. Plain-language headings, no "X, Y" headers.'),

  partHead(1, 'Where we stand'),
  h2('A box to write in'),
  ...tip('write two or three sentences in your own words.', ['What do we want more time for?', 'What do we never want to hand off?']),
  fillBox('[Write it here.]', 3),

  h2('A table'),
  grid(1, ['Work where you lead', 'How AI can help (optional)'], [['e.g. calls with long-time customers', 'e.g. pull their recent requests before the call'], ['', ''], ['', '']], [5000, 4360]),
  spacer(),
  bullet('Our tone guide: ', '[link]'),
  bullet('Example of a filled line: ', ex('e.g. our escalation rules')),

  partHead(2, 'How we work'),
  h3('Idea cards', 2),
  ideaCards([
    { theme: 'e.g. Getting started', ideas: ['a first draft of a proposal', 'an outline for a team meeting'], example: true },
    { theme: '[Theme]', ideas: ['[idea]', '[idea]'] },
    { theme: '[Theme]', ideas: ['[idea]', '[idea]'] },
  ], 2),
  ...prompts(['Where has AI gotten it wrong for us?', 'What is coming that could change this?']),

  partHead(3, 'Tips and examples'),
  card({ part: 3, headingLabel: 'Task: ', heading: 'e.g. replying to a customer question', example: true, blocks: [
    { label: 'Context to include', bullets: ["the customer's question and the full thread", 'our tone guide'] },
    { label: 'Tips from the team', text: 'Paste the whole thread, not just the last message.' },
  ] }),
];

mh.save(mh.buildDocument({ title: 'Sample Mellonhead template', children }), process.argv[2] || path.join(__dirname, 'sample.docx'))
  .catch((e) => { console.error(e.message); process.exit(1); });
