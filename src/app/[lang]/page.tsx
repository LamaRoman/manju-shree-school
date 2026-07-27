import Link from "next/link";
import Image from "next/image";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const galleryMeta = [
  { key: "assembly", photo: "/photos/school-assembly.jpeg" },
  { key: "newBackpacks", photo: "/photos/backpack-distribution.jpeg" },
  { key: "communityCare", photo: "/photos/community-outreach.jpeg" },
] as const;

const quickLinkMeta = [
  { key: "about", href: "about", icon: "🏫" },
  { key: "curriculum", href: "curriculum", icon: "📚" },
  { key: "volunteer", href: "volunteer", icon: "🤝" },
  { key: "team", href: "team", icon: "🎓" },
] as const;

const statMeta = [
  { key: "students", value: "135+" },
  { key: "teachers", value: "12" },
  { key: "years", value: "3" },
  { key: "volunteers", value: "40+" },
] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden">
        <Image
          src="/photos/hero-school-group.jpeg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary-950/60" />
        <div className="relative mx-auto flex min-h-[480px] max-w-6xl flex-col items-center justify-center px-6 pb-40 pt-16 text-center sm:min-h-[560px] lg:min-h-[620px] lg:pb-48">
          <div className="flex flex-col items-center gap-8 px-6 py-10 sm:px-12 sm:py-12">
            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)] sm:text-5xl">
              {dict.home.title}
            </h1>
            <p className="rounded-full border border-accent-300/40 bg-primary-950/40 px-6 py-2 text-base font-semibold italic text-accent-300 backdrop-blur-sm sm:text-lg">
              {dict.about.motto}
            </p>
            <p className="max-w-2xl text-lg leading-8 text-primary-50 [text-shadow:0_2px_8px_rgba(0,0,0,0.55)]">
              {dict.home.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/${locale}/volunteer`}
                className="rounded-full bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
              >
                {dict.home.becomeVolunteer}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="rounded-full border border-white/60 bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm shadow-sm transition-colors hover:bg-white/20"
              >
                {dict.home.learnAboutUs}
              </Link>
            </div>
          </div>
        </div>
        <a
          href="#explore-more"
          aria-label={dict.home.scrollDown}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/80 transition-colors hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      <section id="explore-more" className="border-y border-primary-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {statMeta.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="text-3xl font-extrabold text-primary-700">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">
                {dict.home.stats[stat.key]}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">
            {dict.home.exploreTitle}
          </h2>
          <p className="mt-3 text-gray-600">{dict.home.exploreSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinkMeta.map((link) => (
            <Link
              key={link.key}
              href={`/${locale}/${link.href}`}
              className="group flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{link.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-primary-900 group-hover:text-primary-600">
                {dict.home.quickLinks[link.key].title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {dict.home.quickLinks[link.key].description}
              </p>
              <span className="mt-4 text-sm font-semibold text-primary-600">
                {dict.home.learnMore}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">
              {dict.home.galleryTitle}
            </h2>
            <p className="mt-3 text-gray-600">{dict.home.gallerySubtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {galleryMeta.map(({ key, photo }) => (
              <div
                key={key}
                className="overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={photo}
                    alt={dict.home.gallery[key].title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-primary-900">
                    {dict.home.gallery[key].title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {dict.home.gallery[key].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-primary-100 bg-primary-50">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.support.badge}
          </span>
          <h2 className="max-w-2xl text-3xl font-bold text-primary-950">
            {dict.support.title}
          </h2>
          <p className="max-w-2xl text-gray-600 leading-7">
            {dict.support.visionText}
          </p>
          <Link
            href={`/${locale}/support`}
            className="rounded-full bg-primary-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            {dict.footer.supportBuildingLink}
          </Link>
        </div>
      </section>

      <section className="bg-primary-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            {dict.home.ctaTitle}
          </h2>
          <p className="max-w-2xl text-primary-100">{dict.home.ctaText}</p>
          <Link
            href={`/${locale}/volunteer`}
            className="rounded-full bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
          >
            {dict.home.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
