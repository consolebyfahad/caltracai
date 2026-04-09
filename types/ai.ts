/** Normalized AI plan returned by `services/ai` and stored on the user profile. */
export interface AiPlan {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  waterLiters: number;
  planSummary: string;
}
