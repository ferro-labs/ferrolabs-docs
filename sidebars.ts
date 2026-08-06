import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// ── Inline line-icons for section headers (stroke inherits the divider color) ──
const svg = (paths: string) =>
  `<svg class="sidebar-divider__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  rocket: svg('<path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z"/><circle cx="15" cy="9" r="1.3"/>'),
  plug: svg('<path d="M12 22v-5"/><path d="M9 7V2M15 7V2"/><path d="M7 7h10v4a5 5 0 0 1-10 0z"/>'),
  layers: svg('<path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/>'),
  server: svg('<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01"/>'),
  book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'),
  shield: svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
  chart: svg('<path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 5-6"/>'),
  brackets: svg('<path d="M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2"/><path d="M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"/>'),
  sparkle: svg('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
  route: svg('<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M6 16.5V11a4 4 0 0 1 4-4h4"/><path d="m14 4-2 3 3 2"/>'),
  puzzle: svg('<path d="M9 3a2 2 0 0 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 0 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 0 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 0 1 0-4h1V5a1 1 0 0 1 1-1h3z"/>'),
} as const;

const divider = (icon: string, label: string) => ({
  type: 'html' as const,
  value: `<div class="sidebar-divider">${icon}<span>${label}</span></div>`,
});

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

    divider(ICONS.plug, 'Integrations'),
    'integrations/overview',
    {
      type: 'category',
      label: 'Python SDK',
      className: 'sbi sbi-python',
      collapsed: true,
      items: [
        'integrations/sdk/python/quickstart',
        'integrations/sdk/python/reference',
        'integrations/sdk/python/async',
        'integrations/sdk/python/error-handling',
      ],
    },
    'integrations/sdk/go',
    'integrations/sdk/typescript',
    'integrations/sdk/openai-compatible',

    divider(ICONS.layers, 'Frameworks'),
    'frameworks/index',
    {
      type: 'category',
      label: 'Python',
      className: 'sbi sbi-python',
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
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      className: 'sbi sbi-code',
      collapsed: true,
      items: [
        'frameworks/vercel-ai-sdk',
        'frameworks/langchain-js',
        'frameworks/mastra',
      ],
    },

    divider(ICONS.server, 'Self Hosting'),
    'integrations/deployment/railway',
    'integrations/deployment/render',
    'integrations/deployment/docker-compose',
    'integrations/deployment/kubernetes',
    'integrations/deployment/fly-io',

    divider(ICONS.plug, 'Providers'),
    'providers/overview',
    'providers/configuration',

    divider(ICONS.route, 'Routing'),
    'routing/overview',
    'routing/single',
    'routing/fallback',
    'routing/loadbalance',
    'routing/least-latency',
    'routing/cost-optimized',
    'routing/conditional',
    'routing/content-based',
    'routing/ab-test',

    divider(ICONS.puzzle, 'Plugins'),
    'plugins/overview',
    'plugins/word-filter',
    'plugins/max-token',
    'plugins/rate-limit',
    'plugins/budget',
    'plugins/response-cache',
    'plugins/request-logger',
    'plugins/enterprise',

    divider(ICONS.book, 'Guides'),
    'guides/use-cases',
    'guides/dashboard',
    'guides/mcp',
    'guides/prompt-templates',
    'guides/rate-limiting',
    'guides/virtual-keys',
    'guides/cost-tracking',

    divider(ICONS.shield, 'Auth & Security'),
    'guides/auth',
    'security/data-handling',

    divider(ICONS.chart, 'Observability'),
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
    'ferrocloud/overview',
    'ferrocloud/semantic-cache',
    'enterprise',
    'guides/why-ferro',
    'guides/oss-vs-ferrocloud',
    'guides/migration-litellm',
    'guides/migration-portkey',
    'guides/migration-openrouter',
    'guides/troubleshooting',
    'faq/index',
  ],
};

export default sidebars;
