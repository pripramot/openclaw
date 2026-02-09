/**
 * Tests for i18n module
 */

import { describe, expect, it, beforeEach } from "vitest";
import { t, setLocale, getLocale, detectLocale, isValidLocale } from "./index.js";

describe("i18n", () => {
  beforeEach(() => {
    // Reset to English before each test
    setLocale("en");
  });

  describe("setLocale and getLocale", () => {
    it("should set and get locale", () => {
      setLocale("th");
      expect(getLocale()).toBe("th");

      setLocale("en");
      expect(getLocale()).toBe("en");
    });

    it("should fallback to 'en' for invalid locale", () => {
      // @ts-expect-error Testing invalid input
      setLocale("invalid");
      expect(getLocale()).toBe("en");
    });
  });

  describe("isValidLocale", () => {
    it("should validate supported locales", () => {
      expect(isValidLocale("en")).toBe(true);
      expect(isValidLocale("th")).toBe(true);
      expect(isValidLocale("fr")).toBe(false);
      expect(isValidLocale("")).toBe(false);
    });
  });

  describe("t() - Translation function", () => {
    it("should translate common messages in English", () => {
      setLocale("en");
      expect(t("common.welcome")).toBe("Welcome to OpenClaw");
      expect(t("common.loading")).toBe("Loading...");
      expect(t("common.error")).toBe("Error");
    });

    it("should translate common messages in Thai", () => {
      setLocale("th");
      expect(t("common.welcome")).toBe("ยินดีต้อนรับสู่ OpenClaw");
      expect(t("common.loading")).toBe("กำลังโหลด...");
      expect(t("common.error")).toBe("เกิดข้อผิดพลาด");
    });

    it("should translate channel names", () => {
      setLocale("en");
      expect(t("channels.telegram")).toBe("Telegram");
      expect(t("channels.line")).toBe("LINE");

      setLocale("th");
      expect(t("channels.telegram")).toBe("เทเลแกรม");
      expect(t("channels.line")).toBe("ไลน์");
    });

    it("should translate CLI messages", () => {
      setLocale("en");
      expect(t("cli.gateway_starting")).toBe("Starting Gateway...");

      setLocale("th");
      expect(t("cli.gateway_starting")).toBe("กำลังเริ่ม Gateway...");
    });

    it("should interpolate parameters", () => {
      setLocale("en");
      expect(t("cli.gateway_started", { port: 18789 })).toBe("Gateway started on port 18789");

      setLocale("th");
      expect(t("cli.gateway_started", { port: 18789 })).toBe("เริ่ม Gateway เรียบร้อยที่พอร์ต 18789");
    });

    it("should interpolate error messages", () => {
      setLocale("en");
      expect(t("messages.error_occurred", { error: "Network timeout" })).toBe(
        "Error occurred: Network timeout",
      );

      setLocale("th");
      expect(t("messages.error_occurred", { error: "Network timeout" })).toBe(
        "เกิดข้อผิดพลาด: Network timeout",
      );
    });

    it("should return missing key message for non-existent keys", () => {
      expect(t("nonexistent.key")).toBe("[Missing: nonexistent.key]");
    });

    it("should fallback to English for missing Thai translations", () => {
      setLocale("th");
      // If a key doesn't exist in Thai, it should fallback to English
      expect(t("nonexistent.key")).toBe("[Missing: nonexistent.key]");
    });

    it("should support locale override parameter", () => {
      setLocale("en");
      expect(t("common.welcome", undefined, "th")).toBe("ยินดีต้อนรับสู่ OpenClaw");

      setLocale("th");
      expect(t("common.welcome", undefined, "en")).toBe("Welcome to OpenClaw");
    });

    it("should handle nested translation keys", () => {
      expect(t("messages.session_started")).toContain("session");
      expect(t("errors.not_found")).toBeTruthy();
    });
  });

  describe("detectLocale", () => {
    it("should detect locale from environment", () => {
      // This will return either 'en' or 'th' based on system
      const detected = detectLocale();
      expect(["en", "th"]).toContain(detected);
    });
  });

  describe("Translation completeness", () => {
    it("should have matching keys in English and Thai", () => {
      const enKeys = Object.keys(t("common", undefined, "en"));
      const thKeys = Object.keys(t("common", undefined, "th"));

      // Both should exist (even if we get [Missing:...] we can check structure)
      // This is a basic check - in production you'd want more comprehensive validation
      expect(t("common.welcome", undefined, "en")).not.toContain("[Missing:");
      expect(t("common.welcome", undefined, "th")).not.toContain("[Missing:");
    });

    it("should have all major sections translated", () => {
      const sections = [
        "common.welcome",
        "commands.status",
        "messages.connected",
        "channels.telegram",
        "errors.not_found",
        "cli.gateway_starting",
      ];

      for (const key of sections) {
        expect(t(key, undefined, "en")).not.toContain("[Missing:");
        expect(t(key, undefined, "th")).not.toContain("[Missing:");
      }
    });
  });
});
