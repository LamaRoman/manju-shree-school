import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Not Found | Manju Shree Primary School",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col items-center justify-center gap-4 bg-white px-6 text-center">
        <span className="text-5xl">🏫</span>
        <h1 className="text-2xl font-bold text-primary-950">Page Not Found</h1>
        <p className="max-w-sm text-gray-600">
          The page you are looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/en"
          className="mt-2 rounded-full bg-accent-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-600"
        >
          Go to Homepage
        </Link>
      </body>
    </html>
  );
}
