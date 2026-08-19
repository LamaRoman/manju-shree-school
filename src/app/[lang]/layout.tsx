import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Noto_Serif_Tibetan,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialDock from "@/components/SocialDock";
import AnnouncementModal from "@/components/AnnouncementModal";
import { getActiveAnnouncement } from "@/lib/announcement";
import {
  getDictionary,
  isLocale,
  locales,
  defaultLocale,
  type Locale,
} from "@/lib/i18n";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for headings. Fraunces is a warm, slightly old-style serif —
// it gives the school the institutional weight a geometric sans can't, while
// staying friendly enough for a primary school. Variable, so the whole weight
// range costs one file.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

// Geist has no Tibetan glyphs — without this, Tibetan text renders as blank
// boxes. Applied only via the html[lang="bo"] rule in globals.css, and not
// preloaded, so non-Tibetan pages never fetch it. Google Fonts only ships a
// Serif cut for Tibetan (no Sans variant), so this is used for both body and
// heading text on Tibetan pages.
const notoSerifTibetan = Noto_Serif_Tibetan({
  variable: "--font-tibetan",
  subsets: ["tibetan"],
  weight: ["400", "700"],
  preload: false,
});

// Same reasoning for Nepali: Devanagari fell back to whatever the device had,
// so the site looked different on every phone. Not preloaded — only ne/ pages
// pay for it.
const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.schoolName,
    description: dict.meta.siteDescription,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const announcement = await getActiveAnnouncement();

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${notoSerifTibetan.variable} ${notoSansDevanagari.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AnnouncementModal announcement={announcement} lang={lang} />
        <Navbar lang={lang} dict={dict} hasAnnouncement={!!announcement} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <SocialDock
          labels={{
            whatsapp: dict.nav.whatsapp,
            facebook: dict.nav.facebook,
            instagram: dict.nav.instagram,
          }}
        />
      </body>
    </html>
  );
}
