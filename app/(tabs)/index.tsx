import { HomeCaloriesSection } from "@/components/home/HomeCaloriesSection";
import { HomeDailyTargets } from "@/components/home/HomeDailyTargets";
import { HomeGoalChip } from "@/components/home/HomeGoalChip";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomePlanSummary } from "@/components/home/HomePlanSummary";
import { ScreenGradient } from "@/components/ScreenGradient";
import { WeekDateStrip } from "@/components/WeekDateStrip";
import { spacing } from "@/constants/sizing";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFloatingTabBarInset } from "@/hooks/use-floating-tab-bar-inset";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import { useAppSelector } from "../../store/hooks";

export default function HomeScreen() {
  const theme = useColorScheme();
  const c = Colors[theme];
  const tabBarInset = useFloatingTabBarInset();
  const profile = useAppSelector((s) => s.profile);
  const user = useAppSelector((s) => s.auth.user);

  const name = user?.name ?? "there";
  const plan = profile.aiPlan;

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: tabBarInset },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <HomeHeader name={name} colors={c} />
          <HomeGoalChip goal={profile.goal} colors={c} />

          <View style={styles.weekStripWrap}>
            <WeekDateStrip />
          </View>

          {plan?.planSummary ? (
            <HomePlanSummary text={plan.planSummary} colors={c} />
          ) : null}

          {plan?.dailyCalories != null && plan.dailyCalories > 0 ? (
            <HomeCaloriesSection
              goalKcal={plan.dailyCalories}
              consumedKcal={0}
              theme={theme}
              colors={c}
            />
          ) : null}

          <HomeDailyTargets plan={plan} theme={theme} colors={c} />
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.xl },
  weekStripWrap: {
    marginHorizontal: -spacing.xl,
  },
});
