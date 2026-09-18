/**
 * Canonical product facts — the single source of truth for numbers that appear
 * across the site (homepage, footer, intro, structured data). Import these
 * instead of hardcoding counts so a release bump is a one-line change and the
 * repo's drift-guard has one place to check.
 *
 * Ground truth: ai-gateway CHANGELOG.md + providers/README.md as of the version
 * below, plus FerroCloud's cloudOnlyPlugins catalog. Keep in sync on every release.
 */
export const PRODUCT = {
  version: '1.5.8',
  license: 'Apache 2.0',
  goVersion: '1.25',
  providers: 30,
  models: '2,500+',
  ossPlugins: 11,
  managedPlugins: 3,
  strategies: 8,
  image: 'ghcr.io/ferro-labs/ai-gateway',
  repo: 'https://github.com/ferro-labs/ai-gateway',
  website: 'https://www.ferrolabs.ai',
  models_page: 'https://www.ferrolabs.ai/models',
  waitlist: 'https://www.ferrolabs.ai/',
} as const;
