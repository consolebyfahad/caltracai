import { ScreenGradient } from "@/components/ScreenGradient";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";
import { fontSize, inset, spacing } from "@/constants/sizing";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { toast } from "@/lib/toast";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";
import { loginUser, registerUser } from "../services/api";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/authSlice";

export default function AuthScreen() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const theme = useColorScheme();
  const themeColors = Colors[theme];

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Error", "Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (isSignIn) {
        result = await loginUser(email, password);
      } else {
        if (!name) {
          toast.error("Error", "Name is required for sign up.");
          setLoading(false);
          return;
        }
        result = await registerUser(name, email, password);
      }

      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
        }),
      );

      if (result.user.onboardingComplete) {
        router.replace("/(tabs)");
      } else {
        router.replace("/setup");
      }
    } catch (error: any) {
      toast.error(
        "Authentication Failed",
        error.message || "An error occurred.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenGradient>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              {isSignIn ? "Welcome Back" : "Create Account"}
            </Text>
            <Text
              style={[styles.subtitle, { color: themeColors.textSecondary }]}
            >
              {isSignIn
                ? "Sign in to calorie tracker"
                : "Sign up to get started"}
            </Text>
          </View>

          <View style={styles.form}>
            {!isSignIn && (
              <AppTextField
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <AppTextField
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <AppTextField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <AppButton
              title={isSignIn ? "Sign In" : "Sign Up"}
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              size="default"
              style={styles.submitBtn}
            />
          </View>

          <View style={styles.footer}>
            <Text
              style={[styles.footerText, { color: themeColors.textSecondary }]}
            >
              {isSignIn
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={toggleMode}>
              <Text style={[styles.linkText, { color: themeColors.primary }]}>
                {isSignIn ? "Sign Up" : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: inset.screen,
  },
  header: {
    marginBottom: spacing.huge,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: "bold",
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.body,
  },
  form: {
    gap: spacing.lg,
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.xxxl,
  },
  footerText: {
    fontSize: fontSize.bodySmall,
  },
  linkText: {
    fontSize: fontSize.bodySmall,
    fontWeight: "600",
  },
});
