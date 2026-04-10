import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    // ── Get Started ──
    {type: 'html', value: '<div class="sidebar-divider">Get Started</div>'},
    'getting-started/overview',
    'getting-started/quickstart',
    'getting-started/architecture',
    'getting-started/request-lifecycle',
    'getting-started/concepts',
    'getting-started/configuration',

    // ── Integrations ──
    {type: 'html', value: '<div class="sidebar-divider">Integrations</div>'},
    'integrations/overview',
    {
      type: 'category',
      label: 'Python SDK',
      collapsed: true,
      items: [
        'integrations/sdk/python/quickstart',
        'integrations/sdk/python/reference',
        'integrations/sdk/python/async',
        'integrations/sdk/python/error-handling',
      ],
    },
    'integrations/sdk/go',
    'integrations/sdk/openai-compatible',

    // ── Self Hosting ──
    {type: 'html', value: '<div class="sidebar-divider">Self Hosting</div>'},
    'integrations/deployment/railway',
    'integrations/deployment/render',
    'integrations/deployment/docker-compose',
    'integrations/deployment/kubernetes',
    'integrations/deployment/fly-io',

    // ── Guides ──
    {type: 'html', value: '<div class="sidebar-divider">Guides</div>'},
    'guides/providers',
    'guides/providers-config',
    'guides/routing-policies',
    'guides/use-cases',
    'guides/plugins',
    'guides/mcp',
    'guides/prompt-templates',
    'guides/rate-limiting',

    // ── Auth & Security ──
    {type: 'html', value: '<div class="sidebar-divider">Auth & Security</div>'},
    'guides/auth',
    'guides/admin-auth',
    'guides/workspace-sign-in-domains',
    'security/data-handling',

    // ── Observability ──
    {type: 'html', value: '<div class="sidebar-divider">Observability</div>'},
    'guides/observability',
    'operations/monitoring',
    'operations/request-logging',
    'operations/server-settings',

    // ── Reference ──
    {type: 'html', value: '<div class="sidebar-divider">Reference</div>'},
    {type: 'link', label: 'API Reference ↗', href: '/api'},
    'benchmarks',
    'changelog',

    // ── More ──
    {type: 'html', value: '<div class="sidebar-divider">More</div>'},
    'ferrocloud/overview',
    'ferrocloud/semantic-cache',
    'enterprise',
    'guides/why-ferro',
    'guides/oss-vs-ferrocloud',
    'guides/migration-litellm',
    'guides/migration-portkey',
    'guides/troubleshooting',
    'faq/index',
  ],
};

export default sidebars;
