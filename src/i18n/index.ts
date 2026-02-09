/**
 * OpenClaw i18n (internationalization) module
 *
 * Provides translation functions and locale detection for OpenClaw.
 * Supports English (en) and Thai (th) locales.
 *
 * @example
 * import { t, setLocale } from './i18n';
 *
 * setLocale('th');
 * console.log(t('common.welcome')); // "ยินดีต้อนรับสู่ OpenClaw"
 */

import type { Locale, Translations } from "./types.js";
import en from "./locales/en.json" with { type: "json" };
import th from "./locales/th.json" with { type: "json" };
import { detectSystemLocale, getNestedValue, interpolate, isValidLocale } from "./utils.js";

/**
 * All available translations
 */
export const locales: Record<Locale, Translations> = {
  en: en as Translations,
  th: th as Translations,
};

/**
 * Current active locale
 */
let currentLocale: Locale = "en";

/**
 * Get the current active locale
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Set the active locale
 */
export function setLocale(locale: Locale | string): void {
  if (!isValidLocale(locale)) {
    console.warn(`Invalid locale: ${String(locale)}. Falling back to 'en'.`);
    currentLocale = "en";
    return;
  }
  currentLocale = locale;
}

/**
 * Auto-detect and set locale from system environment
 */
export function detectLocale(): Locale {
  const detected = detectSystemLocale();
  setLocale(detected);
  return detected;
}

/**
 * Translate a key to the current locale.
 *
 * @param key - Translation key in dot notation (e.g., 'common.welcome')
 * @param params - Optional parameters for interpolation
 * @param locale - Optional locale override (defaults to current locale)
 * @returns Translated string, or the key with [Missing] prefix if not found
 *
 * @example
 * t('common.welcome') // "Welcome to OpenClaw" (en) or "ยินดีต้อนรับสู่ OpenClaw" (th)
 * t('cli.gateway_started', { port: 18789 }) // "Gateway started on port 18789"
 */
export function t(key: string, params?: Record<string, string | number>, locale?: Locale): string {
  const targetLocale = locale || currentLocale;
  const translations = locales[targetLocale];

  if (!translations) {
    console.warn(`No translations found for locale: ${targetLocale}`);
    return `[Missing: ${key}]`;
  }

  const value = getNestedValue(translations, key);

  if (!value) {
    // Fallback to English if key not found in target locale
    if (targetLocale !== "en") {
      const fallbackValue = getNestedValue(locales.en, key);
      if (fallbackValue) {
        return interpolate(fallbackValue, params);
      }
    }
    return `[Missing: ${key}]`;
  }

  return interpolate(value, params);
}

// Export types and utils
export type { Locale, Translations } from "./types.js";
export { isValidLocale } from "./utils.js";
