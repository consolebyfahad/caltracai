import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../config/firebaseConfig";
import type { AppDispatch } from "../store";
import { clearCredentials, setCredentials } from "../store/slices/authSlice";
import type { UserProfileState } from "../store/slices/profileSlice";
import { clearUserProfile, setUserProfile } from "../store/slices/profileSlice";

type SubscribeOptions = {
  /** Called after each auth snapshot is applied (use for “initial load done” gating). */
  onSynced?: () => void;
};

/**
 * Keeps Redux in sync with Firebase Auth (restores session after app restart / refresh).
 */
export function subscribeAuthSession(
  dispatch: AppDispatch,
  options?: SubscribeOptions,
) {
  return onAuthStateChanged(auth, async (fbUser) => {
    try {
      if (fbUser) {
        const token = await fbUser.getIdToken();
        const snap = await getDoc(doc(db, "users", fbUser.uid));
        const d = snap.exists() ? snap.data() : {};
        const name = (d.name as string | undefined) ?? fbUser.displayName ?? "";
        const email = (d.email as string | undefined) ?? fbUser.email ?? "";
        const onboardingComplete = !!(d.onboardingComplete as
          | boolean
          | undefined);

        dispatch(
          setCredentials({
            user: { uid: fbUser.uid, name, email, onboardingComplete },
            token,
          }),
        );

        dispatch(
          setUserProfile({
            gender: d.gender as string | undefined,
            birthday: d.birthday as string | undefined,
            age: d.age as UserProfileState["age"],
            weightKG: d.weightKG as string | undefined,
            heightFeet: d.heightFeet as string | undefined,
            goal: d.goal as string | undefined,
            workoutDays: d.workoutDays as string | undefined,
            aiPlan: d.aiPlan as UserProfileState["aiPlan"],
            onboardingComplete,
          }),
        );
      } else {
        dispatch(clearCredentials());
        dispatch(clearUserProfile());
      }
    } catch {
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken();
          dispatch(
            setCredentials({
              user: {
                uid: fbUser.uid,
                name: fbUser.displayName ?? "",
                email: fbUser.email ?? "",
                onboardingComplete: false,
              },
              token,
            }),
          );
        } catch {
          dispatch(clearCredentials());
          dispatch(clearUserProfile());
        }
      } else {
        dispatch(clearCredentials());
        dispatch(clearUserProfile());
      }
    } finally {
      options?.onSynced?.();
    }
  });
}
