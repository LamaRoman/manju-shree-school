import "server-only";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  /** Bikram Sambat date, "YYYY/MM/DD" */
  date: string;
  type: "EVENT" | "HOLIDAY";
  isMaster: boolean;
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const apiUrl = process.env.SMS_API_URL;
  const schoolId = process.env.SMS_SCHOOL_ID;
  if (!apiUrl || !schoolId) return [];

  try {
    const res = await fetch(`${apiUrl}/public/calendar/${schoolId}`, {
      next: { tags: ["calendar"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export interface CalendarMonthGroup {
  year: string;
  /** 1-indexed BS month, matches dict.calendar.months[month - 1] */
  month: number;
  events: CalendarEvent[];
}

/**
 * Groups events by their BS year/month, in the order months first appear.
 * The API already returns events sorted by date, so this just buckets them
 * without re-sorting.
 */
export function groupEventsByMonth(events: CalendarEvent[]): CalendarMonthGroup[] {
  const order: string[] = [];
  const byKey = new Map<string, CalendarMonthGroup>();

  for (const event of events) {
    const [year, month] = event.date.split("/");
    const key = `${year}/${month}`;
    if (!byKey.has(key)) {
      byKey.set(key, { year, month: Number(month), events: [] });
      order.push(key);
    }
    byKey.get(key)!.events.push(event);
  }

  return order.map((key) => byKey.get(key)!);
}
