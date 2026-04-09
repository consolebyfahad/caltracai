import { Platform } from "react-native";

/**
 * Gym / fitness palette: forest greens in dark mode, fresh mint–sage in light mode.
 * Screen gradients flow top → bottom like a vertical energy bar (deep → airy).
 */
export const Gradients = {
  light: {
    /** Soft sage → mint → pale gym-floor white */
    screen: ["#C8E6C9", "#A5D6A7", "#E8F5E9", "#F7FCF8"] as const,
    /** Onboarding: energizing greens */
    onboarding: [
      ["#B2DFDB", "#81C784", "#66BB6A"] as const,
      ["#81C784", "#4CAF50", "#43A047"] as const,
      ["#43A047", "#A5D6A7", "#E8F5E9"] as const,
    ],
  },
  dark: {
    /** Deep forest → pine → near-black (training floor at night) */
    screen: ["#0D2818", "#1B4332", "#0F1F17", "#050A08"] as const,
    onboarding: [
      ["#1B4332", "#14532D", "#0F2919"] as const,
      ["#166534", "#14532D", "#052E16"] as const,
      ["#15803D", "#166534", "#0A1F14"] as const,
    ],
  },
} as const;

export type ThemeName = "light" | "dark";

export const screenGradientColors: Record<ThemeName, readonly string[]> = {
  light: Gradients.light.screen,
  dark: Gradients.dark.screen,
};

export const Colors = {
  light: {
    primary: "#1B5E3A",
    primaryMuted: "rgba(27, 94, 58, 0.16)",
    accentTeal: "#2E7D32",
    accentTealMuted: "rgba(46, 125, 50, 0.18)",
    background: "#E8F5E9",
    surface: "rgba(255, 255, 255, 0.82)",
    card: "rgba(255, 255, 255, 0.92)",
    text: "#1A2E22",
    textSecondary: "#4A6354",
    border: "rgba(27, 94, 58, 0.2)",
    icon: "#5D7A66",
    iconActive: "#FFFFFF",
    error: "#C62828",
    tabIconDefault: "#6B8F78",
    tabIconSelected: "#1B5E3A",
    tint: "#1B5E3A",
    tabBar: "rgba(255, 255, 255, 0.92)",
    tabBarBorder: "rgba(27, 94, 58, 0.14)",
    toastBackground: "rgba(248, 253, 248, 0.96)",
  },
  dark: {
    primary: "#4ADE80",
    primaryMuted: "rgba(74, 222, 128, 0.2)",
    accentTeal: "#86EFAC",
    accentTealMuted: "rgba(134, 239, 172, 0.18)",
    background: "#050A08",
    surface: "rgba(20, 55, 35, 0.55)",
    card: "rgba(15, 45, 28, 0.78)",
    text: "#E8F5E9",
    textSecondary: "rgba(200, 230, 201, 0.7)",
    border: "rgba(74, 222, 128, 0.25)",
    icon: "rgba(200, 230, 201, 0.55)",
    iconActive: "#FFFFFF",
    error: "#FCA5A5",
    tabIconDefault: "rgba(167, 201, 171, 0.45)",
    tabIconSelected: "#4ADE80",
    tint: "#4ADE80",
    tabBar: "rgba(5, 12, 8, 0.94)",
    tabBarBorder: "rgba(74, 222, 128, 0.15)",
    toastBackground: "rgba(12, 28, 18, 0.96)",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
