import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Add a new locale here to enable it across the site.
  // Steps to add a locale:
  //   1. Add its code to `locales` below.
  //   2. Add a display name to `localeNames`.
  //   3. Create `messages/<code>.json` mirroring `messages/en.json`.
  locales: ["en", "pt-BR", "fr", "de", "zh-CN", "fil", "ja", "es", "ko"] as const,
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português (Brasil)",
  fr: "Français",
  de: "Deutsch",
  "zh-CN": "简体中文",
  fil: "Filipino",
  ja: "日本語",
  es: "Español",
  ko: "한국어",
};
