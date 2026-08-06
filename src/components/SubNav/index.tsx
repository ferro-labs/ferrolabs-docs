import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './SubNav.module.css';

// ── Inline line-icons. Stroke inherits currentColor, so each icon tints teal
// on hover/active right alongside its label. ────────────────────────────────
type IconName =
  | 'home' | 'rocket' | 'plug' | 'route' | 'puzzle' | 'book' | 'brackets' | 'faq';

const ICON_PATHS: Record<IconName, string> = {
  home: 'M3 11l9-8 9 8 M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10',
  rocket: 'M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2 M14.5 4.5C18 1 22 2 22 2s1 4-2.5 7.5L13 16l-5-5z M15 9h.01',
  plug: 'M12 22v-4 M5 12H3a9 9 0 0 0 18 0h-2 M5 12V7l7-5 7 5v5 M9 7v5 M15 7v5',
  route: 'M6 19a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M18 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z M6 16.5V11a4 4 0 0 1 4-4h5',
  puzzle: 'M9 3a2 2 0 0 1 4 0v1h3a1 1 0 0 1 1 1v3h1a2 2 0 0 1 0 4h-1v3a1 1 0 0 1-1 1h-3v-1a2 2 0 0 0-4 0v1H6a1 1 0 0 1-1-1v-3H4a2 2 0 0 1 0-4h1V5a1 1 0 0 1 1-1h3z',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 19V5',
  brackets: 'M8 3H6a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2 M16 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2',
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
  {label: 'Overview', icon: 'home', href: '/', prefixes: ['/'], exact: true},
  {label: 'Get Started', icon: 'rocket', href: '/getting-started/overview', prefixes: ['/getting-started'], exact: false},
  {label: 'Providers', icon: 'plug', href: '/providers', prefixes: ['/providers'], exact: false},
  {label: 'Routing', icon: 'route', href: '/routing', prefixes: ['/routing'], exact: false},
  {label: 'Plugins', icon: 'puzzle', href: '/plugins', prefixes: ['/plugins'], exact: false},
  {label: 'Guides', icon: 'book', href: '/guides/use-cases', prefixes: ['/guides', '/operations', '/security'], exact: false},
  {label: 'Reference', icon: 'brackets', href: '/api-reference/overview', prefixes: ['/api-reference'], exact: false},
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
