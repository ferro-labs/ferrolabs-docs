import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// ── Feature SVG Icons ─────────────────────────────────────────────────────────
function IconGlobe() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconRoute() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-8a3.5 3.5 0 0 1 0-7H12" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconPlug() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12M5 12H2a10 10 0 0 0 20 0h-3M5 12V7l7-5 7 5v5" />
      <line x1="9" y1="7" x2="9" y2="12" /><line x1="15" y1="7" x2="15" y2="12" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '19', label: 'AI Providers' },
  { value: '2,500+', label: 'Models' },
  { value: '11', label: 'Plugins' },
  { value: '6', label: 'Routing Strategies' },
];

const FEATURES = [
  {
    Icon: IconGlobe,
    title: 'Universal Provider Access',
    desc: 'One API for OpenAI, Anthropic, Gemini, Mistral, Groq, xAI, Azure, AWS Bedrock, Vertex AI, Hugging Face, and 9 more — all from a single endpoint.',
    link: '/guides/providers',
    linkLabel: 'View all providers →',
  },
  {
    Icon: IconRoute,
    title: 'Intelligent Routing',
    desc: 'Six strategies: single, fallback with exponential backoff, weighted load balancing, conditional routing, least-latency, and cost-optimized.',
    link: '/guides/routing-policies',
    linkLabel: 'Routing strategies →',
  },
  {
    Icon: IconShield,
    title: 'Built-in Safety Plugins',
    desc: 'PII redaction, secret scanning, prompt shield, word filter, schema guard, regex guard, max-token, response cache, rate limit — 11 plugins total.',
    link: '/guides/plugins',
    linkLabel: 'Plugin catalogue →',
  },
  {
    Icon: IconPlug,
    title: 'MCP Integration',
    desc: 'First-class Model Context Protocol support. Connect filesystem, database, and custom tool servers to any model via an agentic loop.',
    link: '/guides/mcp',
    linkLabel: 'MCP guide →',
  },
  {
    Icon: IconChart,
    title: 'Production Observability',
    desc: 'Prometheus metrics at /metrics, structured JSON logs with per-request trace IDs, and deep per-provider health checks at /health.',
    link: '/guides/observability',
    linkLabel: 'Observability docs →',
  },
  {
    Icon: IconBolt,
    title: 'Drop-in OpenAI Compatible',
    desc: 'Set base_url to the gateway. Your OpenAI SDK, LangChain, LlamaIndex, or custom client works unchanged. No code modifications needed.',
    link: '/getting-started/quickstart',
    linkLabel: 'Quickstart →',
  },
];

const PROVIDERS = [
  'OpenAI', 'Anthropic', 'Google Gemini', 'Mistral', 'Groq', 'Cohere',
  'DeepSeek', 'Together AI', 'Perplexity', 'Fireworks AI', 'AI21',
  'Azure OpenAI', 'Azure Foundry', 'Ollama', 'AWS Bedrock',
  'Replicate', 'Vertex AI', 'Hugging Face', 'xAI Grok',
];

// ── Code Tab Content ──────────────────────────────────────────────────────────
type TabId = 'python' | 'go' | 'curl' | 'yaml';

const CODE_TABS: { id: TabId; label: string }[] = [
  { id: 'python', label: 'Python' },
  { id: 'go', label: 'Go' },
  { id: 'curl', label: 'cURL' },
  { id: 'yaml', label: 'config.yaml' },
];

