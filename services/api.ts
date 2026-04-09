import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

function getFirebaseAuthMessage(error: unknown): string {
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

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    // 1. Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Optionally update the profile name in Auth
    await updateProfile(user, { displayName: name });

    // 3. Save additional user details in Firestore 'users' collection
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: new Date().toISOString()
    });

    // 4. Return user object structure matched for Redux
    return {
      user: {
        uid: user.uid,
        name,
        email,
        onboardingComplete: false
      },
      token: await user.getIdToken()
    };
  } catch (error: unknown) {
    throw new Error(getFirebaseAuthMessage(error));
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    // 1. Sign in the user via Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Retrieve user details from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : { name: user.displayName, email: user.email, onboardingComplete: false };

    return {
      user: {
        uid: user.uid,
        name: userData.name,
        email: userData.email,
        onboardingComplete: userData.onboardingComplete || false,
      },
      token: await user.getIdToken()
    };
  } catch (error: unknown) {
    throw new Error(getFirebaseAuthMessage(error));
  }
};

export const saveUserProfile = async (uid: string, profileData: any) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      ...profileData,
      onboardingComplete: true,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    
    return true;
  } catch (error: any) {
    console.error("Error saving user profile: ", error.message);
    throw error;
  }
};
