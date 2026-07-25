import "server-only";

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string | null;
  description: string | null;
  displayOrder: number;
}

export async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  const apiUrl = process.env.SMS_API_URL;
  const schoolId = process.env.SMS_SCHOOL_ID;
  if (!apiUrl || !schoolId) return [];

  try {
    const res = await fetch(`${apiUrl}/public/gallery/${schoolId}`, {
      next: { tags: ["gallery"] },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}
