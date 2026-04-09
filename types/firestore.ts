import type { AiPlan } from '@/types/ai';

/** Optional profile fields persisted under `users/{uid}` in Firestore. */
export interface FirestoreUserProfile {
  uid?: string;
  name?: string;
  email?: string;
  onboardingComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
  gender?: string;
  birthday?: string;
  age?: { years: number; months: number; days: number };
  weightKG?: string;
  heightFeet?: string;
  goal?: string;
  workoutDays?: string;
  aiPlan?: AiPlan;
}
