#!/usr/bin/env node
// Zero-dependency regression tests: node scripts/test-gloss.js
const assert = require('assert/strict');
const fs = require('fs'), path = require('path'), vm = require('vm');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'prototype', 'data.js'), 'utf8'), ctx);
const { gloss, GLOSSARY } = ctx.window.AD;

const abbr = (term, text = term) =>
  `<abbr title="${GLOSSARY[term].replace(/"/g, '&quot;')}">${text}</abbr>`;
let failures = 0;
function test(name, run) {
  try {
    run();
    console.log(`ok ${name}`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

test('first use only', () => assert.equal(gloss('C2 and C2'), `${abbr('C2')} and C2`));
test('plural stays inside abbr', () => assert.equal(gloss('SRMs'), abbr('SRM', 'SRMs')));
for (const term of ['NGC2', 'sUAS', 'C-UAS']) {
  test(`whole term ${term}`, () => assert.equal(gloss(term), abbr(term)));
}
test('no match inside a word', () => assert.equal(gloss('BASIC'), 'BASIC'));
test('tag attributes are untouched', () =>
  assert.equal(gloss('<a title="C2">C2</a>'), `<a title="C2">${abbr('C2')}</a>`));
test('first use spans tags', () =>
  assert.equal(gloss('C2 <em>C2</em>'), `${abbr('C2')} <em>C2</em>`));
test('definition quotes are escaped', () => {
  const original = GLOSSARY.C2;
  try {
    GLOSSARY.C2 = 'a "quoted" definition';
    assert.equal(gloss('C2'), '<abbr title="a &quot;quoted&quot; definition">C2</abbr>');
  } finally {
    GLOSSARY.C2 = original;
  }
});
test('raw ampersand', () => assert.equal(gloss('A&D firms'), `${abbr('A&D')} firms`));
test('escaped ampersand preserves visible text', () => assert.equal(
  gloss('A&amp;D firms'), '<abbr title="aerospace and defense">A&amp;D</abbr> firms'));
for (const [first, second] of [['A&D', 'A&amp;D'], ['A&amp;D', 'A&D']]) {
  test(`shared first use: ${first} then ${second}`, () =>
    assert.equal(gloss(`${first} and ${second}`), `${abbr('A&D', first)} and ${second}`));
}
test('escaped term respects word boundaries', () =>
  assert.equal(gloss('XA&amp;D A&amp;DX'), 'XA&amp;D A&amp;DX'));
process.exitCode = failures ? 1 : 0;
