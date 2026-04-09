import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AiPlan } from '@/types/ai';

export interface UserProfileState {
  gender?: string;
  birthday?: string;
  age?: { years: number; months: number; days: number };
  weightKG?: string;
  heightFeet?: string;
  goal?: string;
  workoutDays?: string;
  aiPlan?: AiPlan;
  onboardingComplete: boolean;
}

const initialState: UserProfileState = {
  onboardingComplete: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      return { ...state, ...action.payload };
    },
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
