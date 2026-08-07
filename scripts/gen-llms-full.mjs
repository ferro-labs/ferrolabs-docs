#!/usr/bin/env node
/**
 * Generates static/llms-full.txt — a single machine-readable corpus of the
 * whole documentation site for LLM/agent consumption (the long-form companion
 * to the curated static/llms.txt). Regenerated on every build.
 *
 * Usage: node scripts/gen-llms-full.mjs
 */
import {readdirSync, readFileSync, writeFileSync, statSync} from 'node:fs';
import {join, extname} from 'node:path';

const DOCS_DIR = 'docs';
const OUT = 'static/llms-full.txt';
const SITE = 'https://docs.ferrolabs.ai';
const DOC_EXTENSIONS = new Set(['.md', '.mdx']);

function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collect(full));
    else if (DOC_EXTENSIONS.has(extname(entry))) out.push(full);
  }
  return out;
}

/** Map a docs/ file path to its published URL (routeBasePath '/', trailing slash). */
function toUrl(file) {
  let route = file.slice(DOCS_DIR.length).replace(/\.(md|mdx)$/, '');
  route = route.replace(/\/index$/, '');
  // intro.mdx has slug '/', so it is served at the site root, not /intro/.
  if (route === '/intro') route = '';
  return `${SITE}${route}/`.replace(/\/+$/, '/');
}

function parse(content) {
  const fm = content.match(/^---\n([\s\S]*?)\n---\n?/);
  const frontmatter = fm ? fm[1] : '';
  const body = fm ? content.slice(fm[0].length) : content;
  const titleLine = frontmatter.split('\n').find((l) => l.trimStart().startsWith('title:'));
  const title = titleLine
    ? titleLine.slice(titleLine.indexOf('title:') + 6).trim().replace(/^["']|["']$/g, '')
    : 'Untitled';
  // Drop MDX import lines for a cleaner plaintext corpus.
  const cleaned = body
    .split('\n')
    .filter((l) => !/^import\s.+from\s+['"]/.test(l.trim()))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return {title, body: cleaned};
}

const files = collect(DOCS_DIR);
const parts = [
  '# Ferro Labs AI Gateway — Full Documentation',
  '',
  '> Machine-readable corpus of the entire docs site. The curated index is at /llms.txt.',
  `> Generated from ${files.length} pages. Canonical site: ${SITE}`,
  '',
];

for (const file of files) {
  const {title, body} = parse(readFileSync(file, 'utf8'));
  parts.push('\n', '='.repeat(80), `# ${title}`, `Source: ${toUrl(file)}`, '='.repeat(80), '', body, '');
}

writeFileSync(OUT, parts.join('\n') + '\n', 'utf8');
console.log(`✓ Wrote ${OUT} from ${files.length} docs.`);
