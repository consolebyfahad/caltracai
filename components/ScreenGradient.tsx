import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, type ColorValue, type StyleProp, type ViewStyle } from 'react-native';

import { screenGradientColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const LOCATIONS_4 = [0, 0.35, 0.72, 1] as const;

export function ScreenGradient({ children, style }: Props) {
  const theme = useColorScheme();
  const colors = screenGradientColors[theme] as readonly [ColorValue, ColorValue, ...ColorValue[]];

  return (
    <LinearGradient
      colors={colors}
      locations={LOCATIONS_4}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.fill, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
