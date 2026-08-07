import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './404.module.css';

const POPULAR_LINKS = [
  {to: '/getting-started/quickstart', label: 'Quickstart', desc: 'Run the gateway in 30 seconds'},
  {to: '/getting-started/configuration', label: 'Configuration', desc: 'Full config reference'},
  {to: '/integrations/overview', label: 'Integrations', desc: 'SDKs, frameworks, deployment'},
  {to: '/providers', label: 'Providers', desc: 'Connect 29 AI providers'},
  {to: '/api', label: 'API Reference', desc: 'OpenAI-compatible endpoints'},
  {to: '/guides/troubleshooting', label: 'Troubleshooting', desc: 'Fix common issues'},
];

export default function NotFound(): React.ReactElement {
  return (
    <Layout title="Page not found" description="The page you were looking for could not be found.">
      <main className={styles.wrapper}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page took a wrong route.</h1>
        <p className={styles.subtitle}>
          The page you’re looking for doesn’t exist or has moved. Try the search in the
          top bar, or jump to one of these popular destinations.
        </p>

        <div className={styles.grid}>
          {POPULAR_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className={styles.card}>
              <span className={styles.cardLabel}>{link.label}</span>
              <span className={styles.cardDesc}>{link.desc}</span>
            </Link>
          ))}
        </div>

        <Link to="/" className={styles.homeLink}>
          ← Back to documentation home
        </Link>
      </main>
    </Layout>
  );
}
