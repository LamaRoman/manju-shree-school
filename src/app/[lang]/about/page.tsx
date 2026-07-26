import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const milestoneMeta = ["founded", "campus", "language", "programs", "today"] as const;
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
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.about.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.about.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-primary-100">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="/photos/school-building.jpeg"
              alt={dict.about.buildingCaption}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500">
          {dict.about.buildingCaption}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary-950">
              {dict.about.howWeStartedTitle}
            </h2>
            <p className="mt-4 text-gray-600 leading-7">{dict.about.howWeStartedP1}</p>
            <p className="mt-4 text-gray-600 leading-7">{dict.about.howWeStartedP2}</p>
          </div>

          <div className="lg:col-span-3">
            <ol className="relative space-y-8 border-l-2 border-primary-100 pl-6">
              {milestoneMeta.map((key) => {
                const m = dict.about.milestones[key];
                return (
                  <li key={key} className="relative">
                    <span className="absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 ring-4 ring-white" />
                    <div className="text-sm font-bold text-primary-600">{m.year}</div>
                    <p className="mt-1 text-gray-600">{m.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-primary-900">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-300">
            {dict.about.mottoEyebrow}
          </p>
          <blockquote className="mt-4 text-2xl font-bold leading-snug text-white sm:text-3xl">
            {dict.about.motto}
          </blockquote>
          <p className="mt-6 leading-7 text-primary-100">{dict.about.mottoText}</p>
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{dict.about.goalsTitle}</h2>
            <p className="mt-3 text-gray-600">{dict.about.goalsSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {goalMeta.map(({ key, icon }) => {
              const goal = dict.about.goals[key];
              return (
                <div
                  key={key}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
                >
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h3 className="font-semibold text-primary-900">{goal.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {goal.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.about.valuesTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.about.valuesSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {valueMeta.map(({ key, icon }) => {
            const value = dict.about.values[key];
            return (
              <div
                key={key}
                className="rounded-2xl border border-primary-100 p-6 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-3 font-semibold text-primary-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
