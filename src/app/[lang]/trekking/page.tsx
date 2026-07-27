import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const dayHikeMeta = [
  { key: "chandannath", icon: "🛕" },
  { key: "patmara", icon: "🌾" },
  { key: "gothichaur", icon: "🧘" },
] as const;

const multiDayMeta = [
  { key: "rara", icon: "🏞️" },
  { key: "sinja", icon: "🏛️" },
  { key: "kanjiroba", icon: "🏔️" },
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
    title: `${dict.trekking.title} | ${dict.meta.schoolName}`,
    description: dict.trekking.subtitle,
  };
}

export default async function TrekkingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.trekking.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.trekking.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.trekking.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.trekking.dayTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.trekking.daySubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {dayHikeMeta.map(({ key, icon }) => {
            const hike = dict.trekking.dayHikes[key];
            return (
              <div
                key={key}
                className="flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-primary-900">{hike.title}</h3>
                <span className="mt-1 text-sm font-medium text-accent-600">{hike.duration}</span>
                <p className="mt-2 text-sm leading-6 text-gray-600">{hike.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{dict.trekking.multiTitle}</h2>
            <p className="mt-3 text-gray-600">{dict.trekking.multiSubtitle}</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {multiDayMeta.map(({ key, icon }) => {
              const trek = dict.trekking.multiDay[key];
              return (
                <div key={key} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <span className="text-3xl">{icon}</span>
                  <h3 className="mt-3 text-lg font-semibold text-primary-900">{trek.title}</h3>
                  <span className="mt-1 text-sm font-medium text-accent-600">{trek.duration}</span>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{trek.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-2xl border border-primary-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-primary-900">{dict.trekking.noteTitle}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">{dict.trekking.noteText}</p>
        </div>
      </section>
    </div>
  );
}
