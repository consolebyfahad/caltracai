import {
  Feather,
  Ionicons,
  Octicons,
} from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { m, s, spacing, v } from '@/constants/sizing';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const MAIN_TAB_NAMES = ['index', 'statistics', 'profile'] as const;
type MainTabName = (typeof MAIN_TAB_NAMES)[number];

/** Accessibility only (icons only in UI). */
const TAB_A11Y: Record<MainTabName, string> = {
  index: 'Home',
  statistics: 'Statistics',
  profile: 'Profile',
};

/** Selected tab “bubble”: icon scales up. */
const TAB_SCALE_FOCUSED = 1.16;
const TAB_SCALE_IDLE = 1;

const BASE_ICON_SIZE = m(22);

function TabIcon({
  routeName,
  focused,
  color,
}: {
  routeName: MainTabName;
  focused: boolean;
  color: string;
}) {
  const size = BASE_ICON_SIZE;
  switch (routeName) {
    case 'index':
      return <Octicons name="home" size={size} color={color} />;
    case 'statistics':
      return (
        <Ionicons
          name={focused ? 'stats-chart' : 'stats-chart-outline'}
          size={size}
          color={color}
        />
      );
    case 'profile':
      return <Feather name="user" size={size} color={color} />;
    default:
      return null;
  }
}

function tabShadow(elevation: number, light: boolean): ViewStyle {
  return {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: v(4) },
    shadowOpacity: light ? 0.1 : 0.18,
    shadowRadius: s(10),
    elevation,
  };
}

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useColorScheme();
  const c = Colors[theme];
  const insets = useSafeAreaInsets();

  const activeName = state.routes[state.index]?.name;
  const isMainTab = MAIN_TAB_NAMES.includes(activeName as MainTabName);

  const isLight = theme === 'light';
  const capsuleBg = c.tabBar;
  const inactiveOnCapsule = c.tabIconDefault;
  const activeOnCapsule = c.tabIconSelected;

  const bottomPad = Math.max(insets.bottom, v(10)) + v(8);

  const mainRoutes = MAIN_TAB_NAMES.map((name) =>
    state.routes.find((r) => r.name === name)
  ).filter(Boolean) as NonNullable<(typeof state.routes)[number]>[];

  return (
    <View style={[styles.wrap, { paddingBottom: bottomPad }]} pointerEvents="box-none">
      <View style={styles.row} pointerEvents="box-none">
        <View
          style={[
            styles.capsule,
            {
              backgroundColor: capsuleBg,
              borderWidth: StyleSheet.hairlineWidth * 2,
              borderColor: c.tabBarBorder,
            },
            tabShadow(12, isLight),
          ]}
        >
          {mainRoutes.map((route) => {
            const isFocused = isMainTab && activeName === route.name;
            const { options } = descriptors[route.key];
            const a11y =
              options.tabBarAccessibilityLabel ??
              TAB_A11Y[route.name as MainTabName];

            const color = isFocused ? activeOnCapsule : inactiveOnCapsule;
            const scale = isFocused ? TAB_SCALE_FOCUSED : TAB_SCALE_IDLE;

            return (
              <Pressable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={{ selected: isFocused }}
                accessibilityLabel={a11y}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                  }
                }}
                style={({ pressed }) => [
                  styles.tabItem,
                  pressed && styles.tabPressed,
                ]}
              >
                <View
                  style={[
                    styles.tabBubble,
                    {
                      transform: [{ scale }],
                    },
                  ]}
                >
                  <TabIcon
                    routeName={route.name as MainTabName}
                    focused={isFocused}
                    color={color}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add meal or log"
          onPress={() => navigation.navigate('add')}
          style={({ pressed }) => [
            styles.fab,
            { backgroundColor: c.primary },
            tabShadow(14, isLight),
            pressed && styles.fabPressed,
          ]}
        >
          <Octicons name="plus" size={m(30)} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(12),
    paddingHorizontal: s(20),
    maxWidth: '100%',
    overflow: 'visible',
  },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexGrow: 1,
    flexShrink: 1,
    minHeight: v(48),
    paddingVertical: v(10),
    paddingHorizontal: s(6),
    borderRadius: m(999),
    maxWidth: s(320),
    overflow: 'visible',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    minWidth: s(56),
    overflow: 'visible',
  },
  tabBubble: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabPressed: {
    opacity: 0.85,
  },
  fab: {
    width: m(56),
    height: m(56),
    borderRadius: m(28),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  fabPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.97 }],
  },
});
