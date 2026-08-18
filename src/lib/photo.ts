import { existsSync } from "node:fs";
import path from "node:path";

/** Photos are dropped into public/photos by hand as people send them in, so a
 *  configured path may not exist yet. Checking at render time means a missing
 *  file falls back to initials instead of showing a broken image. */
export function resolvePhoto(photo?: string) {
  if (!photo) return undefined;
  return existsSync(path.join(process.cwd(), "public", photo))
    ? photo
    : undefined;
}
