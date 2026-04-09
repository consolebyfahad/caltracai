import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenGradient } from '@/components/ScreenGradient';
import { AppButton } from '@/components/ui/AppButton';
import { fontSize, hitSlop, iconSize, radius, spacing, v } from '@/constants/sizing';
import { Colors } from '@/constants/theme';
import { useFloatingTabBarInset } from '@/hooks/use-floating-tab-bar-inset';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AddScreen() {
  const theme = useColorScheme();
  const c = Colors[theme];
  const router = useRouter();
  const bottomInset = useFloatingTabBarInset();

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={hitSlop.md}
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          >
            <Ionicons name="chevron-back" size={iconSize.lg} color={c.text} />
          </Pressable>
          <Text style={[styles.topTitle, { color: c.text }]}>Add</Text>
          <View style={styles.topBarSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.headline, { color: c.text }]}>Log something</Text>
          <Text style={[styles.body, { color: c.textSecondary }]}>
            Track a meal, snack, or drink. Detailed logging flows can plug in here next.
          </Text>

          <View style={[styles.card, { backgroundColor: c.card }]}>
            <Ionicons name="restaurant-outline" size={iconSize.xl} color={c.primary} />
            <Text style={[styles.cardTitle, { color: c.text }]}>Quick log</Text>
            <Text style={[styles.cardBody, { color: c.textSecondary }]}>
              Use the button below as a placeholder until meal logging is implemented.
            </Text>
            <AppButton
              title="Log meal (soon)"
              onPress={() => {}}
              variant="primary"
              size="default"
              disabled
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    padding: spacing.xs,
    minWidth: v(44),
    minHeight: v(44),
    justifyContent: 'center',
  },
  topBarSpacer: {
    minWidth: v(44),
  },
  topTitle: {
    fontSize: fontSize.callout,
    fontWeight: '700',
  },
  scroll: {
    padding: spacing.xl,
  },
  headline: {
    fontSize: fontSize.title1,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  body: {
    fontSize: fontSize.body,
    marginBottom: spacing.xxl,
    lineHeight: v(22),
  },
  card: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  cardTitle: {
    fontSize: fontSize.callout,
    fontWeight: '700',
  },
  cardBody: {
    fontSize: fontSize.bodySmall,
    textAlign: 'center',
    lineHeight: v(20),
    marginBottom: spacing.sm,
  },
});
