#!/usr/bin/env node
/* Source-only offline checks. Zero dependencies; run from any directory with:
     node scripts/check-static.js
   This deliberately checks literal source patterns, not arbitrary runtime JS. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.resolve(__dirname, '..', 'prototype');
const failures = [];
const bad = message => failures.push(message);
const read = file => fs.readFileSync(file, 'utf8');

// Preserve quoted URLs (and their //) while removing actual JS/CSS comments.
function stripComments(source) {
  return source.replace(/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`|\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g,
    token => token.startsWith('//') || token.startsWith('/*') ? ' ' : token);
}

function relativeFile(value, label, base = root) {
  if (typeof value !== 'string' || !value.trim() ||
      /^[a-z][a-z\d+.-]*:/i.test(value.trim()) || /^[\\/]/.test(value.trim()) ||
      /[\\\x00-\x20]/.test(value)) {
    bad(`${label}: expected a relative path, got ${JSON.stringify(value)}`);
    return null;
  }
  let filename;
  try {
    filename = path.resolve(base, decodeURIComponent(value.split(/[?#]/)[0]));
  } catch {
    bad(`${label}: malformed path ${value}`);
    return null;
  }
  const inside = file => file.startsWith(root + path.sep);
  if (!inside(filename) || !fs.existsSync(filename) || !fs.statSync(filename).isFile() ||
      !inside(fs.realpathSync(filename))) {
    bad(`${label}: file must exist under prototype/: ${value}`);
    return null;
  }
  return filename;
}

function checkRequests(source, label) {
  const code = stripComments(source);
  if (/\bfetch\s*\(/.test(code)) bad(`${label}: fetch() is forbidden`);
  if (/\bXMLHttpRequest\b/.test(code)) bad(`${label}: XMLHttpRequest is forbidden`);
}

const checkedCSS = new Set();
function checkCSS(source, label, base = root) {
  // CSS has block comments only; // can be part of an unquoted URL.
  const css = source.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const pattern = /\burl\(\s*(?:"([^"]*)"|'([^']*)'|([^\s)]*))\s*\)|@import\s+(?:"([^"]*)"|'([^']*)')/gi;
  for (const match of css.matchAll(pattern)) {
    const value = match.slice(1).find(part => part !== undefined);
    const file = relativeFile(value, `${label} CSS`, base);
    if (file && path.extname(file).toLowerCase() === '.css') checkCSSFile(file);
  }
}
function checkCSSFile(file) {
  if (checkedCSS.has(file)) return;
  checkedCSS.add(file);
  checkCSS(read(file), path.relative(root, file), path.dirname(file));
}

for (const page of ['index.html', 'valuechain.html']) {
  const html = read(path.join(root, page)).replace(/<!--[\s\S]*?-->/g, '');
  const scripts = [];
  // Remove script bodies before scanning markup: runtime template strings can
  // contain navigation links and are not literal HTML subresources.
  const markup = html.replace(/(<script\b[^>]*>)([\s\S]*?)<\/script\s*>/gi,
    (_, tag, body) => {
      checkRequests(body, `${page} inline script`);
      return tag + '</script>';
    });
  const styles = markup.replace(/<style\b[^>]*>([\s\S]*?)<\/style\s*>/gi,
    (_, css) => { checkCSS(css, page); return ''; });
  for (const tag of styles.matchAll(/<(script|link|img)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)) {
    const kind = tag[1].toLowerCase();
    const attribute = kind === 'link' ? 'href' : 'src';
    const attributes = [...tag[2].matchAll(/([^\s=]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)];
    const attr = attributes.find(a => a[1].toLowerCase() === attribute);
    if (!attr) continue;
    const value = attr.slice(2).find(part => part !== undefined);
    const file = relativeFile(value, `${page} <${kind} ${attribute}>`);
    if (kind === 'script' && file) scripts.push(path.relative(root, file));
    if (kind === 'link' && file && path.extname(file).toLowerCase() === '.css') checkCSSFile(file);
  }
  for (const attr of styles.matchAll(/\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    checkCSS(attr[1] ?? attr[2], page);
  }
  if (scripts.filter(file => file === 'data.js').length !== 1) {
    bad(`${page}: must load data.js exactly once`);
  }
  const vendor = scripts.filter(file => file.startsWith('vendor' + path.sep));
  const expected = path.join('vendor', '3d-force-graph-1.80.0.min.js');
  if (page === 'index.html' ? vendor.length !== 1 || vendor[0] !== expected : vendor.length !== 0) {
    bad(`${page}: expected ${page === 'index.html' ? 'exactly vendor/3d-force-graph-1.80.0.min.js' : 'no vendor scripts'}`);
  }
}

for (const name of fs.readdirSync(root).filter(name => name.endsWith('.js'))) {
  checkRequests(read(path.join(root, name)), name);
}

try {
  // Match check-data.js: read the shared LOGOS table, never duplicate its data.
  const context = { window: {} };
  vm.runInNewContext(read(path.join(root, 'data.js')), context, { timeout: 1000 });
  for (const [name, logo] of Object.entries(context.window.AD.LOGOS)) {
    relativeFile(logo.file, `LOGOS ${JSON.stringify(name)}.file`);
  }
} catch (error) {
  bad(`data.js: could not inspect LOGOS: ${error.message}`);
}

if (failures.length) {
  console.error(`Static checks: ${failures.length} problem(s)\n` + failures.map(f => '  - ' + f).join('\n'));
  process.exit(1);
}
console.log('Static checks OK — local resources, script loading, request APIs and logos');
