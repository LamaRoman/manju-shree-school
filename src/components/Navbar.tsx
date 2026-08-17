"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/i18n";

function withLocale(pathname: string, lang: Locale) {
  const segments = pathname.split("/");
  segments[1] = lang;
  return segments.join("/") || "/";
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-4 w-4 fill-none stroke-current stroke-[1.6]"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  );
}

function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-primary-200 hover:text-primary-700"
      >
        <GlobeIcon />
        {localeNames[lang]}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul
            role="menu"
            className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lift"
          >
            {locales.map((locale) => (
              <li key={locale} role="none">
                <Link
                  role="menuitem"
                  href={withLocale(pathname, locale)}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-3.5 py-2 text-sm transition-colors ${
                    locale === lang
                      ? "bg-primary-50 font-semibold text-primary-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {localeNames[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Navbar({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header sits flush against the page at rest and only earns its border
  // and shadow once content is passing underneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation. Adjusting during render rather than
  // in an effect avoids the extra commit with the stale-open sheet.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // `promoted` marks the item that also exists as the header CTA. It hides
  // itself once the button appears, so Volunteer is always reachable exactly
  // once at every width.
  const links = [
    { href: `/${lang}`, label: dict.nav.home, promoted: false },
    { href: `/${lang}/about`, label: dict.nav.about, promoted: false },
    { href: `/${lang}/curriculum`, label: dict.nav.curriculum, promoted: false },
    { href: `/${lang}/gallery`, label: dict.nav.gallery, promoted: false },
    { href: `/${lang}/calendar`, label: dict.nav.calendar, promoted: false },
    { href: `/${lang}/trekking`, label: dict.nav.trekking, promoted: false },
    { href: `/${lang}/team`, label: dict.nav.team, promoted: false },
    { href: `/${lang}/volunteer`, label: dict.nav.volunteer, promoted: true },
    { href: `/${lang}/support`, label: dict.nav.support, promoted: false },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "border-b border-gray-200/80 shadow-soft" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 sm:px-6">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt={`${dict.meta.schoolName} logo`}
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[0.95rem] font-semibold tracking-tight text-primary-950 sm:text-lg">
              {dict.meta.schoolName}
            </span>
            <span className="text-[0.68rem] font-medium tracking-wide text-gray-500 sm:text-xs">
              {dict.nav.location}
            </span>
          </span>
        </Link>

        {/* Nine items never fit at the old md breakpoint — they wrapped or
            squeezed. The desktop row now starts at lg and the rest of the
            range gets the sheet. */}
        <ul className="hidden flex-1 justify-center gap-0.5 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className={link.promoted ? "xl:hidden" : undefined}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    active
                      ? "bg-primary-50 text-primary-800"
                      : "text-gray-600 hover:bg-gray-100/70 hover:text-primary-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <div className="hidden lg:block">
            <LanguageSwitcher lang={lang} />
          </div>

          <Link
            href={`/${lang}/volunteer`}
            className="hidden rounded-full bg-accent-400 px-5 py-2 text-sm font-semibold text-primary-950 shadow-soft transition hover:bg-accent-300 hover:shadow-lift xl:inline-flex"
          >
            {dict.nav.volunteer}
          </Link>

          <button
            type="button"
            aria-label={dict.nav.toggleMenu}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/70 text-gray-700 transition-colors hover:border-primary-200 hover:text-primary-700 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{dict.nav.toggleMenu}</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-5 w-5 fill-none stroke-current stroke-[1.8]"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-gray-200/80 bg-paper px-5 pb-10 pt-4 shadow-lift lg:hidden">
          <ul className="flex flex-col gap-1">
            {/* The promoted item is rendered as the button below instead. */}
            {links.filter((link) => !link.promoted).map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                      active
                        ? "bg-primary-50 text-primary-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-accent-400"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={`/${lang}/volunteer`}
            className="mt-5 flex w-full items-center justify-center rounded-full bg-accent-400 px-6 py-3.5 text-base font-semibold text-primary-950 shadow-soft"
          >
            {dict.nav.volunteer}
          </Link>

          <div className="mt-8">
            <p className="px-1 text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">
              {dict.nav.languageLabel}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {locales.map((locale) => (
                <Link
                  key={locale}
                  href={withLocale(pathname, locale)}
                  className={`rounded-full border px-4 py-2.5 text-center text-sm font-medium transition-colors ${
                    locale === lang
                      ? "border-primary-300 bg-primary-50 text-primary-800"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  {localeNames[locale]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
