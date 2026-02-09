/**
 * i18n (Internationalization) module for OpenClaw
 * Provides translations for multiple languages
 */

import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load translations
function loadTranslations(locale: string): Translations {
  try {
    const filePath = join(__dirname, "locales", `${locale}.json`);
    const content = readFileSync(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.warn(`Failed to load locale '${locale}':`, error);
    // Fallback to English
    if (locale !== "en") {
      return loadTranslations("en");
    }
    throw error;
  }
}

export type Locale = "en" | "th" | "zh-CN";

export interface Translations {
  welcome: string;
  commands: Record<string, string>;
  messages: Record<string, string>;
  channels: Record<string, string>;
  errors: Record<string, string>;
  status: Record<string, string>;
  pairing: Record<string, string>;
  gateway: Record<string, string>;
}

const translations: Partial<Record<Locale, Translations>> = {};

// Lazy load translations
function getTranslationsForLocale(locale: Locale): Translations {
  if (!translations[locale]) {
    translations[locale] = loadTranslations(locale);
  }
  return translations[locale]!;
}

let currentLocale: Locale = "en";

/**
 * Set the current locale
 */
export function setLocale(locale: Locale): void {
  if (isLocaleSupported(locale)) {
    currentLocale = locale;
  } else {
    console.warn(`Locale '${locale}' not found, falling back to 'en'`);
    currentLocale = "en";
  }
}

/**
 * Get the current locale
 */
export function getLocale(): Locale {
  return currentLocale;
}

/**
 * Get translation for a key
 * Supports nested keys using dot notation (e.g., "commands.status")
 */
export function t(key: string, replacements?: Record<string, string>): string {
  const keys = key.split(".");
  let value: any = getTranslationsForLocale(currentLocale);

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = getTranslationsForLocale("en");
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return key itself if not found
        }
      }
      break;
    }
  }

  if (typeof value !== "string") {
    return key;
  }

  // Replace placeholders
  if (replacements) {
    for (const [placeholder, replacement] of Object.entries(replacements)) {
      value = value.replace(`{${placeholder}}`, replacement);
    }
  }

  return value;
}

/**
 * Get all translations for the current locale
 */
export function getTranslations(): Translations {
  return getTranslationsForLocale(currentLocale);
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  const supportedLocales: Locale[] = ["en", "th", "zh-CN"];
  return supportedLocales.includes(locale as Locale);
}

/**
 * Get list of supported locales
 */
export function getSupportedLocales(): Locale[] {
  return ["en", "th", "zh-CN"];
}

/**
 * Initialize i18n with locale from environment or config
 */
export function initI18n(locale?: string): void {
  if (locale) {
    setLocale(locale as Locale);
  } else {
    // Try to detect from environment
    const envLocale = process.env.OPENCLAW_LOCALE || process.env.LANG || "en";
    const detectedLocale = envLocale.split(/[_.-]/)[0];
    
    if (detectedLocale === "th") {
      setLocale("th");
    } else if (detectedLocale === "zh") {
      setLocale("zh-CN");
    } else {
      setLocale("en");
    }
  }
}

// Export default instance
export default {
  t,
  setLocale,
  getLocale,
  getTranslations,
  isLocaleSupported,
  getSupportedLocales,
  initI18n,
};
