import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  fontSize,
  iconSize,
  minTouchTarget,
  spacing,
} from "@/constants/sizing";
import { Colors, type ThemeName } from "@/constants/theme";

type ThemeColors = (typeof Colors)[ThemeName];

type HomeHeaderProps = {
  name: string;
  colors: ThemeColors;
  onNotificationsPress?: () => void;
};

export function HomeHeader({
  name,
  colors: c,
  onNotificationsPress,
}: HomeHeaderProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <View style={[styles.avatar, { backgroundColor: c.primary }]}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={[styles.greeting, { color: c.textSecondary }]}>
            Good day 👋
          </Text>
          <Text style={[styles.name, { color: c.text }]}>Hey, {name}!</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.notifButton,
          pressed && { opacity: 0.65 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        hitSlop={spacing.sm}
        onPress={onNotificationsPress}
      >
        <Ionicons
          name="notifications-outline"
          size={iconSize.lg}
          color={c.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minWidth: 0,
  },
  textBlock: { flexShrink: 1 },
  greeting: { fontSize: fontSize.bodySmall },
  name: {
    fontSize: fontSize.title2,
    fontWeight: "bold",
    marginTop: spacing.xxs,
  },
  notifButton: {
    width: minTouchTarget,
    height: minTouchTarget,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: minTouchTarget,
    height: minTouchTarget,
    borderRadius: minTouchTarget / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: fontSize.callout,
    fontWeight: "bold",
  },
});
