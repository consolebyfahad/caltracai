import { ScreenGradient } from "@/components/ScreenGradient";
import { fontSize, s, spacing, v } from "@/constants/sizing";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { toast } from "@/lib/toast";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { generateFitnessPlan } from "../services/ai";
import { saveUserProfile } from "../services/api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";
import { setUserProfile } from "../store/slices/profileSlice";

export default function GeneratingScreen() {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const profileState = useAppSelector((state) => state.profile);
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  const [loadingText, setLoadingText] = useState(
    "Initializing Gemini AI Core...",
  );

  useEffect(() => {
    const forceSaveWithoutPlan = async () => {
      try {
        const payload = { ...profileState, onboardingComplete: true };
        await saveUserProfile(authState.user!.uid!, payload);
        dispatch(setUserProfile(payload));
        dispatch(
          setCredentials({
            user: { ...authState.user, onboardingComplete: true },
            token: authState.token!,
          }),
        );
        router.replace("/(tabs)");
      } catch {
        router.replace("/setup");
      }
    };

    const runAI = async () => {
      if (!authState.user?.uid) {
        toast.error("Error", "User ID missing. Try logging in again.");
        router.replace("/");
        return;
      }

      try {
        setTimeout(
          () => setLoadingText("Analyzing physical attributes..."),
          800,
        );
        setTimeout(
          () => setLoadingText("Calculating macronutrient goals..."),
          1600,
        );
        setTimeout(
          () => setLoadingText("Finalizing AI fitness regime..."),
          2400,
        );

        const plan = await generateFitnessPlan(profileState);

        const payload = {
          ...profileState,
          aiPlan: plan,
          onboardingComplete: true,
        };

        await saveUserProfile(authState.user!.uid!, payload);

        dispatch(setUserProfile(payload));

        dispatch(
          setCredentials({
            user: { ...authState.user, onboardingComplete: true },
            token: authState.token!,
          }),
        );

        router.replace("/(tabs)");
      } catch {
        toast.error(
          "Generation failed",
          "Tap to save your profile and continue without a plan.",
          {
            visibilityTime: 12000,
            onPress: () => {
              toast.hide();
              void forceSaveWithoutPlan();
            },
          },
        );
      }
    };

    void runAI();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run generation once on mount
  }, []);

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="sparkles"
              size={s(60)}
              color={themeColors.primary}
            />
            <Ionicons
              name="analytics"
              size={s(60)}
              color={themeColors.textSecondary}
              style={styles.overlapIcon}
            />
          </View>
          <Text style={[styles.title, { color: themeColors.text }]}>
            Designing Your Plan
          </Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            {loadingText}
          </Text>

          <ActivityIndicator
            size="large"
            color={themeColors.primary}
            style={styles.spinner}
          />
        </View>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    padding: spacing.xxxl - spacing.xs,
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: spacing.xxxl - spacing.xs,
    opacity: 0.9,
  },
  overlapIcon: {
    marginLeft: -s(20),
    marginTop: spacing.xl,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: spacing.lg,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: fontSize.callout,
    textAlign: "center",
    marginBottom: v(40),
    minHeight: v(30),
  },
  spinner: {
    transform: [{ scale: 1.2 }],
  },
});
