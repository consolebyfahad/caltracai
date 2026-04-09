import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { BrandBootSplash } from "@/components/BrandBootSplash";
import { kodeMonoMap } from "@/constants/fonts";

SplashScreen.preventAutoHideAsync().catch(() => {});
import type { ToastConfig } from "react-native-toast-message";
import Toast, { BaseToast } from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";

import { fontSize, lineHeight, spacing, v } from "@/constants/sizing";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { subscribeAuthSession } from "@/services/authSession";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { Provider } from "react-redux";
import { persistor, store } from "../store";

/** Paths that do not require a Firebase session (see usePathname — tabs may be `/profile` not `/(tabs)/profile`). */
function isPublicAuthPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/index" ||
    pathname === "" ||
    pathname === "/onboarding"
  );
}

function RootLayoutInner() {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((s) => s.auth.user);
  const appOnboardingComplete = useAppSelector(
    (s) => s.ui.appOnboardingComplete,
  );
  const router = useRouter();
  const pathname = usePathname();
  const [authSynced, setAuthSynced] = useState(false);

  useEffect(() => {
    return subscribeAuthSession(dispatch, {
      onSynced: () => setAuthSynced(true),
    });
  }, [dispatch]);

  useEffect(() => {
    if (!appOnboardingComplete && pathname !== "/onboarding") {
      router.replace("/onboarding");
      return;
    }
    if (appOnboardingComplete && pathname === "/onboarding") {
      router.replace("/");
    }
  }, [appOnboardingComplete, pathname, router]);

  useEffect(() => {
    if (!appOnboardingComplete) return;
    /**
     * Block only until we know whether a session exists:
     * - After persist rehydrate, `authUser` may already be set (no login flash).
     * - Otherwise wait for the first Firebase `onAuthStateChanged` callback (`authSynced`).
     */
    if (!authSynced && !authUser?.uid) return;

    const uid = authUser?.uid;
    const onboarded = authUser?.onboardingComplete;

    if (!uid) {
      if (!isPublicAuthPath(pathname)) {
        router.replace("/");
      }
      return;
    }

    if (!onboarded) {
      if (pathname !== "/setup" && pathname !== "/generating") {
        router.replace("/setup");
      }
      return;
    }

    const onGateScreen =
      pathname === "/" ||
      pathname === "/index" ||
      pathname === "" ||
      pathname === "/setup" ||
      pathname === "/generating";

    if (onGateScreen) {
      router.replace("/(tabs)");
    }
  }, [
    appOnboardingComplete,
    authSynced,
    authUser?.uid,
    authUser?.onboardingComplete,
    pathname,
    router,
  ]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";
  const c = Colors[theme];

  const toastConfig = useMemo<ToastConfig>(
    () => ({
      success: (props) => (
        <BaseToast
          {...props}
          style={{
            borderLeftColor: "#34C759",
            backgroundColor: c.toastBackground,
          }}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          text1Style={[
            { fontSize: fontSize.body, fontWeight: "600", color: c.text },
            props.text1Style,
          ]}
          text2Style={[
            {
              fontSize: fontSize.bodySmall,
              lineHeight: lineHeight.bodySmall,
              color: c.textSecondary,
            },
            props.text2Style,
          ]}
        />
      ),
      error: (props) => (
        <BaseToast
          {...props}
          style={{
            borderLeftColor: c.error,
            backgroundColor: c.toastBackground,
          }}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          text1Style={[
            { fontSize: fontSize.body, fontWeight: "600", color: c.text },
            props.text1Style,
          ]}
          text2Style={[
            {
              fontSize: fontSize.bodySmall,
              lineHeight: lineHeight.bodySmall,
              color: c.textSecondary,
            },
            props.text2Style,
          ]}
        />
      ),
      info: (props) => (
        <BaseToast
          {...props}
          style={{
            borderLeftColor: c.primary,
            backgroundColor: c.toastBackground,
          }}
          contentContainerStyle={{ paddingHorizontal: spacing.lg }}
          text1Style={[
            { fontSize: fontSize.body, fontWeight: "600", color: c.text },
            props.text1Style,
          ]}
          text2Style={[
            {
              fontSize: fontSize.bodySmall,
              lineHeight: lineHeight.bodySmall,
              color: c.textSecondary,
            },
            props.text2Style,
          ]}
        />
      ),
    }),
    [c.error, c.primary, c.text, c.textSecondary, c.toastBackground],
  );

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade",
          }}
        />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="setup"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="generating"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: "fade",
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Toast config={toastConfig} position="top" topOffset={v(56)} />
    </ThemeProvider>
  );
}

function PersistLoading() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8F5E9",
      }}
    >
      <ActivityIndicator size="large" color="#1B5E3A" />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts(kodeMonoMap);
  const [brandSplashVisible, setBrandSplashVisible] = useState(true);

  useEffect(() => {
    if (!fontsLoaded) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    void (async () => {
      await SplashScreen.hideAsync();
      if (cancelled) return;
      timeout = setTimeout(() => setBrandSplashVisible(false), 520);
    })();

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<PersistLoading />}>
          <RootLayoutInner />
        </PersistGate>
      </Provider>
      {brandSplashVisible ? <BrandBootSplash /> : null}
    </View>
  );
}
