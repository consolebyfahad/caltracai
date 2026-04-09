import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  fontSize,
  iconSize,
  radius,
  s,
  spacing,
} from "@/constants/sizing";
import { Colors, type ThemeName } from "@/constants/theme";

const BAR_HEIGHT = s(14);
const BAR_RADIUS = BAR_HEIGHT / 2;
const ACCENT = "#FF6B35";
const ACCENT_END = "#FF8A4C";

type ThemeColors = (typeof Colors)[ThemeName];

type HomeCaloriesSectionProps = {
  goalKcal: number;
  /** Wire from food log / daily intake when available. */
  consumedKcal?: number;
  theme: ThemeName;
  colors: ThemeColors;
};

function formatKcal(n: number): string {
  return `${Math.round(n).toLocaleString()} kcal`;
}

export function HomeCaloriesSection({
  goalKcal,
  consumedKcal = 0,
  theme,
  colors: c,
}: HomeCaloriesSectionProps) {
  const { consumed, goal, remaining, fillRatio } = useMemo(() => {
    const g = Math.max(0, goalKcal);
    const rawConsumed = Math.max(0, consumedKcal);
    const remainingVal = Math.max(0, g - rawConsumed);
    const ratio = g > 0 ? Math.min(1, rawConsumed / g) : 0;
    return {
      consumed: rawConsumed,
      goal: g,
      remaining: remainingVal,
      fillRatio: ratio,
    };
  }, [goalKcal, consumedKcal]);

  if (goal <= 0) return null;

  const fillWidthPct = `${fillRatio * 100}%`;
  const trackBg =
    theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(27, 94, 58, 0.12)";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: c.card,
          shadowColor: theme === "dark" ? "transparent" : "#000",
        },
      ]}
    >
      <View style={styles.titleRow}>
        <Text style={[styles.sectionTitle, { color: c.text }]}>Calories</Text>
        <Ionicons name="flame" size={iconSize.md} color={ACCENT} />
      </View>

      <View style={[styles.track, { backgroundColor: trackBg }]}>
        {fillRatio > 0 ? (
          <LinearGradient
            colors={[ACCENT_END, ACCENT]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.fill, { width: fillWidthPct }]}
          />
        ) : null}
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBlock, styles.statLeft]}>
          <Text style={[styles.statLabel, { color: c.textSecondary }]}>
            Consumed
          </Text>
          <Text style={[styles.statValue, { color: c.text }]}>
            {formatKcal(consumed)}
          </Text>
        </View>
        <View style={[styles.statBlock, styles.statCenter]}>
          <Text style={[styles.statLabel, { color: c.textSecondary }]}>
            Remaining
          </Text>
          <Text style={[styles.statValue, { color: c.text }]}>
            {formatKcal(remaining)}
          </Text>
        </View>
        <View style={[styles.statBlock, styles.statRight]}>
          <Text style={[styles.statLabel, { color: c.textSecondary }]}>
            Goal
          </Text>
          <Text style={[styles.statValue, { color: c.text }]}>
            {formatKcal(goal)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.08,
    shadowRadius: s(12),
    elevation: 3,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.callout,
    fontWeight: "700",
  },
  track: {
    height: BAR_HEIGHT,
    borderRadius: BAR_RADIUS,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  fill: {
    height: "100%",
    borderRadius: BAR_RADIUS,
    minWidth: BAR_HEIGHT,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  statBlock: {
    flex: 1,
  },
  statLeft: { alignItems: "flex-start" },
  statCenter: { alignItems: "center" },
  statRight: { alignItems: "flex-end" },
  statLabel: {
    fontSize: fontSize.caption,
    marginBottom: spacing.xxs,
  },
  statValue: {
    fontSize: fontSize.bodySmall,
    fontWeight: "700",
  },
});
