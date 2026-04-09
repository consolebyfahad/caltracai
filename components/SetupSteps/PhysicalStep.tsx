import React from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../../constants/theme';
import { fontSize, m, s, spacing, stepLayout } from '@/constants/sizing';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface PhysicalStepProps {
  weightKG: string;
  setWeightKG: (val: string) => void;
  heightFeet: string;
  setHeightFeet: (val: string) => void;
}

export default function PhysicalStep({ weightKG, setWeightKG, heightFeet, setHeightFeet }: PhysicalStepProps) {
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>Your Physical Profile</Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Help us calculate your basal metabolic rate and precise goals.</Text>

      <View style={styles.cardsContainer}>
        <View style={[styles.card, { backgroundColor: themeColors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <Text style={[styles.cardTitle, { color: themeColors.textSecondary }]}>Weight</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.largeInput, 
                { color: themeColors.primary, borderBottomColor: themeColors.border }
              ]}
              keyboardType="decimal-pad"
              value={weightKG}
              onChangeText={setWeightKG}
              placeholder="00"
              placeholderTextColor={themeColors.textSecondary}
              maxLength={5}
            />
            <Text style={[styles.unitText, { color: themeColors.textSecondary }]}>KG</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: themeColors.card, shadowColor: theme === 'dark' ? 'transparent' : '#000' }]}>
          <Text style={[styles.cardTitle, { color: themeColors.textSecondary }]}>Height</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.largeInput, 
                { color: themeColors.primary, borderBottomColor: themeColors.border }
              ]}
              keyboardType="decimal-pad"
              value={heightFeet}
              onChangeText={setHeightFeet}
              placeholder="0.0"
              placeholderTextColor={themeColors.textSecondary}
              maxLength={5}
            />
            <Text style={[styles.unitText, { color: themeColors.textSecondary }]}>FT</Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: stepLayout.containerPaddingTop,
    alignItems: 'center',
  },
  title: {
    fontSize: stepLayout.title,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: stepLayout.subtitle,
    textAlign: 'center',
    marginBottom: stepLayout.subtitleMarginBottom,
    paddingHorizontal: stepLayout.subtitlePaddingH,
  },
  cardsContainer: {
    width: '100%',
    paddingHorizontal: stepLayout.subtitlePaddingH,
    gap: spacing.xxl,
  },
  card: {
    borderRadius: s(24),
    padding: spacing.xxl,
    shadowOffset: { width: 0, height: s(8) },
    shadowOpacity: 0.08,
    shadowRadius: s(16),
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: fontSize.callout,
    fontWeight: '600',
    marginBottom: spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  largeInput: {
    fontSize: m(56),
    fontWeight: 'bold',
    minWidth: s(90),
    textAlign: 'center',
    borderBottomWidth: s(2),
    paddingBottom: spacing.xxs,
  },
  unitText: {
    fontSize: fontSize.title2,
    fontWeight: '600',
    marginLeft: spacing.sm,
    marginBottom: spacing.md,
  },
});
