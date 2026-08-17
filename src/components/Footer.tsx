import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const explore = [
    { href: `/${lang}/about`, label: dict.footer.aboutUs },
    { href: `/${lang}/curriculum`, label: dict.nav.curriculum },
    { href: `/${lang}/gallery`, label: dict.nav.gallery },
    { href: `/${lang}/calendar`, label: dict.nav.calendar },
    { href: `/${lang}/trekking`, label: dict.footer.trekking },
    { href: `/${lang}/volunteer`, label: dict.nav.volunteer },
    { href: `/${lang}/team`, label: dict.footer.ourTeam },
    { href: `/${lang}/support`, label: dict.nav.support },
  ];

  return (
    <footer className="grain relative overflow-hidden bg-primary-950 text-primary-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 15% 0%, rgba(246,165,36,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={`${dict.meta.schoolName} logo`}
                width={44}
                height={44}
                className="h-11 w-11 rounded-full bg-white object-contain p-1"
              />
              <span className="font-display text-lg font-semibold leading-tight text-white">
                {dict.meta.schoolName}
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-primary-100/70">
              {dict.footer.tagline}
            </p>
            <p className="mt-5 border-l-2 border-accent-400/50 pl-4 font-display text-sm italic text-accent-200/90">
              {dict.about.motto}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {dict.footer.explore}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-primary-100/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {dict.footer.contact}
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm text-primary-100/70">
              <li>{dict.footer.address1}</li>
              <li>{dict.footer.address2}</li>
              <li>
                <a
                  href="mailto:manjushreeschool2024@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  manjushreeschool2024@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+9779860739933"
                  className="transition-colors hover:text-white"
                >
                  +977 986-0739933
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-white">
              {dict.footer.supportUs}
            </h3>
            <p className="mt-5 text-sm leading-6 text-primary-100/70">
              {dict.footer.supportUsText}
            </p>
            <Link
              href={`/${lang}/volunteer`}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-accent-400 px-5 py-2.5 text-sm font-semibold text-primary-950 transition hover:bg-accent-300"
            >
              {dict.footer.becomeVolunteer}
            </Link>
            <Link
              href={`/${lang}/support`}
              className="group mt-4 flex items-center gap-1.5 text-sm font-semibold text-white"
            >
              {dict.footer.supportBuildingLink}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-6 py-6 text-center text-xs text-primary-100/50">
        © {new Date().getFullYear()} {dict.meta.schoolName}. {dict.footer.rights}
      </div>
    </footer>
  );
}
