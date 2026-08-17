import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Not Found | Manju Shree Primary School",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col items-center justify-center px-6 text-center">
        <span className="font-display text-7xl font-semibold text-primary-200">
          404
        </span>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-primary-950">
          Page Not Found
        </h1>
        <p className="mt-4 max-w-sm leading-7 text-gray-600">
          The page you are looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent-400 px-7 py-3 text-base font-semibold text-primary-950 shadow-soft transition hover:bg-accent-300 hover:shadow-lift"
        >
          Go to Homepage
        </Link>
      </body>
    </html>
  );
}
