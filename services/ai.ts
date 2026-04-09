import { GoogleGenerativeAI } from '@google/generative-ai';

import { isGeminiConfigured, env } from '@/config/env';
import type { UserProfileState } from '@/store/slices/profileSlice';
import type { AiPlan } from '@/types/ai';

export type { AiPlan } from '@/types/ai';

const genAI = new GoogleGenerativeAI(env.geminiApiKey);

export async function generateFitnessPlan(profile: Partial<UserProfileState>): Promise<AiPlan> {
  if (!isGeminiConfigured()) {
    if (__DEV__) {
      console.warn('[Caltrac] Gemini API key missing — using mock plan. Set EXPO_PUBLIC_GEMINI_API_KEY in .env');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          dailyCalories: 2400,
          proteinGrams: 150,
          carbsGrams: 250,
          fatsGrams: 70,
          waterLiters: 3.5,
          planSummary:
            'Mock plan: add EXPO_PUBLIC_GEMINI_API_KEY for real AI-generated targets based on your profile.',
        });
      }, 3000);
    });
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
    You are an elite, world-class personal trainer and nutritionist AI.
    Calculate a precision fitness regime for a user with the following profile:

    Gender: ${profile.gender}
    Exact Age: ${profile.age?.years} years
    Weight: ${profile.weightKG} KG
    Height: ${profile.heightFeet} Feet
    Primary Goal: ${profile.goal}
    Workout Frequency: ${profile.workoutDays} Days / Week

    Return the results STRICTLY as this raw JSON object, without any markdown formatting or backticks:
    {
      "dailyCalories": number,
      "proteinGrams": number,
      "carbsGrams": number,
      "fatsGrams": number,
      "waterLiters": number,
      "planSummary": "string (A 2-sentence highly motivating review of this precise regimen)"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson) as AiPlan;
  } catch (error) {
    console.error('Failed to generate AI plan:', error);
    throw error;
  }
}
