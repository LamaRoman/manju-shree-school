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
