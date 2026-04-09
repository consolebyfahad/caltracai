import React, { useMemo, useRef } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import {
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";

import { fontSize, m, spacing, v } from "@/constants/sizing";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type WeekDateStripProps = {
  onDateChange?: (date: Date) => void;
};

function formatYmdLocal(d: Date): string {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${mo}-${day}`;
}

function parseYmdLocal(ymd: string): Date {
  const [y, mo, d] = ymd.split("-").map((n) => Number.parseInt(n, 10));
  return new Date(y, mo - 1, d);
}

/**
 * Horizontal week strip via **react-native-calendars** (`WeekCalendar` + `CalendarProvider`).
 * Uses the library’s built-in paging / RecyclerList instead of a custom FlatList.
 */
export function WeekDateStrip({ onDateChange }: WeekDateStripProps) {
  const themeName = useColorScheme();
  const c = Colors[themeName];
  const { width } = useWindowDimensions();
  const onDateChangeRef = useRef(onDateChange);
  onDateChangeRef.current = onDateChange;

  const initialDate = useMemo(() => formatYmdLocal(new Date()), []);

  const calendarTheme = useMemo(
    () => ({
      backgroundColor: "transparent",
      calendarBackground: "transparent",
      dayTextColor: c.text,
      textSectionTitleColor: c.textSecondary,
      textDayHeaderFontSize: m(12),
      textDayHeaderFontWeight: "600" as const,
      textDayFontSize: m(17),
      textDayFontWeight: "700" as const,
      todayTextColor: c.primary,
      selectedDayBackgroundColor: c.primary,
      selectedDayTextColor: "#ffffff",
    }),
    [c.primary, c.text, c.textSecondary]
  );

  return (
    <View style={styles.outer}>
      <Text style={[styles.sectionLabel, { color: c.textSecondary }]}>
        This week
      </Text>

      <CalendarProvider
        date={initialDate}
        theme={calendarTheme}
        onDateChanged={(dateStr) => {
          onDateChangeRef.current?.(parseYmdLocal(dateStr));
        }}
      >
        <WeekCalendar
          firstDay={0}
          allowShadow={false}
          calendarWidth={width}
          calendarHeight={v(72)}
          theme={calendarTheme}
        />
      </CalendarProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: fontSize.caption,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
});
