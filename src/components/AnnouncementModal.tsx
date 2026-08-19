"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Announcement } from "@/lib/announcement";
import type { Locale } from "@/lib/locales";

const DISMISSED_KEY = "dismissedAnnouncementId";

/** Fired by the navbar's bell button to reopen the current announcement on
 *  demand, bypassing the dismissed check below — an explicit "show me that
 *  again" request shouldn't be blocked by an earlier dismissal. */
export const REOPEN_ANNOUNCEMENT_EVENT = "open-announcement";

/** Rendered site-wide (from the root layout) so the navbar bell can reopen
 *  it from any page, but only auto-opens itself on the homepage.
 *
 *  Dismissal is keyed to the announcement's own id in localStorage — a
 *  visitor who dismisses one stays dismissed for it, but the moment the
 *  school publishes a new announcement (a new id), it shows again
 *  automatically for everyone, including people who dismissed an earlier
 *  one. Starts closed and only opens in an effect so server and first
 *  client render always agree, since localStorage isn't available during
 *  SSR. */
export default function AnnouncementModal({
  announcement,
  lang,
}: {
  announcement: Announcement | null;
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === `/${lang}`;

  const close = () => {
    if (announcement) localStorage.setItem(DISMISSED_KEY, announcement.id);
    setOpen(false);
  };

  useEffect(() => {
    if (!announcement || !isHomepage) return;
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    // One-time read of client-only state (localStorage) right after mount,
    // not a subscription — there's nothing to unsubscribe from, so the
    // "subscribe instead" guidance behind this lint rule doesn't apply here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (dismissed !== announcement.id) setOpen(true);
  }, [announcement, isHomepage]);

  useEffect(() => {
    if (!announcement) return;
    const onReopen = () => setOpen(true);
    window.addEventListener(REOPEN_ANNOUNCEMENT_EVENT, onReopen);
    return () => window.removeEventListener(REOPEN_ANNOUNCEMENT_EVENT, onReopen);
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
