import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Ferro Labs AI Gateway',
  tagline: 'One gateway for every AI model — 19 providers, 2,500+ models, 11 plugins.',
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
  },

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
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-5F8673S5L5',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'assets/branding/logo-light.png',
    titleDelimiter: '|',
    metadata: [
      { name: 'keywords', content: 'AI gateway, LLM proxy, OpenAI compatible, open source AI, LLM routing, multi-provider AI, self-hosted AI gateway, AI middleware' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Ferro Labs AI Gateway Docs' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ferroLabsAI' },
    ],
    announcementBar: {
      id: 'ferrocloud-coming-soon',
      content:
        'Join <strong>FerroCloud</strong> coming soon. LLM observability data, optimizes prompts and models, sets up evals, and runs A/B tests. <a href="https://www.ferrolabs.ai/" target="_blank" rel="noopener noreferrer">Join the waitlist →</a>',
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
      appId: process.env.ALGOLIA_APP_ID ?? 'YOUR_APP_ID',
      apiKey: process.env.ALGOLIA_SEARCH_KEY ?? 'YOUR_SEARCH_API_KEY', // public, read-only Search API key
      indexName: process.env.ALGOLIA_INDEX_NAME ?? 'ferrolabs',
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
