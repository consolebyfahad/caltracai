/**
 * Kode Mono — load via `useFonts` in root layout; use these keys as `fontFamily` on Text.
 */
export const kodeMono = {
  regular: "KodeMono-Regular",
  medium: "KodeMono-Medium",
  semiBold: "KodeMono-SemiBold",
  bold: "KodeMono-Bold",
} as const;

export const kodeMonoMap = {
  [kodeMono.regular]: require("../assets/fonts/KodeMono-Regular.ttf"),
  [kodeMono.medium]: require("../assets/fonts/KodeMono-Medium.ttf"),
  [kodeMono.semiBold]: require("../assets/fonts/KodeMono-SemiBold.ttf"),
  [kodeMono.bold]: require("../assets/fonts/KodeMono-Bold.ttf"),
} as const;
