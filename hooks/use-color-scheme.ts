import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppSelector } from '@/store/hooks';

export type { ThemePreference } from '@/store/slices/themeSlice';

export function useColorScheme(): 'light' | 'dark' {
  const preference = useAppSelector((s) => s.theme.preference);
  const system = useRNColorScheme();
  const systemResolved = system === 'dark' ? 'dark' : 'light';
  if (preference === 'system') return systemResolved;
  return preference;
}
