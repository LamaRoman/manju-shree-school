"use client";

import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/announcement";

/** Homepage popup for the current announcement, if any. Shows on every
 *  homepage load — closing it only hides it for that page view, it's back
 *  the next time this page is loaded or refreshed. */
export default function AnnouncementModal({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  const [open, setOpen] = useState(!!announcement);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!announcement || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950/60 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Announcement"
        className="relative w-full max-w-sm sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close announcement"
          className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-lg font-semibold text-primary-950 shadow-lift transition hover:bg-primary-50"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element -- external SMS-hosted URL (S3 or base64), not a local /public asset */}
        <img
          src={announcement.imageUrl}
          alt="Announcement"
          className="max-h-[85vh] w-full rounded-2xl object-contain shadow-lift"
        />
      </div>
    </div>
  );
}
