import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './SubNav.module.css';

const NAV_ITEMS = [
  {
    label: 'Overview',
    href: '/intro',
    prefixes: ['/intro'],
    exact: true,
  },
  {
    label: 'Getting Started',
    href: '/getting-started/overview',
    prefixes: ['/getting-started'],
    exact: false,
  },
  {
    label: 'Guides',
    href: '/guides/providers',
    prefixes: ['/guides'],
    exact: false,
  },
  {
    label: 'Operations',
    href: '/operations/monitoring',
    prefixes: ['/operations'],
    exact: false,
  },
  {
    label: 'Security',
    href: '/security/data-handling',
    prefixes: ['/security', '/sdks'],
    exact: false,
  },
  {
    label: 'FAQ',
    href: '/faq',
    prefixes: ['/faq'],
    exact: false,
  },
] as const;

function matchesItem(
  pathname: string,
  prefixes: readonly string[],
  exact: boolean,
): boolean {
  return prefixes.some((prefix) => {
    if (exact) return pathname === prefix || pathname === prefix + '/';
    return pathname === prefix || pathname.startsWith(prefix + '/');
  });
}

const HIDDEN_PATHS = ['/', '/api'];

export default function SubNav(): React.ReactElement | null {
  const { pathname } = useLocation();

  if (HIDDEN_PATHS.some((p) => pathname === p || pathname === p + '/')) {
    return null;
  }

  return (
    <nav className={styles.subNav} aria-label="Section navigation">
      <div className={styles.inner}>
        {NAV_ITEMS.map(({ label, href, prefixes, exact }) => {
          const active = matchesItem(pathname, prefixes, exact);
          return (
            <Link
              key={href}
              to={href}
              className={`${styles.item}${active ? ` ${styles.active}` : ''}`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
