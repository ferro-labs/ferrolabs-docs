import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/architecture',
        'getting-started/request-lifecycle',
        'getting-started/quickstart',
        'getting-started/concepts',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/providers',
        'guides/providers-config',
        'guides/auth',
        'guides/workspace-sign-in-domains',
        'guides/routing-policies',
        'guides/observability',
        'guides/plugins',
        'guides/rate-limiting',
        'guides/admin-auth',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api-reference/overview',
        'api-reference/endpoints',
        'api-reference/admin',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      collapsed: false,
      items: ['sdks/overview'],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsed: false,
      items: [
        'operations/monitoring',
        'operations/request-logging',
        'operations/server-settings',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      collapsed: false,
      items: ['security/data-handling'],
    },
    {
      type: 'category',
      label: 'FAQ',
      collapsed: false,
      items: ['faq/index'],
    },
    'changelog',
  ],
};

export default sidebars;
