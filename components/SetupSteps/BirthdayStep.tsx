import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../../constants/theme';
import { fontSize, s, spacing, stepLayout, v } from '@/constants/sizing';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface BirthdayStepProps {
  date: Date;
  onChange: (date: Date) => void;
  onAgeCalculate?: (age: { years: number; months: number; days: number }) => void;
}

export default function BirthdayStep({ date, onChange, onAgeCalculate }: BirthdayStepProps) {
  const theme = useColorScheme();
  const themeColors = Colors[theme];
  const [ageStr, setAgeStr] = useState('');

  useEffect(() => {
    calculateAgeParams(date);
  }, [date.toISOString()]);

  const calculateAgeParams = (birthDate: Date) => {
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years < 0) {
      years = 0;
      months = 0;
      days = 0;
    }

    setAgeStr(`${years} Years, ${months} Months, ${days} Days`);
    if (onAgeCalculate) {
      onAgeCalculate({ years, months, days });
    }
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.text }]}>When is your birthday?</Text>
      <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>We use this to calculate your exact age.</Text>
      
      <View style={[styles.pickerContainer, { backgroundColor: themeColors.surface }]}>
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleChange}
          maximumDate={new Date()}
          textColor={themeColors.text} // Important constraint for Dark Mode!
        />
      </View>

      <View style={[styles.ageContainer, { backgroundColor: themeColors.primary + '15' }]}>
        <Text style={[styles.ageTitle, { color: themeColors.textSecondary }]}>You are exactly</Text>
        <Text style={[styles.ageText, { color: themeColors.primary }]}>{ageStr}</Text>
        <Text style={[styles.ageTitle, { color: themeColors.textSecondary }]}>old!</Text>
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
  pickerContainer: {
    borderRadius: stepLayout.cardRadius,
    padding: s(10),
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: s(4) },
    shadowOpacity: 0.05,
    shadowRadius: s(10),
    elevation: 3,
  },
  ageContainer: {
    marginTop: v(50),
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxxl - spacing.xs,
    borderRadius: stepLayout.cardRadius,
  },
  ageTitle: {
    fontSize: fontSize.body,
  },
  ageText: {
    fontSize: fontSize.title2,
    fontWeight: 'bold',
    marginVertical: spacing.xxs,
  },
});
