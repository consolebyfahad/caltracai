import type { RootState } from './index';

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectThemePreference = (state: RootState) => state.theme.preference;
export const selectUserProfile = (state: RootState) => state.profile;
export const selectAppOnboardingComplete = (state: RootState) => state.ui.appOnboardingComplete;

export const selectAuthOnboardingComplete = (state: RootState) =>
  Boolean(state.auth.user?.onboardingComplete);
