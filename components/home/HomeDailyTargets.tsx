import { Ionicons } from "@expo/vector-icons";
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
import type { AiPlan } from "@/types/ai";

import { getHomeStatItems } from "./getHomeStatItems";

type ThemeColors = (typeof Colors)[ThemeName];

type HomeDailyTargetsProps = {
  plan?: AiPlan;
  theme: ThemeName;
  colors: ThemeColors;
};

export function HomeDailyTargets({
  plan,
  theme,
  colors: c,
}: HomeDailyTargetsProps) {
  const stats = useMemo(
    () => getHomeStatItems(plan, c.accentTeal),
    [plan, c.accentTeal]
  );

  return (
    <>
      <Text style={[styles.sectionTitle, { color: c.text }]}>
        Daily Targets
      </Text>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              styles.card,
              {
                backgroundColor: c.card,
                shadowColor: theme === "dark" ? "transparent" : "#000",
              },
            ]}
          >
            <View
              style={[
                styles.iconBubble,
                { backgroundColor: stat.color + "18" },
              ]}
            >
              <Ionicons
                name={stat.icon}
                size={iconSize.md}
                color={stat.color}
              />
            </View>
            <Text style={[styles.cardValue, { color: c.text }]}>
              {stat.value}
              <Text style={[styles.cardUnit, { color: c.textSecondary }]}>
                {" "}
                {stat.unit}
              </Text>
            </Text>
            <Text style={[styles.cardLabel, { color: c.textSecondary }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: fontSize.callout,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  card: {
    width: "47%",
    borderRadius: radius.xl,
    padding: spacing.lg,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.08,
    shadowRadius: s(12),
    elevation: 3,
  },
  iconBubble: {
    width: s(40),
    height: s(40),
    borderRadius: radius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  cardValue: {
    fontSize: fontSize.title2,
    fontWeight: "bold",
    marginBottom: spacing.xxs,
  },
  cardUnit: { fontSize: fontSize.bodySmall, fontWeight: "400" },
  cardLabel: { fontSize: fontSize.caption },
});
