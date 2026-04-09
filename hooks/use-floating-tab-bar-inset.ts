import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { v } from '@/constants/sizing';

/** Visual height of floating capsule + FAB row plus margin above home indicator. */
const FLOATING_BAR_BLOCK = v(72);
const FLOATING_BAR_MARGIN = v(12);

export function useFloatingTabBarInset() {
  const { bottom } = useSafeAreaInsets();
  return FLOATING_BAR_BLOCK + FLOATING_BAR_MARGIN + bottom;
}
