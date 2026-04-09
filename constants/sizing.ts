/**
 * Responsive layout tokens (react-native-size-matters).
 * - `s` / spacing: width-based scale — padding, horizontal gaps, radii.
 * - `v`: height-based — use for vertical-only rhythm when needed.
 * - `m`: moderate scale — fonts & icons (less jumpy on large phones / small tablets).
 */
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export { moderateScale, scale, verticalScale } from 'react-native-size-matters';

/** Width-relative scale (default guideline width ~350 logical px). */
export const s = (n: number) => scale(n);

/** Height-relative scale. */
export const v = (n: number) => verticalScale(n);

/**
 * Moderate scale for typography & icon boxes.
 * @param factor 0 = almost no scale, 0.5 = default lib behavior; we use ~0.35 for apps.
 */
export const m = (n: number, factor = 0.35) => moderateScale(n, factor);

/** Standard margins & padding (horizontal bias). */
export const spacing = {
  none: 0,
  xxs: s(2),
  xs: s(4),
  sm: s(8),
  md: s(12),
  lg: s(16),
  xl: s(20),
  xxl: s(24),
  xxxl: s(32),
  huge: s(40),
  massive: s(48),
} as const;

/** Common screen / card inset presets. */
export const inset = {
  screen: s(24),
  screenLoose: s(28),
  card: s(16),
  cardTight: s(12),
  listRow: s(14),
  sectionGap: v(20),
} as const;

/** Typography scale. */
export const fontSize = {
  micro: m(10),
  /** Tab bar labels (compact). */
  tabBar: m(11),
  caption: m(12),
  bodySmall: m(14),
  body: m(16),
  bodyLarge: m(17),
  callout: m(18),
  title3: m(20),
  title2: m(24),
  title1: m(28),
  largeTitle: m(32),
  hero: m(40),
  display: m(48),
} as const;

export const lineHeight = {
  micro: Math.round(fontSize.micro * 1.35),
  caption: Math.round(fontSize.caption * 1.35),
  body: Math.round(fontSize.body * 1.4),
  bodySmall: Math.round(fontSize.bodySmall * 1.4),
  title: Math.round(fontSize.title1 * 1.15),
  tight: Math.round(fontSize.largeTitle * 1.05),
} as const;

/** Corner radii. */
export const radius = {
  xs: s(6),
  sm: s(8),
  md: s(12),
  lg: s(14),
  xl: s(16),
  xxl: s(20),
  round: s(999),
} as const;

/** Touch targets & icons. */
export const iconSize = {
  xs: m(14),
  /** Inline / list row icons. */
  smMd: m(16),
  sm: m(18),
  md: m(22),
  lg: m(26),
  xl: m(32),
  xxl: m(40),
} as const;

export const minTouchTarget = s(44);

/** Expand invisible touch area. */
export const hitSlop = {
  sm: { top: s(8), bottom: s(8), left: s(8), right: s(8) },
  md: { top: s(12), bottom: s(12), left: s(12), right: s(12) },
} as const;

/** Typical one-line input / button height. */
export const controlHeight = {
  sm: s(48),
  md: s(54),
  lg: s(56),
} as const;

/** Multi-step setup / onboarding copy blocks (shared across SetupSteps). */
export const stepLayout = {
  containerPaddingTop: v(20),
  title: fontSize.title1,
  subtitle: fontSize.body,
  subtitleMarginBottom: v(40),
  subtitlePaddingH: inset.screen,
  cardRadius: radius.xxl,
  cardPadding: spacing.lg,
  cardGap: spacing.lg,
} as const;
