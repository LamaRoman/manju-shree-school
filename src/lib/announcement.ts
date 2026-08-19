import "server-only";

export interface Announcement {
  id: string;
  imageUrl: string;
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  const apiUrl = process.env.SMS_API_URL;
  const schoolId = process.env.SMS_SCHOOL_ID;
  if (!apiUrl || !schoolId) return null;

  try {
    const res = await fetch(`${apiUrl}/public/announcements/${schoolId}`, {
      next: { tags: ["announcement"] },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
