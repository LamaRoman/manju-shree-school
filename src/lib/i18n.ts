import "server-only";
import type en from "@/dictionaries/en.json";
import type { Locale } from "@/lib/locales";

export { locales, defaultLocale, localeNames, isLocale, type Locale } from "@/lib/locales";

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ne: () => import("@/dictionaries/ne.json").then((m) => m.default),
  zh: () => import("@/dictionaries/zh.json").then((m) => m.default),
  bo: () => import("@/dictionaries/bo.json").then((m) => m.default),
};

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
