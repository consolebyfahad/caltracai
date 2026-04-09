import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { fontSize, lineHeight, m, s, spacing, stepLayout } from '@/constants/sizing';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface WorkoutStepProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function WorkoutStep({ value, onChange }: WorkoutStepProps) {
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  const options = [
    { label: 'Lightly Active', val: '2-3', desc: '2-3 Days / Week', icon: 'walk-outline' as const },
    { label: 'Moderately Active', val: '3-4', desc: '3-4 Days / Week', icon: 'bicycle-outline' as const },
    { label: 'Highly Active', val: '4-5', desc: '4-5+ Days / Week', icon: 'barbell-outline' as const },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.text }]}>How active are you?</Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Select your weekly workout frequency.</Text>
      
      <View style={styles.cardsContainer}>
        {options.map((opt) => {
          const isSelected = value === opt.val;
          return (
            <TouchableOpacity
              key={opt.val}
              style={[
                styles.card, 
                { backgroundColor: themeColors.card, borderColor: 'transparent', shadowColor: theme === 'dark' ? 'transparent' : '#000' },
                isSelected && { borderColor: themeColors.primary, backgroundColor: theme === 'dark' ? themeColors.primary + '15' : '#f0f8ff' }
              ]}
              onPress={() => onChange(opt.val)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.iconBox, 
                { backgroundColor: themeColors.surface },
                isSelected && { backgroundColor: theme === 'dark' ? themeColors.primary + '30' : '#fff' }
              ]}>
                <Ionicons
                  name={opt.icon}
                  size={m(28)}
                  color={isSelected ? themeColors.primary : themeColors.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[
                  styles.cardTitle, 
                  { color: themeColors.text },
                  isSelected && { color: themeColors.primary }
                ]}>
                  {opt.label}
                </Text>
                <Text style={[
                  styles.cardDesc, 
                  { color: themeColors.textSecondary },
                  isSelected && { color: theme === 'dark' ? themeColors.text : '#444' }
                ]}>
                  {opt.desc}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
    paddingHorizontal: stepLayout.subtitlePaddingH,
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
    gap: stepLayout.cardGap,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: stepLayout.cardRadius,
    padding: stepLayout.cardPadding + spacing.xs,
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.05,
    shadowRadius: s(10),
    elevation: 3,
    borderWidth: s(2),
  },
  iconBox: {
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.callout,
    fontWeight: 'bold',
    marginBottom: spacing.xxs,
  },
  cardDesc: {
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeight.bodySmall,
  },
});
