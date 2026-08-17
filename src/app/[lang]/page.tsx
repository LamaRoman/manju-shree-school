import Link from "next/link";
import Image from "next/image";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import {
  ArrowLink,
  Eyebrow,
  IconTile,
  SectionHeading,
  buttonOnDark,
  buttonPrimary,
  buttonSecondary,
} from "@/components/ui";
import Reveal from "@/components/Reveal";

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
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <Image
          src="/photos/hero-school-group.jpeg"
          alt=""
          fill
          priority
          className="-z-10 object-cover"
          sizes="100vw"
        />
        {/* A graded garnet wash rather than a flat black scrim: it keeps the
            children's faces readable in the middle of the frame while still
            anchoring the type top and bottom. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(46,15,19,0.62) 0%, rgba(46,15,19,0.38) 42%, rgba(46,15,19,0.55) 78%, rgba(46,15,19,0.78) 100%)",
          }}
        />

        <Reveal className="mx-auto flex min-h-[560px] max-w-4xl flex-col items-center justify-center px-6 pb-32 pt-20 text-center sm:min-h-[620px] sm:pb-36 lg:min-h-[680px]">
          <Eyebrow tone="dark">{dict.nav.location}</Eyebrow>

          <h1 className="mt-7 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
            {dict.home.title}
          </h1>

          <p className="mt-8 border-y border-accent-300/30 px-6 py-3 font-display text-lg italic text-accent-200 sm:text-xl">
            {dict.about.motto}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${locale}/volunteer`} className={buttonPrimary}>
              {dict.home.becomeVolunteer}
            </Link>
            <Link href={`/${locale}/about`} className={buttonOnDark}>
              {dict.home.learnAboutUs}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats lifted onto the seam between the hero and the page. The hero's
          bottom padding is what reserves room for it. */}
      <section id="explore-more" className="relative z-10 -mt-20 px-6">
        <Reveal
          delay={150}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-y-8 rounded-3xl border border-gray-200/80 bg-white px-6 py-9 shadow-lift sm:grid-cols-4 sm:px-10"
        >
          {statMeta.map((stat, i) => (
            <div
              key={stat.key}
              /* Divider on every item that doesn't start a row: at two
                 columns that's 1 and 3, at four columns it's 1, 2 and 3. */
              className={`border-gray-200 text-center ${
                i % 2 === 1 ? "border-l" : ""
              } ${i === 2 ? "sm:border-l" : ""}`}
            >
              <div className="font-display text-4xl font-semibold text-primary-700">
                {stat.value}
              </div>
              <div className="mt-1.5 text-sm font-medium text-gray-500">
                {dict.home.stats[stat.key]}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Explore                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.home.exploreTitle}
          subtitle={dict.home.exploreSubtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinkMeta.map((link, i) => (
            <Reveal key={link.key} delay={i * 80}>
              <Link
                href={`/${locale}/${link.href}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-soft transition duration-200 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-accent-400 transition-transform duration-300 group-hover:scale-x-100"
                />
                <IconTile icon={link.icon} />
                <h3 className="mt-5 font-display text-lg font-semibold text-primary-950">
                  {dict.home.quickLinks[link.key].title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                  {dict.home.quickLinks[link.key].description}
                </p>
                <span className="mt-5">
                  <ArrowLink label={dict.home.learnMore} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Life at the school                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="border-y border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title={dict.home.galleryTitle}
              subtitle={dict.home.gallerySubtitle}
              align="left"
            />
            <Link
              href={`/${locale}/gallery`}
              className="group shrink-0 self-start pb-1 sm:self-auto"
            >
              <ArrowLink label={dict.gallery.title} />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryMeta.map(({ key, photo }, i) => (
              <Reveal key={key} delay={i * 80}>
                <figure className="group h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-soft transition duration-200 hover:shadow-lift">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={photo}
                      alt={dict.home.gallery[key].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                  </div>
                  <figcaption className="p-6">
                    <h3 className="font-display text-lg font-semibold text-primary-950">
                      {dict.home.gallery[key].title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {dict.home.gallery[key].description}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* The building fund — given a photo so it reads as a real place     */}
      {/* rather than another block of centered text.                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/photos/school-building.jpeg"
                alt={dict.about.buildingCaption}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-3xl bg-accent-200/60"
            />
          </Reveal>

          <Reveal delay={150}>
            <Eyebrow>{dict.support.badge}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-primary-950 sm:text-4xl">
              {dict.support.title}
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              {dict.support.visionText}
            </p>
            <Link
              href={`/${locale}/support`}
              className={`${buttonSecondary} mt-8`}
            >
              {dict.footer.supportBuildingLink}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing call to action                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="grain relative overflow-hidden bg-primary-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 50% 0%, rgba(246,165,36,0.14) 0%, transparent 70%)",
          }}
        />
        <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {dict.home.ctaTitle}
          </h2>
          <p className="max-w-xl leading-7 text-primary-100/80">
            {dict.home.ctaText}
          </p>
          <Link href={`/${locale}/volunteer`} className={buttonPrimary}>
            {dict.home.ctaButton}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
