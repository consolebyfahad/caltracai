import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { useAppSelector } from '@/store/hooks';

export type { ThemePreference } from '@/store/slices/themeSlice';

/**
 * Matches native: after hydration, apply theme preference + system scheme.
 */
export function useColorScheme(): 'light' | 'dark' {
  const preference = useAppSelector((s) => s.theme.preference);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const system = useRNColorScheme();
  const systemResolved = system === 'dark' ? 'dark' : 'light';

  if (!hasHydrated) {
    return 'light';
  }

  if (preference === 'system') return systemResolved;
  return preference;
}
