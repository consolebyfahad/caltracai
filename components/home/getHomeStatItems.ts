import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

import type { AiPlan } from "@/types/ai";

export type HomeStatIcon = ComponentProps<typeof Ionicons>["name"];

export interface HomeStatItem {
  label: string;
  value: string;
  unit: string;
  icon: HomeStatIcon;
  color: string;
}

export function getHomeStatItems(
  plan: AiPlan | undefined,
  accentTeal: string
): HomeStatItem[] {
  return [
    {
      label: "Protein",
      value: plan != null ? String(plan.proteinGrams) : "—",
      unit: "g",
      icon: "barbell-outline",
      color: "#34C759",
    },
    {
      label: "Carbs",
      value: plan != null ? String(plan.carbsGrams) : "—",
      unit: "g",
      icon: "leaf-outline",
      color: "#FF9F0A",
    },
    {
      label: "Fats",
      value: plan != null ? String(plan.fatsGrams) : "—",
      unit: "g",
      icon: "water-outline",
      color: "#047857",
    },
    {
      label: "Water",
      value: plan != null ? String(plan.waterLiters) : "—",
      unit: "L",
      icon: "water",
      color: accentTeal,
    },
  ];
}
