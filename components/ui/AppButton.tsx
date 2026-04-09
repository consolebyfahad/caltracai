import React, { type ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { controlHeight, fontSize, radius, s, spacing } from '@/constants/sizing';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type AppButtonVariant = 'primary' | 'outline' | 'ghost';
export type AppButtonSize = 'compact' | 'default' | 'comfortable' | 'hero';

export type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: AppButtonVariant;
  /** Outline / ghost: use error color for border and label. */
  destructive?: boolean;
  size?: AppButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Primary hero CTA shadow (e.g. setup footer). */
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

const heights: Record<AppButtonSize, number> = {
  compact: controlHeight.sm,
  default: controlHeight.lg,
  comfortable: s(52),
  hero: s(56),
};

const radii: Record<AppButtonSize, number> = {
  compact: radius.md,
  default: radius.md,
  comfortable: radius.lg,
  hero: radius.xl,
};

const titleSizes: Record<AppButtonSize, number> = {
  compact: fontSize.bodySmall,
  default: fontSize.body,
  comfortable: fontSize.body,
  hero: fontSize.callout,
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  destructive = false,
  size = 'default',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  elevated = false,
  style,
  testID,
  accessibilityLabel,
}: AppButtonProps) {
  const theme = useColorScheme();
  const c = Colors[theme];
  const h = heights[size];
  const r = radii[size];
  const fs = titleSizes[size];
  const isDisabled = disabled || loading;

  const bg =
    variant === 'primary'
      ? c.primary
      : variant === 'outline'
        ? c.surface
        : 'transparent';

  const borderW = variant === 'outline' ? 1.5 : 0;
  const borderC =
    variant === 'outline'
      ? destructive
        ? c.error
        : c.border
      : 'transparent';

  const labelColor =
    variant === 'primary'
      ? '#fff'
      : destructive
        ? c.error
        : variant === 'ghost'
          ? c.primary
          : c.text;

  const shadowStyle =
    elevated && variant === 'primary'
      ? {
          shadowColor: c.primary,
          shadowOffset: { width: 0, height: s(4) },
          shadowOpacity: 0.3,
          shadowRadius: s(10),
          elevation: 4,
        }
      : {};

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: isDisabled }}
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        {
          height: h,
          borderRadius: r,
          backgroundColor: bg,
          borderWidth: borderW,
          borderColor: borderC,
        },
        fullWidth && styles.fullWidth,
        variant === 'ghost' && styles.ghostMinWidth,
        shadowStyle,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : c.primary} />
      ) : (
        <>
          {leftIcon}
          <Text
            style={{
              color: labelColor,
              fontSize: fs,
              fontWeight: size === 'hero' ? '700' : '600',
            }}
            numberOfLines={1}
          >
            {title}
          </Text>
          {rightIcon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  ghostMinWidth: {
    minHeight: controlHeight.sm,
    paddingHorizontal: spacing.md,
  },
  disabled: {
    opacity: 0.55,
  },
});
