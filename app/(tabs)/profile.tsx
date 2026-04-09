import { ScreenGradient } from "@/components/ScreenGradient";
import { AppButton } from "@/components/ui/AppButton";
import { fontSize, iconSize, radius, s, spacing } from "@/constants/sizing";
import { useFloatingTabBarInset } from "@/hooks/use-floating-tab-bar-inset";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../config/firebaseConfig";
import { Colors } from "../../constants/theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCredentials } from "../../store/slices/authSlice";
import { clearUserProfile } from "../../store/slices/profileSlice";
import {
  setThemePreference,
  type ThemePreference,
} from "../../store/slices/themeSlice";

const THEME_OPTIONS: {
  key: ThemePreference;
  label: string;
  icon: "contrast-outline" | "sunny-outline" | "moon-outline";
}[] = [
  { key: "system", label: "System", icon: "contrast-outline" },
  { key: "light", label: "Light", icon: "sunny-outline" },
  { key: "dark", label: "Dark", icon: "moon-outline" },
];

export default function ProfileScreen() {
  const theme = useColorScheme();
  const c = Colors[theme];
  const tabBarInset = useFloatingTabBarInset();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const profile = useAppSelector((s) => s.profile);
  const themePreference = useAppSelector((s) => s.theme.preference);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch {
            // Still clear local session if network / Firebase fails
          }
          dispatch(clearCredentials());
          dispatch(clearUserProfile());
          router.dismissAll();
          router.replace("/");
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    router.push("/setup");
  };

  const details = [
    { label: "Gender", value: profile.gender, icon: "person-outline" as const },
    {
      label: "Height",
      value: profile.heightFeet ? `${profile.heightFeet} ft` : undefined,
      icon: "resize-outline" as const,
    },
    {
      label: "Weight",
      value: profile.weightKG ? `${profile.weightKG} kg` : undefined,
      icon: "scale-outline" as const,
    },
    {
      label: "Goal",
      value:
        profile.goal === "lose"
          ? "Lose Weight"
          : profile.goal === "gain"
            ? "Gain Muscle"
            : profile.goal === "maintain"
              ? "Maintain Weight"
              : undefined,
      icon: "trophy-outline" as const,
    },
    {
      label: "Workout Days",
      value: profile.workoutDays
        ? `${profile.workoutDays} days/week`
        : undefined,
      icon: "barbell-outline" as const,
    },
    {
      label: "Age",
      value: profile.age ? `${profile.age.years} yrs` : undefined,
      icon: "calendar-outline" as const,
    },
  ];

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingBottom: tabBarInset }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Text style={[styles.title, { color: c.text }]}>Profile</Text>

          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: c.primary }]}>
              <Text style={styles.avatarText}>
                {(user?.name ?? "U").charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={[styles.userName, { color: c.text }]}>
              {user?.name ?? "User"}
            </Text>
            <Text style={[styles.userEmail, { color: c.textSecondary }]}>
              {user?.email}
            </Text>
          </View>

          {/* Appearance */}
          <Text style={[styles.sectionHeading, { color: c.textSecondary }]}>
            Appearance
          </Text>
          <View style={[styles.themeRow, { backgroundColor: c.card }]}>
            {THEME_OPTIONS.map((opt) => {
              const selected = themePreference === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={[
                    styles.themeOption,
                    {
                      borderColor: c.border,
                      backgroundColor: selected
                        ? c.primary + "24"
                        : "transparent",
                    },
                    selected && { borderColor: c.primary },
                  ]}
                  onPress={() => dispatch(setThemePreference(opt.key))}
                  activeOpacity={0.85}
                >
                  <Ionicons
                    name={opt.icon}
                    size={iconSize.md}
                    color={selected ? c.primary : c.textSecondary}
                  />
                  <Text
                    style={[
                      styles.themeOptionLabel,
                      { color: c.text },
                      selected && { fontWeight: "700", color: c.primary },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Details list */}
          <View style={[styles.section, { backgroundColor: c.card }]}>
            {details.map((item, index) =>
              item.value ? (
                <View
                  key={item.label}
                  style={[
                    styles.row,
                    index < details.filter((d) => d.value).length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: c.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.rowIcon,
                      { backgroundColor: c.primary + "18" },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={iconSize.smMd}
                      color={c.primary}
                    />
                  </View>
                  <Text style={[styles.rowLabel, { color: c.textSecondary }]}>
                    {item.label}
                  </Text>
                  <Text style={[styles.rowValue, { color: c.text }]}>
                    {item.value}
                  </Text>
                </View>
              ) : null,
            )}
          </View>

          <AppButton
            title="Edit Profile"
            onPress={handleEditProfile}
            variant="primary"
            size="comfortable"
            leftIcon={
              <Ionicons name="create-outline" size={iconSize.sm} color="#fff" />
            }
            style={styles.editBtn}
          />

          <AppButton
            title="Sign Out"
            onPress={handleLogout}
            variant="outline"
            destructive
            size="comfortable"
            leftIcon={
              <Ionicons
                name="log-out-outline"
                size={iconSize.sm}
                color={c.error}
              />
            }
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: spacing.xl },
  title: {
    fontSize: fontSize.title1,
    fontWeight: "bold",
    marginBottom: spacing.xxl,
  },
  sectionHeading: {
    fontSize: fontSize.caption,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginBottom: s(10),
    marginTop: spacing.xxs,
  },
  themeRow: {
    flexDirection: "row",
    borderRadius: radius.xl,
    padding: spacing.xs + spacing.xxs,
    gap: spacing.sm,
    marginBottom: spacing.xxl,
  },
  themeOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    gap: spacing.xs + spacing.xxs,
  },
  themeOptionLabel: { fontSize: fontSize.caption },
  avatarSection: { alignItems: "center", marginBottom: spacing.xxxl },
  avatar: {
    width: s(80),
    height: s(80),
    borderRadius: s(40),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: "#fff",
    fontSize: fontSize.largeTitle,
    fontWeight: "bold",
  },
  userName: {
    fontSize: fontSize.title3,
    fontWeight: "700",
    marginBottom: spacing.xxs,
  },
  userEmail: { fontSize: fontSize.bodySmall },
  section: {
    borderRadius: radius.xl,
    overflow: "hidden",
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: s(14),
    gap: spacing.md,
  },
  rowIcon: {
    width: s(32),
    height: s(32),
    borderRadius: radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: { flex: 1, fontSize: fontSize.bodySmall },
  rowValue: { fontSize: fontSize.bodySmall, fontWeight: "600" },
  editBtn: {
    marginBottom: spacing.md,
  },
});
