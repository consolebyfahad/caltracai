import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { kodeMono } from "@/constants/fonts";
import { m, spacing, v } from "@/constants/sizing";

/**
 * Full-screen splash after native splash hides: logo + wordmark in Kode Mono (black background).
 */
export function BrandBootSplash() {
  return (
    <View style={styles.root} pointerEvents="none">
      <Image
        source={require("@/assets/images/CALTRACAI.png")}
        style={styles.logo}
        contentFit="contain"
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.wordmark} allowFontScaling={false}>
        CALTRACAI
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    elevation: 100,
  },
  logo: {
    width: m(200),
    height: m(200),
  },
  wordmark: {
    marginTop: spacing.lg,
    fontFamily: kodeMono.bold,
    fontSize: m(26),
    letterSpacing: m(6),
    color: "#FFFFFF",
  },
});
