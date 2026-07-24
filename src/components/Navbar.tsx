"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, localeNames, type Locale } from "@/lib/locales";
import type { Dictionary } from "@/lib/i18n";

function withLocale(pathname: string, lang: Locale) {
  const segments = pathname.split("/");
  segments[1] = lang;
  return segments.join("/") || "/";
}

function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:border-primary-200 hover:text-primary-600"
      >
        <span aria-hidden>🌐</span>
        {localeNames[lang]}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
            {locales.map((locale) => (
              <li key={locale}>
                <Link
                  href={withLocale(pathname, locale)}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm ${
                    locale === lang
                      ? "bg-primary-50 font-semibold text-primary-700"
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

export default function Navbar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/curriculum`, label: dict.nav.curriculum },
    { href: `/${lang}/volunteer`, label: dict.nav.volunteer },
    { href: `/${lang}/team`, label: dict.nav.team },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt={`${dict.meta.schoolName} logo`}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 object-contain"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-primary-900 sm:text-lg">
              {dict.meta.schoolName}
            </span>
            <span className="text-xs font-medium text-gray-500 sm:text-sm">
              {dict.nav.location}
            </span>
          </span>
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    active ? "text-primary-600" : "text-gray-600"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/volunteer`}
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            {dict.nav.getInvolved}
          </Link>
        </div>

        <button
          type="button"
          aria-label={dict.nav.toggleMenu}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{dict.nav.toggleMenu}</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 bg-gray-700" />
            <span className="h-0.5 w-5 bg-gray-700" />
            <span className="h-0.5 w-5 bg-gray-700" />
          </div>
        </button>
      </nav>

      {open && (
        <div className="border-t border-primary-100 px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium ${
                      active
                        ? "bg-primary-50 text-primary-600"
                        : "text-gray-600 hover:bg-primary-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 flex gap-2 px-1">
              {locales.map((locale) => (
                <Link
                  key={locale}
                  href={withLocale(pathname, locale)}
                  onClick={() => setOpen(false)}
                  className={`flex-1 rounded-full border px-3 py-1.5 text-center text-sm font-medium ${
                    locale === lang
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-200 text-gray-600"
                  }`}
                >
                  {localeNames[locale]}
                </Link>
              ))}
            </li>
            <li>
              <Link
                href={`/${lang}/volunteer`}
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {dict.nav.getInvolved}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
