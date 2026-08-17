import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, IconTile, PageHero, SectionHeading } from "@/components/ui";

const milestoneMeta = [
  "founded",
  "campus",
  "language",
  "programs",
  "today",
] as const;
const goalMeta = [
  { key: "quality", icon: "🎯" },
  { key: "language", icon: "🗣️" },
  { key: "confidence", icon: "🌱" },
  { key: "community", icon: "🏘️" },
] as const;
const valueMeta = [
  { key: "respect", icon: "🤲" },
  { key: "integrity", icon: "🧭" },
  { key: "compassion", icon: "❤️" },
  { key: "curiosity", icon: "🔍" },
  { key: "community", icon: "🤝" },
  { key: "perseverance", icon: "💪" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.about.title} | ${dict.meta.schoolName}`,
    description: dict.about.intro,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div>
      {/*
        NOTE (per user, 2026-07-23): the school's own banners show two different names —
        "Shree Manju Shree PRIMARY SCHOOL" (English) vs "आवासीय विद्यालय" / Residential
        School (Nepali). Left as "Primary School" sitewide for now per user instruction;
        revisit once the official name is confirmed.
      */}
      <PageHero
        eyebrow={dict.about.badge}
        title={dict.about.title}
        lede={dict.about.intro}
      />

      <section className="mx-auto max-w-5xl px-6 pt-16">
        <figure>
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-3xl shadow-lift">
            <Image
              src="/photos/school-building.jpeg"
              alt={dict.about.buildingCaption}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
          <figcaption className="mt-4 text-center text-sm text-gray-500">
            {dict.about.buildingCaption}
          </figcaption>
        </figure>
      </section>

      {/* Story + timeline */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-primary-950 sm:text-3xl">
              {dict.about.howWeStartedTitle}
            </h2>
            <p className="mt-5 leading-7 text-gray-600">
              {dict.about.howWeStartedP1}
            </p>
            <p className="mt-4 leading-7 text-gray-600">
              {dict.about.howWeStartedP2}
            </p>
          </div>

          <div className="lg:col-span-3">
            <ol className="relative space-y-9 border-l border-gray-200 pl-8">
              {milestoneMeta.map((key) => {
                const m = dict.about.milestones[key];
                return (
                  <li key={key} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent-400 bg-paper"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    </span>
                    <div className="font-display text-sm font-semibold tracking-wide text-primary-700">
                      {m.year}
                    </div>
                    <p className="mt-1.5 leading-7 text-gray-600">{m.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Motto */}
      <section className="grain relative overflow-hidden bg-primary-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(55% 75% at 50% 0%, rgba(246,165,36,0.13) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-300">
            {dict.about.mottoEyebrow}
          </p>
          <blockquote className="mt-6 font-display text-3xl font-semibold leading-snug text-white sm:text-4xl">
            {dict.about.motto}
          </blockquote>
          <p className="mt-7 leading-7 text-primary-100/75">
            {dict.about.mottoText}
          </p>
        </div>
      </section>

      {/* Goals */}
      <section className="border-b border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            title={dict.about.goalsTitle}
            subtitle={dict.about.goalsSubtitle}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {goalMeta.map(({ key, icon }) => {
              const goal = dict.about.goals[key];
              return (
                <Card key={key} className="flex gap-5">
                  <IconTile icon={icon} tone="accent" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary-950">
                      {goal.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {goal.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.about.valuesTitle}
          subtitle={dict.about.valuesSubtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueMeta.map(({ key, icon }) => {
            const value = dict.about.values[key];
            return (
              <Card key={key} className="text-center">
                <div className="flex justify-center">
                  <IconTile icon={icon} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary-950">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
