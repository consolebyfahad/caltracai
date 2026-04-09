import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { fontSize, iconSize, s, spacing } from "@/constants/sizing";
import { Colors, type ThemeName } from "@/constants/theme";

type ThemeColors = (typeof Colors)[ThemeName];

function goalLabel(goal: string): string {
  if (goal === "lose") return "Lose Weight";
  if (goal === "gain") return "Gain Muscle";
  return "Maintain Weight";
}

type HomeGoalChipProps = {
  goal?: string;
  colors: ThemeColors;
};

export function HomeGoalChip({ goal, colors: c }: HomeGoalChipProps) {
  if (!goal) return null;

  return (
    <View style={[styles.chip, { backgroundColor: c.surface }]}>
      <Ionicons name="trophy-outline" size={iconSize.xs} color={c.primary} />
      <Text style={[styles.text, { color: c.textSecondary }]}>
        Goal:{" "}
        <Text style={{ color: c.primary, fontWeight: "600" }}>
          {goalLabel(goal)}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + spacing.xxs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: s(20),
    alignSelf: "flex-start",
    marginBottom: spacing.lg,
  },
  text: { fontSize: fontSize.caption },
});
