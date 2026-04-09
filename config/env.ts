/**
 * Typed access to public Expo env vars (`EXPO_PUBLIC_*` are bundled client-side).
 */
const trim = (v: string | undefined) => (typeof v === 'string' ? v.trim() : '');

export const env = {
  firebase: {
    apiKey: trim(process.env.EXPO_PUBLIC_FIREBASE_API_KEY),
    authDomain: trim(process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN),
    projectId: trim(process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID),
    storageBucket: trim(process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET),
    messagingSenderId: trim(process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
    appId: trim(process.env.EXPO_PUBLIC_FIREBASE_APP_ID),
    measurementId: trim(process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID),
  },
  geminiApiKey: trim(process.env.EXPO_PUBLIC_GEMINI_API_KEY),
} as const;

export function isFirebaseConfigured(): boolean {
  return Boolean(
    env.firebase.apiKey &&
      env.firebase.authDomain &&
      env.firebase.projectId &&
      env.firebase.appId
  );
}

export function isGeminiConfigured(): boolean {
  const k = env.geminiApiKey;
  return Boolean(k && k !== 'your_gemini_api_key_here');
}
