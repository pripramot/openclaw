/**
 * i18n utility functions for OpenClaw
 */

import type { Locale } from "./types.js";

/**
 * Interpolate parameters in a translation string.
 * Replaces {{key}} with the value from params.
 *
 * @example
 * interpolate("Hello {{name}}", { name: "World" }) // "Hello World"
 */
export function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) {
    return text;
  }

  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : match;
  });
}

/**
 * Get nested value from object using dot notation.
 *
 * @example
 * getNestedValue({ common: { welcome: "Hello" } }, "common.welcome") // "Hello"
 */
export function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current && current !== null) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === "string" ? current : undefined;
}

/**
 * Detect system locale from environment variables.
 * Falls back to 'en' if no locale can be detected.
 */
export function detectSystemLocale(): Locale {
  // Node.js environment variables
  const lang =
    process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES;

  if (!lang) {
    return "en";
  }

  // Check if Thai locale
  if (lang.toLowerCase().startsWith("th")) {
    return "th";
  }

  // Default to English
  return "en";
}

/**
 * Validate if a string is a supported locale.
 */
export function isValidLocale(locale: string): locale is Locale {
  return locale === "en" || locale === "th";
}
