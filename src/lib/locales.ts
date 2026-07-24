export const locales = ["en", "ne", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ne: "नेपाली",
  zh: "中文",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
