#!/usr/bin/env node
/**
 * Doc-accuracy guard. Fails if documentation contains tokens that are known to
 * be WRONG against the ai-gateway code (dead config keys, non-existent APIs,
 * wrong env vars). This prevents the Tier-1 copy-paste-breaking regressions
 * found in the 2026-06 docs gap audit from creeping back in.
 *
 * Each rule: { token, reason, fix }. `token` is matched literally (not regex).
 * Add a rule when an audit confirms a doc string contradicts the code.
 *
 * Usage: node scripts/check-doc-accuracy.mjs
 */
import {readdirSync, readFileSync, statSync, existsSync} from 'node:fs';
import {join, extname} from 'node:path';

// Files/dirs to scan (published docs + the site config + the API spec).
const SCAN_PATHS = ['docs', 'docusaurus.config.ts', 'static/openapi.yaml'];
const SCAN_EXTENSIONS = new Set(['.md', '.mdx', '.ts', '.yaml', '.yml']);

const RULES = [
  {token: 'retry_on_status', reason: 'dead config key', fix: 'use `on_status_codes` (config.go:209)'},
  {token: 'CLOUDFLARE_API_TOKEN', reason: 'wrong env var', fix: 'use `CLOUDFLARE_API_KEY` (providers/providers_list.go)'},
  {token: 'X-Ferro-Trace-Id', reason: 'non-existent header', fix: 'real response header is `X-Request-ID` (internal/logging/logger.go)'},
  {token: 'input_cost_per_token', reason: 'non-existent catalog field', fix: 'use `input_per_m_tokens` (models/catalog.go)'},
  {token: 'WithPlugins(', reason: 'non-existent Go API', fix: 'use RegisterFactory + LoadPlugins / RegisterPlugin (plugin/plugin.go)'},
  {token: 'gw.Serve(', reason: 'non-existent method', fix: 'Gateway has Route/RouteStream/Close, no Serve (gateway.go)'},
  {token: 'gw.Shutdown(', reason: 'non-existent method', fix: 'use Close() (gateway.go)'},
  {token: 'redis-cache', reason: 'non-existent plugin', fix: 'only in-memory `response-cache` exists (internal/plugins/cache)'},
  {token: 'postgres-logger', reason: 'non-existent plugin', fix: 'real plugin is `request-logger` (internal/plugins/logger)'},
  {token: 'model_prefix', reason: 'non-existent condition key', fix: 'Condition has key/value/target_key only (config.go:153)'},
];

function collectFiles(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) {
    return SCAN_EXTENSIONS.has(extname(path)) ? [path] : [];
  }
  const out = [];
  for (const entry of readdirSync(path)) {
    out.push(...collectFiles(join(path, entry)));
  }
  return out;
}

const files = SCAN_PATHS.flatMap(collectFiles);
const offenders = [];

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const rule of RULES) {
      if (line.includes(rule.token)) {
        offenders.push({file, line: i + 1, ...rule});
      }
    }
  });
}

if (offenders.length > 0) {
  console.error(`\n✖ ${offenders.length} doc-accuracy violation(s) — tokens that contradict the ai-gateway code:\n`);
  for (const o of offenders) {
    console.error(`  ${o.file}:${o.line}  "${o.token}" — ${o.reason}; ${o.fix}`);
  }
  console.error('\nFix the docs (or update RULES if the code changed) and retry.\n');
  process.exit(1);
}

console.log(`✓ No known-wrong tokens found across ${files.length} files (${RULES.length} rules).`);
