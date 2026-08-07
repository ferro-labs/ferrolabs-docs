import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// ── Inline line-icons for section headers (stroke inherits the divider color) ──
const svg = (paths: string) =>
  `<svg class="sidebar-divider__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  rocket: svg('<path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z"/><circle cx="15" cy="9" r="1.3"/>'),
  plug: svg('<path d="M12 22v-5"/><path d="M9 7V2M15 7V2"/><path d="M7 7h10v4a5 5 0 0 1-10 0z"/>'),
  layers: svg('<path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>'),
  book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
  chart: svg('<path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/>'),
  brackets: svg('<path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/>'),
  sparkle: svg('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
} as const;

const divider = (icon: string, label: string) => ({
  type: 'html' as const,
  value: `<div class="sidebar-divider">${icon}<span>${label}</span></div>`,
});

/**
 * Structure rules, so the sidebar stays scannable:
 * - A run of 3+ sibling pages lives in a COLLAPSED category whose header links
 *   to the section's overview page (click = open overview + expand).
 * - Dividers group categories/pages by reader task, not by folder.
 * - No item may repeat its section label ("Integrations" under INTEGRATIONS).
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    divider(ICONS.rocket, 'Get Started'),
    'getting-started/overview',
    'getting-started/quickstart',
    'getting-started/architecture',
    'getting-started/request-lifecycle',
    'getting-started/concepts',
    'getting-started/configuration',

    divider(ICONS.layers, 'Core'),
    {
      type: 'category',
      label: 'Providers',
      link: {type: 'doc', id: 'providers/overview'},
      collapsed: true,
      items: ['providers/configuration'],
    },
    {
      type: 'category',
      label: 'Routing',
      link: {type: 'doc', id: 'routing/overview'},
      collapsed: true,
      items: [
        {type: 'doc', id: 'routing/single', label: 'Single'},
        {type: 'doc', id: 'routing/fallback', label: 'Fallback'},
        {type: 'doc', id: 'routing/loadbalance', label: 'Load Balance'},
        {type: 'doc', id: 'routing/least-latency', label: 'Least Latency'},
        {type: 'doc', id: 'routing/cost-optimized', label: 'Cost Optimized'},
        {type: 'doc', id: 'routing/conditional', label: 'Conditional'},
        {type: 'doc', id: 'routing/content-based', label: 'Content Based'},
        {type: 'doc', id: 'routing/ab-test', label: 'A/B Test'},
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      link: {type: 'doc', id: 'plugins/overview'},
      collapsed: true,
      items: [
        {type: 'doc', id: 'plugins/word-filter', label: 'Word Filter'},
        {type: 'doc', id: 'plugins/max-token', label: 'Max Token'},
        {type: 'doc', id: 'plugins/rate-limit', label: 'Rate Limit'},
        {type: 'doc', id: 'plugins/budget', label: 'Budget'},
        {type: 'doc', id: 'plugins/response-cache', label: 'Response Cache'},
        {type: 'doc', id: 'plugins/request-logger', label: 'Request Logger'},
        {type: 'doc', id: 'plugins/enterprise', label: 'Managed Plugins'},
      ],
    },
    {type: 'doc', id: 'guides/mcp', label: 'MCP'},
    {type: 'doc', id: 'guides/dashboard', label: 'Dashboard'},

    divider(ICONS.plug, 'Integrations'),
    {type: 'doc', id: 'integrations/overview', label: 'Overview'},
    {
      type: 'category',
      label: 'SDKs',
      className: 'sbi sbi-code',
      collapsed: true,
      items: [
        'integrations/sdk/python/quickstart',
        'integrations/sdk/python/reference',
        'integrations/sdk/python/async',
        'integrations/sdk/python/error-handling',
        'integrations/sdk/go',
        'integrations/sdk/typescript',
        'integrations/sdk/openai-compatible',
      ],
    },
    {
      type: 'category',
      label: 'Frameworks',
      link: {type: 'doc', id: 'frameworks/index'},
      collapsed: true,
      items: [
        'frameworks/langchain-python',
        'frameworks/langgraph',
        'frameworks/langsmith',
        'frameworks/llamaindex',
        'frameworks/crewai',
        'frameworks/autogen',
        'frameworks/haystack',
        'frameworks/dspy',
        'frameworks/pydantic-ai',
        'frameworks/instructor',
        'frameworks/vercel-ai-sdk',
        'frameworks/langchain-js',
        'frameworks/mastra',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      className: 'sbi sbi-server',
      collapsed: true,
      items: [
        'integrations/deployment/docker-compose',
        'integrations/deployment/kubernetes',
        'integrations/deployment/railway',
        'integrations/deployment/render',
        'integrations/deployment/fly-io',
      ],
    },

    divider(ICONS.book, 'Guides'),
    {type: 'doc', id: 'guides/use-cases', label: 'Use Cases'},
    'guides/auth',
    'guides/virtual-keys',
    'guides/rate-limiting',
    'guides/cost-tracking',
    'security/data-handling',
    'guides/troubleshooting',

    divider(ICONS.chart, 'Operations'),
    'guides/observability',
    'operations/monitoring',
    'operations/request-logging',
    'operations/server-settings',
    'operations/cli-reference',

    divider(ICONS.brackets, 'Reference'),
    {type: 'link', label: 'API Reference ↗', href: '/api', className: 'sbi sbi-brackets'},
    {
      type: 'category',
      label: 'HTTP API',
      className: 'sbi sbi-brackets',
      collapsed: true,
      items: [
        'api-reference/overview',
        'api-reference/endpoints',
        'api-reference/streaming',
        'api-reference/admin',
        'api-reference/errors',
      ],
    },
    'benchmarks',
    'changelog',

    divider(ICONS.sparkle, 'More'),
    {
      type: 'category',
      label: 'Ferro Labs Managed',
      link: {type: 'doc', id: 'ferrocloud/overview'},
      collapsed: true,
      items: ['ferrocloud/semantic-cache', 'guides/prompt-templates'],
    },
    'enterprise',
    'guides/why-ferro',
    'guides/oss-vs-ferrocloud',
    {
      type: 'category',
      label: 'Migration Guides',
      className: 'sbi sbi-refresh',
      collapsed: true,
      items: [
        'guides/migration-litellm',
        'guides/migration-portkey',
        'guides/migration-openrouter',
      ],
    },
    'faq/index',
  ],
};

export default sidebars;
