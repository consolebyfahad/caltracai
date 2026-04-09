import { fontSize, lineHeight, s } from "@/constants/sizing";
import { Colors, Gradients } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAppDispatch } from "@/store/hooks";
import { setAppOnboardingComplete } from "@/store/slices/uiSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppOnboardingScreen() {
  const theme = useColorScheme();
  const c = Colors[theme];
  const dispatch = useAppDispatch();
  const { width, height } = useWindowDimensions();
  const imageSize = Math.min(width * 0.42, s(200));

  const finish = useCallback(() => {
    dispatch(setAppOnboardingComplete(true));
    router.replace("/");
  }, [dispatch]);

  const slideGradients = Gradients[theme].onboarding;

  const pages = useMemo(() => {
    const lightText = theme === "dark";
    const slideContent = [
      {
        title: "Welcome to Caltrac",
        subtitle:
          "Track calories and macros with a focused, gym-ready experience built for your goals.",
        icon: "nutrition-outline" as const,
      },
      {
        title: "AI-powered plans",
        subtitle:
          "Get personalized targets from your profile—so every day has a clear plan.",
        icon: "sparkles-outline" as const,
      },
      {
        title: "Stay consistent",
        subtitle:
          "Pick up where you left off and keep momentum with a session that remembers you.",
        icon: "trophy-outline" as const,
      },
    ];

    return slideContent.map((slide, i) => {
      const colors = [...slideGradients[i]];
      return {
        backgroundColor: "transparent",
        isLight: lightText,
        background: (
          <LinearGradient
            colors={colors as [string, string, ...string[]]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ width, height }}
          />
        ),
        image: (
          <View
            style={[
              styles.imageWrap,
              {
                width: imageSize,
                height: imageSize,
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(27,94,58,0.12)",
              },
            ]}
          >
            <Ionicons
              name={slide.icon}
              size={Math.round(imageSize * 0.45)}
              color={theme === "dark" ? "#E8F5E9" : c.primary}
            />
          </View>
        ),
        title: slide.title,
        subtitle: slide.subtitle,
      };
    });
  }, [c.primary, height, imageSize, slideGradients, theme, width]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <Onboarding
        pages={pages}
        onDone={finish}
        onSkip={finish}
        showSkip
        bottomBarHighlight={false}
        controlStatusBar={false}
        nextLabel="Next"
        skipLabel="Skip"
        doneLabel="Get started"
        bottomBarColor="transparent"
        titleStyles={[
          styles.title,
          { color: theme === "dark" ? "#FFFFFF" : "#1A2E22" },
        ]}
        subTitleStyles={[
          styles.subtitle,
          { color: theme === "dark" ? "rgba(200,230,201,0.9)" : "#3D5848" },
        ]}
        containerStyles={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "transparent" },
  container: { flex: 1 },
  imageWrap: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(28),
  },
  title: {
    fontSize: fontSize.title1,
    fontWeight: "700",
    paddingHorizontal: s(24),
  },
  subtitle: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    paddingHorizontal: s(28),
    textAlign: "center",
  },
});
