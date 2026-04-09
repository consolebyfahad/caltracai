/**
 * Auth/session shapes shared by Redux, Firebase auth API, and Firestore user docs.
 */
export interface SessionUser {
  uid: string;
  name: string;
  email: string;
  onboardingComplete: boolean;
}

export interface AuthCredentialsPayload {
  user: SessionUser;
  token: string;
}
