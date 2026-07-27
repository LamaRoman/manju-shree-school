import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Tibetan } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FacebookButton from "@/components/FacebookButton";
import InstagramButton from "@/components/InstagramButton";
import { getDictionary, isLocale, locales, defaultLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifTibetan.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
        <WhatsAppButton label={dict.nav.whatsapp} />
        <FacebookButton label={dict.nav.facebook} />
        <InstagramButton label={dict.nav.instagram} />
      </body>
    </html>
  );
}
