"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/team", label: "Team" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Manju Shree Primary School logo"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
            priority
          />
          <span className="text-base font-bold leading-tight text-primary-900 sm:text-lg">
            Manju Shree Primary School
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

        <Link
          href="/volunteer"
          className="hidden rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 md:inline-block"
        >
          Get Involved
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Toggle menu</span>
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
            <li>
              <Link
                href="/volunteer"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-accent-500 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Get Involved
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
