import NepaliDate, { dateConfigMap } from "nepali-date-converter";

// Order matches NepaliDate's 0-indexed getMonth()/constructor month index.
const BS_MONTH_KEYS = [
  "Baisakh", "Jestha", "Asar", "Shrawan", "Bhadra", "Aswin",
  "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra",
] as const;

/**
 * Days in a BS month, read from the library's own data table.
 *
 * Deliberately not using "probe by constructing NepaliDate(year, month, day)
 * and see if it throws" — it never throws for an out-of-range day, it just
 * silently rolls into the next month, which always yields 32.
 */
export function daysInBsMonth(year: number, monthIndex0: number): number {
  const map = dateConfigMap[String(year) as keyof typeof dateConfigMap] as
    | Record<string, number>
    | undefined;
  return map?.[BS_MONTH_KEYS[monthIndex0]] ?? 30;
}

export function firstWeekdayOfBsMonth(year: number, monthIndex0: number): number {
  return new NepaliDate(year, monthIndex0, 1).getDay();
}

export function bsToAdDate(year: number, monthIndex0: number, day: number): Date {
  return new NepaliDate(year, monthIndex0, day).toJsDate();
}

export function todayBs(): { year: number; month: number; day: number } {
  const d = new NepaliDate();
  return { year: d.getYear(), month: d.getMonth(), day: d.getDate() };
}

export function formatAdShort(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatAdFull(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
