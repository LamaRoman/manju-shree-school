import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, IconTile, PageHero, SectionHeading } from "@/components/ui";

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
      <PageHero
        eyebrow={dict.trekking.badge}
        title={dict.trekking.title}
        lede={dict.trekking.subtitle}
      />

      {/* Day hikes */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.trekking.dayTitle}
          subtitle={dict.trekking.daySubtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {dayHikeMeta.map(({ key, icon }, i) => {
            const hike = dict.trekking.dayHikes[key];
            return (
              <Card key={key} delay={i * 90} className="flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <IconTile icon={icon} />
                  <span className="rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold whitespace-nowrap text-accent-800 ring-1 ring-accent-200/70">
                    {hike.duration}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-primary-950">
                  {hike.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {hike.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Multi-day treks */}
      <section className="border-y border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading
            title={dict.trekking.multiTitle}
            subtitle={dict.trekking.multiSubtitle}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {multiDayMeta.map(({ key, icon }, i) => {
              const trek = dict.trekking.multiDay[key];
              return (
                <Card key={key} delay={i * 90} className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <IconTile icon={icon} tone="accent" />
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold whitespace-nowrap text-primary-700 ring-1 ring-primary-100">
                      {trek.duration}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-primary-950">
                    {trek.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {trek.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practical note */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-2xl border border-accent-200/70 bg-accent-50/60 p-8 text-center sm:p-10">
          <h2 className="font-display text-xl font-semibold text-primary-950">
            {dict.trekking.noteTitle}
          </h2>
          <p className="mt-4 leading-7 text-gray-600">
            {dict.trekking.noteText}
          </p>
        </div>
      </section>
    </div>
  );
}
