import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { radius, s, spacing, v } from "@/constants/sizing";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { toast } from "@/lib/toast";
import { Colors } from "../constants/theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setUserProfile, UserProfileState } from "../store/slices/profileSlice";

import { ScreenGradient } from "@/components/ScreenGradient";
import { AppButton } from "@/components/ui/AppButton";
import BirthdayStep from "../components/SetupSteps/BirthdayStep";
import GenderStep from "../components/SetupSteps/GenderStep";
import GoalStep from "../components/SetupSteps/GoalStep";
import PhysicalStep from "../components/SetupSteps/PhysicalStep";
import WorkoutStep from "../components/SetupSteps/WorkoutStep";

export default function SetupScreen() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  const [step, setStep] = useState(1);

  // Local drafted state
  const [draft, setDraft] = useState<Partial<UserProfileState>>({
    birthday: new Date().toISOString(),
    weightKG: "",
    heightFeet: "",
  });

  const goNext = async () => {
    // Validate current step before proceeding
    if (step === 1 && !draft.gender)
      return toast.info("Required", "Please select a gender.");
    if (step === 3 && (!draft.weightKG || !draft.heightFeet))
      return toast.info("Required", "Please enter your weight and height.");
    if (step === 4 && !draft.goal)
      return toast.info("Required", "Please select a goal.");
    if (step === 5 && !draft.workoutDays)
      return toast.info("Required", "Please select your activity level.");

    if (step < 5) {
      setStep(step + 1);
    } else {
      // Finalize and save
      await handleComplete();
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!authState.user?.uid) {
      toast.error("Error", "User ID missing. Try logging in again.");
      return;
    }

    try {
      // Temporarily cache locally to Redux Profile before throwing to AI Orchestrator
      const payload = { ...draft, onboardingComplete: false };
      dispatch(setUserProfile(payload));

      // Navigate to AI Engine
      router.replace("/generating");
    } catch {
      toast.error("Error", "Could not cache profile data.");
    }
  };

  // Step Renders
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <GenderStep
            value={draft.gender}
            onChange={(val) => setDraft({ ...draft, gender: val })}
          />
        );
      case 2:
        return (
          <BirthdayStep
            date={new Date(draft.birthday!)}
            onChange={(date) =>
              setDraft({ ...draft, birthday: date.toISOString() })
            }
            onAgeCalculate={(age) => setDraft({ ...draft, age })}
          />
        );
      case 3:
        return (
          <PhysicalStep
            weightKG={draft.weightKG!}
            setWeightKG={(val) => setDraft({ ...draft, weightKG: val })}
            heightFeet={draft.heightFeet!}
            setHeightFeet={(val) => setDraft({ ...draft, heightFeet: val })}
          />
        );
      case 4:
        return (
          <GoalStep
            value={draft.goal}
            onChange={(val) => setDraft({ ...draft, goal: val })}
          />
        );
      case 5:
        return (
          <WorkoutStep
            value={draft.workoutDays}
            onChange={(val) => setDraft({ ...draft, workoutDays: val })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        {/* Header / Progress */}
        <View style={styles.header}>
          {step > 1 ? (
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Ionicons
                name="arrow-back"
                size={s(24)}
                color={themeColors.text}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButtonPlaceholder} />
          )}

          <View style={styles.progressContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <View
                key={i}
                style={[
                  styles.progressBar,
                  { backgroundColor: themeColors.border },
                  i <= step ? { backgroundColor: themeColors.primary } : null,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>{renderStep()}</View>

        {/* Footer / Buttons */}
        <View style={styles.footer}>
          <AppButton
            title={step === 5 ? "Finish Build" : "Continue"}
            onPress={goNext}
            variant="primary"
            size="hero"
            elevated
          />
        </View>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: v(10),
    paddingBottom: spacing.xl,
  },
  backButton: {
    padding: spacing.sm,
    marginRight: s(10),
  },
  backButtonPlaceholder: {
    width: s(40),
    marginRight: s(10),
  },
  progressContainer: {
    flex: 1,
    flexDirection: "row",
    gap: spacing.xs + spacing.xxs,
  },
  progressBar: {
    flex: 1,
    height: s(6),
    borderRadius: radius.xs / 2,
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: Platform.OS === "ios" ? spacing.xl : v(40),
    paddingTop: spacing.xl,
  },
});
