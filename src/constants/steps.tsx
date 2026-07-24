import React from "react";
import {
  CameraIcon,
  PlanIcon,
  SensorIcon,
  ProtectionIcon,
} from "../icons";
import type { Category } from "../types";

// Matches the accordion's actual visual order (stepsDetail below) - used to
// resolve each step's "Next" button target.
export const STEP_ORDER: Category[] = [
  "Choose your cameras",
  "Choose your plan",
  "Choose your sensors",
  "Add extra protection",
];

// Category order for the review panel's groups only. Kept separate from
// STEP_ORDER so the summary can list Plan last regardless of where it falls
// in the builder's accordion order.
export const REVIEW_ORDER: Category[] = [
  "Choose your cameras",
  "Choose your sensors",
  "Add extra protection",
  "Choose your plan",
];

export const stepsDetail: { title: Category; icon: React.ReactNode; sIcon: React.ReactNode }[] = [
  { title: "Choose your cameras", icon: <CameraIcon />, sIcon: <CameraIcon size={20} /> },
  { title: "Choose your plan", icon: <PlanIcon />, sIcon: <PlanIcon size={20} /> },
  { title: "Choose your sensors", icon: <SensorIcon />, sIcon: <SensorIcon size={20} /> },
  { title: "Add extra protection", icon: <ProtectionIcon />, sIcon: <ProtectionIcon size={20} /> },
];

export const categoryLabel: Record<Category, string> = {
  "Choose your cameras": "Cameras",
  "Choose your plan": "Plan",
  "Choose your sensors": "Sensors",
  "Add extra protection": "Accessories",
};