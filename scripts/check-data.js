#!/usr/bin/env node
/* Validation gate for prototype/data.js — the checklist in data/SCHEMA.md,
   automated. Zero dependencies; not part of the site and not a build step.

     node scripts/check-data.js

   Exits 1 and lists every failure if any rule is broken. */

const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..', 'prototype');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), ctx);
const A = ctx.window.AD;

const fail = [];
const bad = msg => fail.push(msg);
const isUrl = u => typeof u === 'string' && /^https:\/\/\S+$/.test(u);

const TYPES = ['prime', 'dtech', 'space', 'investor', 'gov'];
const RISKS = ['Critical', 'High', 'Medium', 'Low'];
const BINDS = ['Foreign control', 'Single supplier', 'Process capacity', 'Institutional'];

// ── nodes ──
const ids = A.nodes.map(n => n.id), idSet = new Set(ids);
ids.filter((x, i) => ids.indexOf(x) !== i).forEach(x => bad(`duplicate node id: ${x}`));

A.ORGS.forEach(row => {
  const [name, type, caps, invs, buyers, , , note, src] = row;
  if (row.length !== 9) bad(`${name}: row has ${row.length} fields, expected 9`);
  if (!TYPES.includes(type)) bad(`${name}: unknown type "${type}"`);
  if (!isUrl(src)) bad(`${name}: no https source — no source, no row`);
  if (!note || !note.trim()) bad(`${name}: empty note`);
  caps.forEach(k => A.CAP_NAME[k] || bad(`${name}: unknown capability "${k}"`));
  invs.forEach(k => {
    if (k === 'ex') return;   // deliberate "unverified lead investor" marker
    if (!A.INV_ID[k]) bad(`${name}: unknown investor key "${k}"`);
    else if (!A.EDGE_SRC[`${name}>${k}`]) bad(`${name}>${k}: investor edge has no evidence URL (it will not be drawn — remove the key or source it)`);
  });
  buyers.forEach(k => {
    if (!A.BUYER_ID[k]) bad(`${name}: unknown buyer key "${k}"`);
    else if (!A.EDGE_SRC[`${name}>${k}`]) bad(`${name}>${k}: buyer edge has no evidence URL (it will not be drawn — remove the key or source it)`);
  });
});

[...Object.values(A.INV_ID), ...Object.values(A.BUYER_ID)].forEach(n =>
  idSet.has(n) || bad(`"${n}" is an investor/buyer target but not an ORGS row`));

// ── edges ──
Object.entries(A.EDGE_SRC).forEach(([k, url]) => {
  const [org, key] = k.split('>');
  const row = A.ORGS.find(r => r[0] === org);
  if (!row) bad(`EDGE_SRC "${k}": no such org`);
  else if (!row[3].includes(key) && !row[4].includes(key)) bad(`EDGE_SRC "${k}": evidence for an edge the row does not claim`);
  if (!isUrl(url)) bad(`EDGE_SRC "${k}": not an https URL`);
});
A.links.forEach(l => (idSet.has(l.source) && idSet.has(l.target)) ||
  bad(`edge ${l.source} → ${l.target}: endpoint is not a node`));

const degree = {};
A.links.forEach(l => { degree[l.source] = 1; degree[l.target] = 1; });
A.nodes.forEach(n => degree[n.id] || bad(`orphan node (no edges): ${n.id}`));

// ── logos ──
Object.entries(A.LOGOS).forEach(([name, l]) => {
  if (!idSet.has(name)) bad(`LOGOS "${name}": no such node`);
  if (!fs.existsSync(path.join(root, l.file))) bad(`LOGOS "${name}": missing file ${l.file}`);
  if (!['symbol', 'wordmark'].includes(l.kind)) bad(`LOGOS "${name}": kind must be symbol or wordmark`);
  if (!isUrl(l.src)) bad(`LOGOS "${name}": no https src`);
});

// ── value chain ──
A.SEGMENTS.forEach(s => {
  if (!RISKS.includes(s.risk)) bad(`segment ${s.id}: unknown risk "${s.risk}"`);
  if (!BINDS.includes(s.bind)) bad(`segment ${s.id}: unknown binding constraint "${s.bind}"`);
  if (!(s.domestic >= 0 && s.domestic <= 100)) bad(`segment ${s.id}: domestic must be 0–100`);
  Object.entries(s.players || {}).forEach(([group, list]) => list.forEach(p => {
    // a bare name is allowed by the schema; a detailed row must carry its evidence
    if (Array.isArray(p) && !isUrl(p[2])) bad(`segment ${s.id} ${group} "${p[0]}": no https src`);
  }));
  (s.chokepoints || []).forEach(c => {
    if (!c.src || !c.src.trim()) bad(`segment ${s.id} chokepoint "${c.k}": no src — facts need a named source`);
    if (!RISKS.includes(c.risk)) bad(`segment ${s.id} chokepoint "${c.k}": unknown risk "${c.risk}"`);
    if (!(c.domestic >= 0 && c.domestic <= 100)) bad(`segment ${s.id} chokepoint "${c.k}": domestic must be 0–100`);
  });
});
A.META.sources.forEach(([pub, , url]) => isUrl(url) || bad(`META source "${pub}": not an https URL`));

if (fail.length) {
  console.error(`data.js: ${fail.length} problem(s)\n` + fail.map(f => '  ✗ ' + f).join('\n'));
  process.exit(1);
}
console.log(`data.js OK — ${A.ORGS.length} orgs, ${A.nodes.length} nodes, ${A.links.length} edges, ` +
  `${Object.keys(A.EDGE_SRC).length} sourced money edges, ${A.SEGMENTS.length} segments, ` +
  `${A.SEGMENTS.reduce((n, s) => n + s.chokepoints.length, 0)} chokepoints`);
