import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/quickstart',
        'getting-started/architecture',
        'getting-started/request-lifecycle',
        'getting-started/concepts',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Providers',
          collapsed: false,
          items: [
            'guides/providers',
            'guides/providers-config',
          ],
        },
        {
          type: 'category',
          label: 'Routing',
          collapsed: false,
          items: [
            'guides/routing-policies',
          ],
        },
        {
          type: 'category',
          label: 'Features',
          collapsed: false,
          items: [
            'guides/plugins',
            'guides/mcp',
            'guides/rate-limiting',
          ],
        },
        {
          type: 'category',
          label: 'Auth & Access',
          collapsed: false,
          items: [
            'guides/auth',
            'guides/admin-auth',
            'guides/workspace-sign-in-domains',
          ],
        },
        {
          type: 'category',
          label: 'Observability',
          collapsed: false,
          items: [
            'guides/observability',
          ],
        },
      ],
    },
    {
      type: 'link',
      label: 'API Reference ↗',
      href: '/api',
    },
    {
      type: 'category',
      label: 'SDKs',
      collapsed: true,
      items: ['sdks/overview'],
    },
    {
      type: 'category',
      label: 'Frameworks',
      collapsed: false,
      items: [
        'frameworks/index',
        {
          type: 'category',
          label: 'Python',
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
          collapsed: true,
          items: [
            'frameworks/vercel-ai-sdk',
            'frameworks/langchain-js',
            'frameworks/mastra',
          ],
        },
      ],
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
    'changelog',
  ],
};

export default sidebars;
