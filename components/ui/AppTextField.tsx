import React, { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { controlHeight, fontSize, radius, spacing } from '@/constants/sizing';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type AppTextFieldProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  /** Overrides theme placeholder color when set. */
  placeholderTextColor?: string;
};

export const AppTextField = forwardRef<TextInput, AppTextFieldProps>(function AppTextField(
  { label, error, containerStyle, inputStyle, placeholderTextColor, editable = true, multiline, ...rest },
  ref
) {
  const theme = useColorScheme();
  const c = Colors[theme];
  const ph = placeholderTextColor ?? c.textSecondary;
  const showError = Boolean(error);

  return (
    <View style={containerStyle}>
      {label ? (
        <Text style={[styles.label, { color: c.textSecondary }]} accessibilityRole="text">
          {label}
        </Text>
      ) : null}
      <TextInput
        ref={ref}
        editable={editable}
        multiline={multiline}
        placeholderTextColor={ph}
        style={[
          styles.inputBase,
          multiline ? styles.inputMultiline : styles.inputSingle,
          {
            backgroundColor: c.surface,
            color: c.text,
            borderColor: showError ? c.error : c.border,
          },
          !editable && styles.inputDisabled,
          inputStyle,
        ]}
        {...rest}
      />
      {showError ? (
        <Text style={[styles.error, { color: c.error }]} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.caption,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  inputBase: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.body,
    borderWidth: 1,
  },
  inputSingle: {
    height: controlHeight.lg,
  },
  inputMultiline: {
    minHeight: controlHeight.lg * 2,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    opacity: 0.55,
  },
  error: {
    fontSize: fontSize.caption,
    marginTop: spacing.xs,
  },
});
