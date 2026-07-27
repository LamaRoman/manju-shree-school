import { INSTAGRAM_URL } from "@/lib/instagram";

export default function InstagramButton({ label }: { label: string }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-[172px] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-none stroke-white stroke-2">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.3" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="white" stroke="none" />
      </svg>
    </a>
  );
}
