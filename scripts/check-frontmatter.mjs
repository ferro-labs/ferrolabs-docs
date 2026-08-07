#!/usr/bin/env node
/**
 * Fails the build if any doc is missing a non-empty `description` in its
 * frontmatter. A unique meta description is the single highest-leverage
 * on-page SEO signal, so we enforce it rather than leave it optional.
 *
 * Usage: node scripts/check-frontmatter.mjs
 */
import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, extname} from 'node:path';

const DOCS_DIR = 'docs';
const DOC_EXTENSIONS = new Set(['.md', '.mdx']);

/** Recursively collect all markdown/MDX files under a directory. */
function collectDocs(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectDocs(full));
    } else if (DOC_EXTENSIONS.has(extname(entry))) {
      out.push(full);
    }
  }
  return out;
}

/** Extract the YAML frontmatter block (between the first pair of `---`). */
function frontmatterOf(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  return match ? match[1] : null;
}

// SERPs truncate around ~160 chars; below ~50 a description is too thin to
// carry the page's primary term. Enforce bounds so drift fails the build.
const MIN_LEN = 50;
const MAX_LEN = 170;

function descriptionOf(frontmatter) {
  if (!frontmatter) return null;
  const line = frontmatter
    .split('\n')
    .find((l) => l.trimStart().startsWith('description:'));
  if (!line) return null;
  const value = line.slice(line.indexOf('description:') + 'description:'.length).trim();
  return value.replace(/^["']|["']$/g, '');
}

const offenders = [];
for (const file of collectDocs(DOCS_DIR)) {
  const desc = descriptionOf(frontmatterOf(readFileSync(file, 'utf8')));
  if (!desc) {
    offenders.push({file, problem: 'missing description'});
  } else if (desc.length < MIN_LEN) {
    offenders.push({file, problem: `description too short (${desc.length} < ${MIN_LEN} chars)`});
  } else if (desc.length > MAX_LEN) {
    offenders.push({file, problem: `description too long (${desc.length} > ${MAX_LEN} chars, SERPs truncate)`});
  }
}

if (offenders.length > 0) {
  console.error(`\n✖ ${offenders.length} doc(s) with a frontmatter \`description:\` problem\n`);
  for (const {file, problem} of offenders) console.error(`  - ${file}: ${problem}`);
  console.error(
    `\nEvery doc needs a unique ${MIN_LEN}–${MAX_LEN} char description (aim ~140–160) for SEO. Fix and retry.\n`,
  );
  process.exit(1);
}

console.log(`✓ All docs have a frontmatter description within ${MIN_LEN}–${MAX_LEN} chars.`);
