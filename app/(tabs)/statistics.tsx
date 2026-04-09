import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenGradient } from '@/components/ScreenGradient';
import { fontSize, iconSize, radius, spacing, v } from '@/constants/sizing';
import { Colors } from '@/constants/theme';
import { useFloatingTabBarInset } from '@/hooks/use-floating-tab-bar-inset';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppSelector } from '../../store/hooks';

export default function StatisticsScreen() {
  const theme = useColorScheme();
  const c = Colors[theme];
  const profile = useAppSelector((state) => state.profile);
  const plan = profile.aiPlan;
  const bottomInset = useFloatingTabBarInset();

  const highlights = [
    { label: 'Daily calories', value: plan?.dailyCalories ?? '—', unit: 'kcal', icon: 'flame-outline' as const },
    { label: 'Protein', value: plan?.proteinGrams ?? '—', unit: 'g', icon: 'barbell-outline' as const },
    { label: 'Carbs', value: plan?.carbsGrams ?? '—', unit: 'g', icon: 'leaf-outline' as const },
    { label: 'Fats', value: plan?.fatsGrams ?? '—', unit: 'g', icon: 'water-outline' as const },
  ];

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: bottomInset }]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: c.text }]}>Statistics</Text>
          <Text style={[styles.subtitle, { color: c.textSecondary }]}>
            Plan targets and trends will appear here as you log meals.
          </Text>

          <View style={[styles.placeholderCard, { backgroundColor: c.card }]}>
            <Ionicons name="trending-up-outline" size={iconSize.lg} color={c.primary} />
            <Text style={[styles.placeholderTitle, { color: c.text }]}>Weekly overview</Text>
            <Text style={[styles.placeholderBody, { color: c.textSecondary }]}>
              Charts for calories and macros are coming soon.
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: c.text }]}>Plan snapshot</Text>
          <View style={styles.grid}>
            {highlights.map((row) => (
              <View key={row.label} style={[styles.miniCard, { backgroundColor: c.card }]}>
                <Ionicons name={row.icon} size={iconSize.md} color={c.primary} />
                <Text style={[styles.miniValue, { color: c.text }]}>
                  {row.value}
                  <Text style={[styles.miniUnit, { color: c.textSecondary }]}> {row.unit}</Text>
                </Text>
                <Text style={[styles.miniLabel, { color: c.textSecondary }]}>{row.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    padding: spacing.xl,
  },
  title: {
    fontSize: fontSize.title1,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.body,
    marginBottom: spacing.xxl,
  },
  placeholderCard: {
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  placeholderTitle: {
    fontSize: fontSize.callout,
    fontWeight: '700',
  },
  placeholderBody: {
    fontSize: fontSize.bodySmall,
    textAlign: 'center',
    lineHeight: v(20),
  },
  sectionTitle: {
    fontSize: fontSize.callout,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  miniCard: {
    width: '47%',
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  miniValue: {
    fontSize: fontSize.title3,
    fontWeight: 'bold',
  },
  miniUnit: {
    fontSize: fontSize.bodySmall,
    fontWeight: '400',
  },
  miniLabel: {
    fontSize: fontSize.caption,
  },
});
