import React from 'react';
import Link from '@docusaurus/Link';
import { PRODUCT } from '@site/src/data/product';
import styles from './Footer.module.css';

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscussionsIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '3px', opacity: 0.55 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

const DOCS_LINKS = [
  { label: 'Introduction', href: '/', external: false },
  { label: 'Quickstart', href: '/getting-started/quickstart', external: false },
  { label: 'Providers', href: '/providers', external: false },
  { label: 'Routing', href: '/routing', external: false },
  { label: 'Plugins', href: '/plugins', external: false },
  { label: 'MCP Integration', href: '/guides/mcp', external: false },
  { label: 'Benchmarks', href: '/benchmarks', external: false },
  { label: 'API Reference', href: '/api', external: false },
];

const RESOURCES_LINKS = [
  { label: 'Changelog', href: '/changelog', external: false },
  { label: 'FAQ', href: '/faq', external: false },
  { label: 'Enterprise', href: '/enterprise', external: false },
  { label: 'GitHub Releases', href: 'https://github.com/ferro-labs/ai-gateway/releases', external: true },
  { label: 'Contributing', href: 'https://github.com/ferro-labs/ai-gateway/blob/main/CONTRIBUTING.md', external: true },
];

const COMMUNITY_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ferro-labs/ai-gateway', Icon: GitHubIcon, external: true },
  { label: 'X / Twitter', href: 'https://x.com/ferroLabsAI', Icon: XIcon, external: true },
  { label: 'Discussions', href: 'https://github.com/ferro-labs/ai-gateway/discussions', Icon: DiscussionsIcon, external: true },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandDot} />
            Ferro Labs
          </div>
          <p className={styles.brandDesc}>
            Open-source AI gateway for {PRODUCT.providers} providers and {PRODUCT.models} models.
            Self-hosted, {PRODUCT.license} licensed, and production-ready.
          </p>
          <div className={styles.socialRow}>
            {COMMUNITY_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className={styles.socialBtn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Docs column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Documentation</div>
          <ul className={styles.linkList}>
            {DOCS_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                {external ? (
                  <a href={href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                    {label}<ExternalLinkIcon />
                  </a>
                ) : (
                  <Link to={href} className={styles.footerLink}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Resources column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Resources</div>
          <ul className={styles.linkList}>
            {RESOURCES_LINKS.map(({ label, href, external }) => (
              <li key={label}>
                {external ? (
                  <a href={href} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                    {label}<ExternalLinkIcon />
                  </a>
                ) : (
                  <Link to={href} className={styles.footerLink}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* OSS badge column */}
        <div className={styles.col}>
          <div className={styles.colTitle}>Open Source</div>
          <a
            href="https://github.com/ferro-labs/ai-gateway"
            className={styles.githubCard}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            <div>
              <div className={styles.githubCardTitle}>ferro-labs/ai-gateway</div>
              <div className={styles.githubCardSub}>{PRODUCT.license} · v{PRODUCT.version}</div>
            </div>
          </a>
          <div className={styles.badges}>
            <span className={styles.badge}>Go {PRODUCT.goVersion}</span>
            <span className={styles.badge}>{PRODUCT.providers} Providers</span>
            <span className={styles.badge}>{PRODUCT.models} Models</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Ferro Labs. Apache 2.0 licensed.</span>
        <div className={styles.bottomLinks}>
          <Link to="/security/data-handling" className={styles.bottomLink}>Security</Link>
          <a href="https://github.com/ferro-labs/ai-gateway/blob/main/LICENSE" className={styles.bottomLink} target="_blank" rel="noopener noreferrer">License</a>
        </div>
      </div>
    </footer>
  );
}
