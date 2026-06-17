import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './SubNav.module.css';

// ── Inline line-icons. Stroke inherits currentColor, so each icon tints teal
// on hover/active right alongside its label. ────────────────────────────────
type IconName =
  | 'home' | 'rocket' | 'book' | 'gauge' | 'server' | 'gear' | 'shield' | 'faq';

const ICON_PATHS: Record<IconName, string> = {
  home: 'M3 11l9-8 9 8 M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10',
  rocket: 'M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2 M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z M15 9h.01',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19V5',
  gauge: 'M12 14l4-4 M3.5 18a9 9 0 1 1 17 0z',
  server: 'M3 4h18v7H3z M3 13h18v7H3z M7 7.5h.01 M7 16.5h.01',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z M19.4 15a1.6 1.6 0 0 0 .3 1.8 M4.6 9a1.6 1.6 0 0 0-.3-1.8',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4',
  faq: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3 M12 17h.01',
};

function Icon({ name }: { name: IconName }): React.ReactElement {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

const NAV_ITEMS = [
  {label: 'Overview', icon: 'home', href: '/intro', prefixes: ['/intro'], exact: true},
  {label: 'Getting Started', icon: 'rocket', href: '/getting-started/overview', prefixes: ['/getting-started'], exact: false},
  {label: 'Guides', icon: 'book', href: '/guides/providers', prefixes: ['/guides'], exact: false},
  {label: 'Benchmarks', icon: 'gauge', href: '/benchmarks', prefixes: ['/benchmarks'], exact: true},
  {label: 'Ferro Labs Managed', icon: 'server', href: '/ferrocloud/overview', prefixes: ['/ferrocloud'], exact: false},
  {label: 'Operations', icon: 'gear', href: '/operations/monitoring', prefixes: ['/operations'], exact: false},
  {label: 'Security', icon: 'shield', href: '/security/data-handling', prefixes: ['/security', '/sdks'], exact: false},
  {label: 'FAQ', icon: 'faq', href: '/faq', prefixes: ['/faq'], exact: false},
] as const satisfies readonly {
  label: string;
  icon: IconName;
  href: string;
  prefixes: readonly string[];
  exact: boolean;
}[];

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
        {NAV_ITEMS.map(({ label, icon, href, prefixes, exact }) => {
          const active = matchesItem(pathname, prefixes, exact);
          return (
            <Link
              key={href}
              to={href}
              className={`${styles.item}${active ? ` ${styles.active}` : ''}`}
            >
              <Icon name={icon} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