const CODE_SNIPPETS: Record<TabId, string> = {
  python: `from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8080/v1",
    api_key="any",          # gateway manages provider creds
)

# Route to Anthropic — no SDK changes needed
response = client.chat.completions.create(
    model="claude-3-5-sonnet-20241022",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(response.choices[0].message.content)

# Use cost-optimized — gateway picks cheapest provider
response2 = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Summarize this."}],
)`,
  go: `package main

import (
    "context"
    "fmt"
    openai "github.com/sashabaranov/go-openai"
)

func main() {
    cfg := openai.DefaultConfig("any") // gateway handles creds
    cfg.BaseURL = "http://localhost:8080/v1"
    client := openai.NewClientWithConfig(cfg)

    resp, err := client.CreateChatCompletion(
        context.Background(),
        openai.ChatCompletionRequest{
            Model: "claude-3-5-sonnet-20241022",
            Messages: []openai.ChatCompletionMessage{
                {Role: openai.ChatMessageRoleUser, Content: "Hello!"},
            },
        },
    )
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Choices[0].Message.Content)
}`,
  curl: `# Basic chat completion — routes via configured strategy
curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'

# Force a specific provider with X-Provider header
curl http://localhost:8080/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "X-Provider: anthropic" \\
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "messages": [{"role": "user", "content": "Hello!"}],
    "stream": true
  }'`,
  yaml: `# config.yaml — place next to the binary or /etc/ai-gateway/
routes:
  - path: /v1/chat/completions
    strategy: fallback
    targets:
      - provider: openai
        model: gpt-4o
      - provider: anthropic
        model: claude-3-5-sonnet-20241022

  - path: /v1/chat/completions
    match:
      header: X-Tier
      value: premium
    strategy: single
    targets:
      - provider: openai
        model: gpt-4o

plugins:
  - name: rate-limit
    type: before_request
    config:
      requests_per_minute: 60
  - name: pii-redact
    type: before_request
    config:
      action: redact`,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const [activeTab, setActiveTab] = useState<TabId>('python');

  return (
    <Layout
      title="Ferro Labs AI Gateway — Docs"
      description="Open-source AI gateway for 19 providers, 2500+ models. Drop-in OpenAI-compatible proxy with routing, plugins, MCP, and full observability.">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span>⚙</span> Open Source · Apache 2.0 · v0.8.0
          </div>
          <h1 className={styles.heroTitle}>
            One Gateway for<br />
            <span className={styles.heroAccent}>Every AI Model</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A high-performance, OpenAI-compatible proxy for 19 providers and 2,500+ models.
            Sub-millisecond routing, 11 built-in safety plugins, circuit breakers, and
            first-class MCP integration — self-hosted and production-ready.
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.btnPrimary} to="/getting-started/quickstart">
              Get Started →
            </Link>
            <Link className={styles.btnSecondary} href="https://github.com/ferro-labs/ai-gateway">
              <GitHubIcon /> Star on GitHub
            </Link>
          </div>
          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Install strip ─────────────────────────────────────── */}
      <div className={styles.installStrip}>
        <div className={styles.installLabel}>Start in 30 seconds</div>
        <div className={styles.codeInline}>
          <span className={styles.prompt}>$</span>
          <span className={styles.cmdText}>
            docker run <span className={styles.cmdFlag}>-p</span> <span className={styles.cmdValue}>8080:8080</span>{' '}
            <span className={styles.cmdFlag}>-e</span> <span className={styles.cmdHighlight}>OPENAI_API_KEY</span>=sk-...{' '}
            ghcr.io/ferro-labs/ai-gateway:latest
          </span>
        </div>
      </div>

      {/* ── Features grid ─────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionEyebrow}>Capabilities</div>
          <h2 className={styles.sectionHeading}>Everything the production gateway needs</h2>
          <p className={styles.sectionDesc}>
            Built in Go for low latency and high concurrency. Designed to be deployed
            in front of your LLM traffic without changing your existing client code.
          </p>
          <div className={styles.featureGrid}>
            {FEATURES.map(f => (
              <Link key={f.title} to={f.link} className={styles.featureCard}>
                <span className={styles.featureIcon}><f.Icon /></span>
                <div className={styles.featureTitle}>{f.title}</div>
                <p className={styles.featureDesc}>{f.desc}</p>
                <span className={styles.featureLink}>{f.linkLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Providers ─────────────────────────────────────────── */}
      <div className={styles.providersSection}>
        <div className={styles.sectionEyebrow} style={{ marginBottom: '0.6rem' }}>Provider Support</div>
        <h2 className={styles.sectionHeading}>19 providers out of the box</h2>
        <p className={styles.sectionDesc}>
          Credentials are registered via environment variables. Enable any provider in
          seconds — no code changes, no rebuilds.
        </p>
        <div className={styles.providersGrid}>
          {PROVIDERS.map(p => (
            <span key={p} className={styles.providerBadge}>{p}</span>
          ))}
        </div>
      </div>

      {/* ── Quick Start ───────────────────────────────────────── */}
      <div className={styles.section}>
        <div className={styles.qsGrid}>
          <div className={styles.qsText}>
            <h2>Up and running in minutes</h2>
            <p>
              Point any OpenAI-compatible client at <code>http://localhost:8080</code> and the
              gateway handles provider credentials, routing, retries, and observability for you.
            </p>
            <p>
              Use the same model name to switch providers transparently, or use
              conditional routing rules to send different models to different backends.
            </p>
            <div className={styles.qsLinks}>
              <Link className={styles.qsLink} to="/getting-started/quickstart">→ Quickstart guide</Link>
              <Link className={styles.qsLink} to="/getting-started/configuration">→ Configuration reference</Link>
              <Link className={styles.qsLink} to="/guides/routing-policies">→ Routing strategies</Link>
              <Link className={styles.qsLink} to="/guides/plugins">→ Plugin catalogue</Link>
              <Link className={styles.qsLink} to="/guides/mcp">→ MCP integration</Link>
            </div>
          </div>

          <div className={styles.qsCodeWrap}>
            <div className={styles.codeTabBar} role="tablist">
              {CODE_TABS.map(t => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`${styles.codeTabBtn} ${activeTab === t.id ? styles.codeTabActive : ''}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <pre className={styles.codePre}>
              <code>{CODE_SNIPPETS[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Start routing AI traffic today</h2>
        <p className={styles.ctaSubtitle}>
          Open source under Apache 2.0. Self-host in minutes, scale to production, and
          never depend on a single LLM provider again.
        </p>
        <div className={styles.ctaButtons}>
          <Link className={styles.ctaBtnLight} to="/getting-started/quickstart">
            Read the Docs →
          </Link>
          <Link className={styles.ctaBtnOutline} href="https://github.com/ferro-labs/ai-gateway">
            <GitHubIcon /> Star on GitHub
          </Link>
        </div>
      </div>
    </Layout>
  );
}
