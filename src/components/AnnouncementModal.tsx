"use client";

import { useEffect, useState } from "react";
import type { Announcement } from "@/lib/announcement";

const DISMISSED_KEY = "dismissedAnnouncementId";

/** Homepage popup for the current announcement, if any. Dismissal is keyed
 *  to the announcement's own id in localStorage — a visitor who dismisses
 *  one stays dismissed for it, but the moment the school publishes a new
 *  announcement (a new id), it shows again automatically for everyone,
 *  including people who dismissed an earlier one. Starts closed and only
 *  opens in an effect so server and first client render always agree,
 *  since localStorage isn't available during SSR. */
export default function AnnouncementModal({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  const [open, setOpen] = useState(false);

  const close = () => {
    if (announcement) localStorage.setItem(DISMISSED_KEY, announcement.id);
    setOpen(false);
  };

  useEffect(() => {
    if (!announcement) return;
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    // One-time read of client-only state (localStorage) right after mount,
    // not a subscription — there's nothing to unsubscribe from, so the
    // "subscribe instead" guidance behind this lint rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dismissed !== announcement.id) setOpen(true);
  }, [announcement]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!announcement || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary-950/60 p-4 backdrop-blur-sm"
      onClick={close}
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
          onClick={close}
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
