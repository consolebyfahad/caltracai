import { StyleSheet, Text, type TextProps } from "react-native";

import { fontSize, lineHeight } from "@/constants/sizing";
import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
  },
  defaultSemiBold: {
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontWeight: "600",
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: "bold",
    lineHeight: lineHeight.tight,
  },
  subtitle: {
    fontSize: fontSize.title3,
    fontWeight: "bold",
  },
  link: {
    lineHeight: Math.round(fontSize.body * 1.85),
    fontSize: fontSize.body,
    color: "#0a7ea4",
  },
});
