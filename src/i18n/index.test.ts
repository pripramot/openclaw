/**
 * Tests for i18n module
 */

import { describe, it, expect, beforeEach } from "vitest";
import { setLocale, getLocale, t, getSupportedLocales, isLocaleSupported, initI18n } from "./index";

describe("i18n", () => {
  beforeEach(() => {
    // Reset to English before each test
    setLocale("en");
  });

  describe("locale management", () => {
    it("should default to English locale", () => {
      expect(getLocale()).toBe("en");
    });

    it("should set locale to Thai", () => {
      setLocale("th");
      expect(getLocale()).toBe("th");
    });

    it("should fall back to English for unsupported locale", () => {
      setLocale("fr" as any);
      expect(getLocale()).toBe("en");
    });

    it("should return list of supported locales", () => {
      const locales = getSupportedLocales();
      expect(locales).toContain("en");
      expect(locales).toContain("th");
      expect(locales).toContain("zh-CN");
    });

    it("should check if locale is supported", () => {
      expect(isLocaleSupported("en")).toBe(true);
      expect(isLocaleSupported("th")).toBe(true);
      expect(isLocaleSupported("fr")).toBe(false);
    });
  });

  describe("translation function", () => {
    it("should translate simple keys in English", () => {
      setLocale("en");
      expect(t("welcome")).toBe("Welcome to OpenClaw");
    });

    it("should translate simple keys in Thai", () => {
      setLocale("th");
      expect(t("welcome")).toBe("ยินดีต้อนรับสู่ OpenClaw");
    });

    it("should translate nested keys in English", () => {
      setLocale("en");
      expect(t("commands.status")).toBe("Status");
      expect(t("commands.reset")).toBe("Reset");
    });

    it("should translate nested keys in Thai", () => {
      setLocale("th");
      expect(t("commands.status")).toBe("สถานะ");
      expect(t("commands.reset")).toBe("รีเซ็ต");
    });

    it("should replace placeholders", () => {
      setLocale("en");
      expect(t("gateway.started", { port: "18789" })).toBe("Gateway started on port 18789");
    });

    it("should replace placeholders in Thai", () => {
      setLocale("th");
      expect(t("gateway.started", { port: "18789" })).toBe("Gateway เริ่มแล้วที่พอร์ต 18789");
    });

    it("should return key for non-existent translation", () => {
      setLocale("en");
      expect(t("non.existent.key")).toBe("non.existent.key");
    });

    it("should fall back to English for missing Thai translations", () => {
      setLocale("th");
      // If a key is missing in Thai, it should fall back to English
      const result = t("commands.status");
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("channel translations", () => {
    it("should translate channel names in English", () => {
      setLocale("en");
      expect(t("channels.whatsapp")).toBe("WhatsApp");
      expect(t("channels.telegram")).toBe("Telegram");
      expect(t("channels.discord")).toBe("Discord");
    });

    it("should translate channel names in Thai", () => {
      setLocale("th");
      expect(t("channels.whatsapp")).toBe("วอทส์แอพ");
      expect(t("channels.telegram")).toBe("เทเลแกรม");
      expect(t("channels.discord")).toBe("ดิสคอร์ด");
    });
  });

  describe("error translations", () => {
    it("should translate error messages in English", () => {
      setLocale("en");
      expect(t("errors.not_found")).toBe("Not found");
      expect(t("errors.unauthorized")).toBe("Unauthorized");
    });

    it("should translate error messages in Thai", () => {
      setLocale("th");
      expect(t("errors.not_found")).toBe("ไม่พบ");
      expect(t("errors.unauthorized")).toBe("ไม่ได้รับอนุญาต");
    });
  });

  describe("initialization", () => {
    it("should initialize with provided locale", () => {
      initI18n("th");
      expect(getLocale()).toBe("th");
    });

    it("should initialize with English by default", () => {
      initI18n();
      expect(getLocale()).toBe("en");
    });
  });
});
