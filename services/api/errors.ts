/**
 * Map Firebase / network errors to user-safe messages.
 */
export function mapFirebaseAuthError(error: unknown): string {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: string }).code)
      : '';

  const byCode: Record<string, string> = {
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/invalid-email': 'That email address does not look valid.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'Incorrect email or password. Please try again.',
    'auth/wrong-password': 'Incorrect email or password. Please try again.',
    'auth/email-already-in-use': 'An account already exists with this email.',
    'auth/weak-password': 'Use a stronger password (at least 6 characters).',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
    'auth/operation-not-allowed': 'Email sign-in is not available. Contact support.',
    'auth/requires-recent-login': 'Please sign in again to continue.',
  };

  if (code && byCode[code]) return byCode[code];

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const raw = String((error as { message: string }).message);
    if (raw.includes('auth/')) return 'Sign-in failed. Please check your details and try again.';
  }

  return 'Something went wrong. Please try again.';
}

export function mapFirestoreError(error: unknown, fallback = 'Could not save data. Please try again.'): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String((error as { code?: string }).code);
    if (code === 'permission-denied') return 'You do not have permission to perform this action.';
    if (code === 'unavailable') return 'Service temporarily unavailable. Try again shortly.';
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const msg = String((error as { message: string }).message);
    if (__DEV__ && msg) return msg;
  }
  return fallback;
}
