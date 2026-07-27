import { FACEBOOK_URL } from "@/lib/facebook";

export default function FacebookButton({ label }: { label: string }) {
  return (
    <a
      href={FACEBOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-white">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.916 3.777-3.916 1.094 0 2.238.197 2.238.197v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
      </svg>
    </a>
  );
}
