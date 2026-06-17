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

function hasDescription(frontmatter) {
  if (!frontmatter) return false;
  const line = frontmatter
    .split('\n')
    .find((l) => l.trimStart().startsWith('description:'));
  if (!line) return false;
  const value = line.slice(line.indexOf('description:') + 'description:'.length).trim();
  return value.replace(/^["']|["']$/g, '').length > 0;
}

const offenders = collectDocs(DOCS_DIR).filter((file) => {
  const frontmatter = frontmatterOf(readFileSync(file, 'utf8'));
  return !hasDescription(frontmatter);
});

if (offenders.length > 0) {
  console.error(
    `\n✖ ${offenders.length} doc(s) missing a non-empty frontmatter \`description:\`\n`,
  );
  for (const file of offenders) console.error(`  - ${file}`);
  console.error(
    '\nEvery doc needs a unique 140–160 char description for SEO. Add one and retry.\n',
  );
  process.exit(1);
}

console.log('✓ All docs have a frontmatter description.');
