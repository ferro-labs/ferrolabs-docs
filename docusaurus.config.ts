import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const SITE_URL = 'https://docs.ferrolabs.ai';

// Algolia DocSearch keys are injected at build time. Warn loudly if a
// production build is missing them so search never ships silently broken.
const algoliaAppId = process.env.ALGOLIA_APP_ID ?? 'YOUR_APP_ID';
const algoliaApiKey = process.env.ALGOLIA_SEARCH_KEY ?? 'YOUR_SEARCH_API_KEY';
const algoliaIndexName = process.env.ALGOLIA_INDEX_NAME ?? 'ferrolabs';
if (process.env.NODE_ENV === 'production' && algoliaAppId === 'YOUR_APP_ID') {
  console.warn(
    '\n⚠️  [ferrolabs-docs] ALGOLIA_APP_ID / ALGOLIA_SEARCH_KEY are not set — ' +
      'site search will be non-functional in this production build.\n',
  );
}

// Site-wide structured data (JSON-LD). Helps Google render rich results and
// gives LLM crawlers a clean machine-readable description of the product.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Ferro Labs',
      url: 'https://www.ferrolabs.ai',
      logo: `${SITE_URL}/assets/branding/logo-light.png`,
      sameAs: [
        'https://github.com/ferro-labs/ai-gateway',
        'https://x.com/ferroLabsAI',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}/#software`,
      name: 'Ferro Labs AI Gateway',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, macOS, Windows, Docker, Kubernetes',
      description:
        'Open-source, high-performance AI gateway written in Go. Routes LLM requests across 30 providers and 2,500+ models through a single OpenAI-compatible API, with 6 built-in plugins and 8 routing strategies.',
      url: SITE_URL,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Ferro Labs AI Gateway Docs',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

const config: Config = {
  title: 'Ferro Labs AI Gateway',
  tagline: 'One gateway for every AI model — 30 providers, 2,500+ models, 6 built-in plugins, 8 routing strategies.',
  favicon: 'assets/branding/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.ferrolabs.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ferro-labs-ai',
  projectName: 'ai-gateway',

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',

  // Explicit trailing slash prevents Cloudflare 301 redirect loops and
  // ensures canonical tags match the crawled URLs exactly.
  trailingSlash: true,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    // v4 location for broken-markdown-link strictness (top-level key is deprecated).
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  headTags: [
    // Preload the variable font so it paints with the first frame — removes the
    // flash-of-unstyled-text and the layout shift it caused (better LCP/CLS).
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/fonts/roobert-proportional-vf.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    // Site-wide JSON-LD structured data.
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify(structuredData),
    },
  ],

  themes: [
    '@docusaurus/theme-mermaid',
  ],

  plugins: [
    [
      '@scalar/docusaurus',
      {
        label: 'API Reference',
        route: '/api',
        showNavLink: false,
        configuration: {
          spec: { url: '/openapi.yaml' },
          defaultHttpClient: { targetKey: 'shell', clientKey: 'curl' },
          layout: 'modern',
          hideModels: false,
          customCss: `
            /* Hide Share and Deploy toolbar buttons */
            .api-reference-toolbar > div > *:nth-last-child(1),
            .api-reference-toolbar > div > *:nth-last-child(2) {
              display: none !important;
            }
          `,
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        // 301s for docs pages moved from /guides/ to /integrations/deployment/.
        // Old URLs are still indexed by Google; these preserve SEO value and clear 404s.
        // trailingSlash: true means the plugin emits a single trailing-slash
        // redirect page per entry; the host normalizes the no-slash variant to
        // it, so listing both forms would collide (EEXIST) at build time.
        redirects: [
          {
            to: '/integrations/deployment/docker-compose/',
            from: '/guides/deployment/docker-compose/',
          },
          {
            to: '/integrations/deployment/kubernetes/',
            from: '/guides/kubernetes/',
          },
          {
            // Go SDK guide moved out of /guides/ in v1.1.0; old URL still indexed.
            to: '/integrations/sdk/go/',
            from: '/guides/go-sdk/',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // "Edit this page" + visible freshness — trust signal for readers and a
          // recency signal for search engines.
          editUrl: 'https://github.com/ferro-labs/ferrolabs-docs/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-0EV4MZ2KKT',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'assets/branding/og-card.png',
    titleDelimiter: '|',
    metadata: [
      { name: 'keywords', content: 'AI gateway, LLM proxy, OpenAI compatible API, open source AI gateway, Go LLM proxy, LLM routing, multi-provider AI, self-hosted LLM gateway, AI middleware, LLM load balancing, semantic caching, Ferro Labs Managed' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Ferro Labs AI Gateway Docs' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ferroLabsAI' },
    ],
    announcementBar: {
      id: 'ferrocloud-coming-soon',
      content:
        '🚀 <strong>Ferro Labs Managed</strong> — the managed version of Ferro Labs AI Gateway — is now accepting early access signups. Multi-tenant, dashboard, semantic caching, enterprise plugins. <a href="https://www.ferrolabs.ai/" target="_blank" rel="noopener noreferrer">Join the waitlist →</a>',
      backgroundColor: '#ecfdf5',
      textColor: '#065f46',
      isCloseable: true,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Ferro Labs AI Gateway',
        src: 'assets/branding/logo-light.png',
        srcDark: 'assets/branding/logo-dark.png',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/integrations/overview',
          label: 'Integrations',
          position: 'left',
        },
        {
          to: '/enterprise',
          label: 'Enterprise',
          position: 'left',
        },
        {
          href: '/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: '/changelog',
          label: 'Changelog',
          position: 'left',
        },
        {
          href: 'https://github.com/ferro-labs/ai-gateway',
          position: 'right',
          className: 'navbar-github-link',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
    },
    algolia: {
      appId: algoliaAppId,
      apiKey: algoliaApiKey, // public, read-only Search API key
      indexName: algoliaIndexName,
      // false = no docusaurus_tag facet filter; correct for single-version docs
      contextualSearch: false,
      searchPagePath: 'search',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'go', 'python', 'json', 'promql'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
