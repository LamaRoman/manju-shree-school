"use client";

import { useEffect, useState } from "react";
import type { GalleryGroup } from "@/lib/gallery";

interface GalleryLabels {
  uncategorized: string;
  previous: string;
  next: string;
  close: string;
}

interface OpenPhoto {
  groupIndex: number;
  photoIndex: number;
}

export default function GalleryGrid({
  groups,
  labels,
}: {
  groups: GalleryGroup[];
  labels: GalleryLabels;
}) {
  const [open, setOpen] = useState<OpenPhoto | null>(null);

  const activeGroup = open ? groups[open.groupIndex] : null;
  const activePhoto = activeGroup ? activeGroup.photos[open!.photoIndex] : null;
  const canNavigate = (activeGroup?.photos.length ?? 0) > 1;

  function goPrev() {
    if (!open || !activeGroup) return;
    const count = activeGroup.photos.length;
    setOpen({ ...open, photoIndex: (open.photoIndex - 1 + count) % count });
  }

  function goNext() {
    if (!open || !activeGroup) return;
    const count = activeGroup.photos.length;
    setOpen({ ...open, photoIndex: (open.photoIndex + 1) % count });
  }

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="space-y-12">
      {groups.map((group, groupIndex) => (
        <section key={group.caption ?? "__uncategorized__"}>
          <h2 className="mb-4 text-xl font-bold text-primary-950">
            {group.caption ?? labels.uncategorized}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.photos.map((photo, photoIndex) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setOpen({ groupIndex, photoIndex })}
                className="group cursor-zoom-in overflow-hidden rounded-2xl border border-primary-100 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption || ""}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Always-visible expand hint — hover-only affordances never reach
                      touch/mobile visitors, who are most of this site's audience. */}
                  <div className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary-900/40 text-white backdrop-blur-sm transition-colors group-hover:bg-primary-900/60">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {photo.description && (
                  <div className="p-4">
                    <p className="text-sm leading-6 text-gray-600">{photo.description}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>
      ))}

      {open && activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label={labels.close}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label={labels.previous}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div
            className="flex max-h-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.url}
              alt={activePhoto.caption || ""}
              className="max-h-[80vh] max-w-full rounded-lg object-contain"
            />
            {(activePhoto.caption || activePhoto.description) && (
              <div className="mt-4 text-center text-white">
                {activePhoto.caption && <p className="font-semibold">{activePhoto.caption}</p>}
                {activePhoto.description && (
                  <p className="mt-1 text-sm text-white/80">{activePhoto.description}</p>
                )}
              </div>
            )}
          </div>

          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label={labels.next}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
