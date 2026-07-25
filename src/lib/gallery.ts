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

export interface GalleryGroup {
  /** null means the photo has no caption — grouped under a generic label. */
  caption: string | null;
  photos: GalleryPhoto[];
}

/**
 * Groups photos by their caption, preserving each group's position by the
 * order its first photo appears in (the API already returns photos sorted by
 * displayOrder). Photos with no caption share one group — there's no
 * admin-typed label to show per photo, so pooling them is the only option.
 * Every group that DOES have a caption keeps its own row, even with one photo,
 * since a caption with nothing to show it defeats the point of the caption.
 */
export function groupPhotosByCaption(photos: GalleryPhoto[]): GalleryGroup[] {
  const order: (string | null)[] = [];
  const byCaption = new Map<string | null, GalleryPhoto[]>();

  for (const photo of photos) {
    const key = photo.caption?.trim() || null;
    if (!byCaption.has(key)) {
      byCaption.set(key, []);
      order.push(key);
    }
    byCaption.get(key)!.push(photo);
  }

  return order.map((caption) => ({ caption, photos: byCaption.get(caption)! }));
}
