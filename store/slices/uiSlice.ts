import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  /** True after user finishes the first-launch app intro (not profile onboarding). */
  appOnboardingComplete: boolean;
}

const initialState: UiState = {
  appOnboardingComplete: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAppOnboardingComplete: (state, action: PayloadAction<boolean>) => {
      state.appOnboardingComplete = action.payload;
    },
  },
});

export const { setAppOnboardingComplete } = uiSlice.actions;
export default uiSlice.reducer;
