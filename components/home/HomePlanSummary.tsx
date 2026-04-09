import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  fontSize,
  iconSize,
  lineHeight,
  spacing,
} from "@/constants/sizing";
import { Colors, type ThemeName } from "@/constants/theme";

const TEXT_MAX_HEIGHT = 480;
const TIMING_MS = 320;

type ThemeColors = (typeof Colors)[ThemeName];

type HomePlanSummaryProps = {
  text: string;
  colors: ThemeColors;
};

export function HomePlanSummary({ text, colors: c }: HomePlanSummaryProps) {
  const [expanded, setExpanded] = useState(false);
  const progress = useSharedValue(0);

  const toggle = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      progress.value = withTiming(next ? 1 : 0, {
        duration: TIMING_MS,
        easing: Easing.out(Easing.cubic),
      });
      return next;
    });
  }, [progress]);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.2, 1], [0, 0.85, 1]),
    maxHeight: interpolate(progress.value, [0, 1], [0, TEXT_MAX_HEIGHT]),
  }));

  const iconRotateStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [0, 12])}deg` },
    ],
  }));

  return (
    <View style={styles.root}>
      <Pressable
        onPress={toggle}
        style={({ pressed }) => [
          styles.iconHit,
          pressed && styles.iconHitPressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={
          expanded ? "Hide AI plan summary" : "Show AI plan summary"
        }
        hitSlop={spacing.sm}
      >
        <Animated.View style={iconRotateStyle}>
          <Ionicons
            name="sparkles"
            size={iconSize.lg}
            color={c.primary}
          />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[styles.textShell, contentStyle]}
        pointerEvents={expanded ? "auto" : "none"}
      >
        <Text style={[styles.summaryText, { color: c.text }]}>{text}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: spacing.xxl,
    alignItems: "flex-end",
  },
  iconHit: {
    padding: spacing.xs,
    marginBottom: spacing.sm,
  },
  iconHitPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  textShell: {
    alignSelf: "stretch",
    width: "100%",
    overflow: "hidden",
  },
  summaryText: {
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeight.bodySmall,
  },
});
