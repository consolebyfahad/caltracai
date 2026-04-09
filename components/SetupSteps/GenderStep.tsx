import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';
import { fontSize, m, s, spacing, stepLayout } from '@/constants/sizing';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface GenderStepProps {
  value?: string;
  onChange: (value: string) => void;
}

export default function GenderStep({ value, onChange }: GenderStepProps) {
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  const options = [
    { label: 'Male', val: 'Male', icon: 'male-outline' as const },
    { label: 'Female', val: 'Female', icon: 'female-outline' as const },
    { label: 'Other', val: 'Other', icon: 'person-outline' as const },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.text }]}>What&apos;s your gender?</Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>Let us know you better so we can tailor your experience.</Text>
      
      <View style={styles.optionsContainer}>
        {options.map((opt) => {
          const isSelected = value === opt.val;
          return (
            <TouchableOpacity
              key={opt.val}
              style={[
                styles.bubble, 
                { backgroundColor: themeColors.surface },
                isSelected && { backgroundColor: themeColors.primary }
              ]}
              onPress={() => onChange(opt.val)}
            >
              <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
                <Ionicons
                  name={opt.icon}
                  size={m(40)}
                  color={isSelected ? '#fff' : themeColors.icon}
                />
              </View>
              <Text style={[
                styles.label, 
                { color: themeColors.textSecondary },
                isSelected && { color: '#fff' }
              ]}>
                {opt.label}
              </Text>
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
  },
  subtitle: {
    fontSize: stepLayout.subtitle,
    textAlign: 'center',
    marginBottom: stepLayout.subtitleMarginBottom,
    paddingHorizontal: stepLayout.subtitlePaddingH,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xl,
    justifyContent: 'center',
  },
  bubble: {
    width: s(140),
    height: s(140),
    borderRadius: s(70),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: s(2) },
    shadowOpacity: 0.05,
    shadowRadius: s(8),
    elevation: 2,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  iconContainerSelected: {
    // Optional tweak depending on icon
  },
  label: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
});
