"use client";

import { analytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

/**
 * Type-safe event params object.
 * Firebase Analytics accepts: string, number, boolean.
 */
export type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>;

/**
 * Type-safe trackEvent function with no "any".
 */
export function trackEvent(
  eventName: string,
  params?: AnalyticsEventParams
): void {
  if (typeof window === "undefined") return;
  if (!analytics) return;

  logEvent(analytics, eventName, params ?? {});
}