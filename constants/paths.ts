/**
 * Single source of truth for Expo Router hrefs used in navigation and auth gating.
 * Prefer these over string literals so renames stay consistent.
 */
export const routes = {
  root: '/',
  /** Same screen as root in this app (auth landing). */
  index: '/index',
  onboarding: '/onboarding',
  setup: '/setup',
  generating: '/generating',
  tabs: '/(tabs)',
  tabsStatistics: '/(tabs)/statistics',
  tabsProfile: '/(tabs)/profile',
  tabsAdd: '/(tabs)/add',
  /** Often normalized from the tab stack; include both for guards. */
  profile: '/profile',
  statistics: '/statistics',
  add: '/add',
  modal: '/modal',
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];

/** Paths where Firebase session is not required (match `usePathname()` values). */
export const UNAUTHENTICATED_PATHS: readonly string[] = [
  routes.root,
  routes.index,
  '',
  routes.onboarding,
] as const;

export function isUnauthenticatedPath(pathname: string): boolean {
  return UNAUTHENTICATED_PATHS.includes(pathname);
}

/** Logged-in user should leave these for the main app shell. */
export const POST_AUTH_GATE_PATHS: readonly string[] = [
  routes.root,
  routes.index,
  '',
  routes.setup,
  routes.generating,
] as const;

export function isPostAuthGatePath(pathname: string): boolean {
  return POST_AUTH_GATE_PATHS.includes(pathname);
}
