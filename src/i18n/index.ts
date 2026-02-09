/**
 * i18n (Internationalization) module for OpenClaw
 * Provides translations for multiple languages
 */

import enTranslations from "./locales/en.json";
import thTranslations from "./locales/th.json";

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

const translations: Record<Locale, Translations> = {
  en: enTranslations,
  th: thTranslations,
  "zh-CN": enTranslations, // Use English as fallback for Chinese
};

let currentLocale: Locale = "en";

/**
 * Set the current locale
 */
export function setLocale(locale: Locale): void {
  if (translations[locale]) {
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
  let value: any = translations[currentLocale];

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations.en;
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
  return translations[currentLocale];
}

/**
 * Check if a locale is supported
 */
export function isLocaleSupported(locale: string): boolean {
  return locale in translations;
}

/**
 * Get list of supported locales
 */
export function getSupportedLocales(): Locale[] {
  return Object.keys(translations) as Locale[];
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
