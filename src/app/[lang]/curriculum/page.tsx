import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Card, IconTile, PageHero, SectionHeading } from "@/components/ui";

const levelMeta = ["foundation", "intermediate", "advanced"] as const;
const methodologyMeta = [
  { key: "immersion", icon: "🗣️" },
  { key: "storytelling", icon: "📖" },
  { key: "songs", icon: "🎵" },
  { key: "cultural", icon: "🌾" },
] as const;
const scheduleMeta = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
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
    title: `${dict.curriculum.title} | ${dict.meta.schoolName}`,
    description: dict.curriculum.subtitle,
  };
}

export default async function CurriculumPage({
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
        eyebrow={dict.curriculum.badge}
        title={dict.curriculum.title}
        lede={dict.curriculum.subtitle}
      />

      {/* Levels */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={dict.curriculum.levelsTitle}
          subtitle={dict.curriculum.levelsSubtitle}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {levelMeta.map((key, i) => {
            const level = dict.curriculum.levels[key];
            return (
              <Card key={key} className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-4xl font-semibold text-primary-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {key === "advanced" && (
                    <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-800">
                      {dict.curriculum.proposed}
                    </span>
                  )}
                </div>

                <span className="mt-5 inline-flex w-fit rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                  {level.grades}
                </span>

                <h3 className="mt-4 font-display text-xl font-semibold text-primary-950">
                  {level.stage}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-700">
                  {level.focus}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {level.description}
                </p>

                <ul className="mt-6 space-y-2 border-t border-gray-200 pt-5 text-sm text-gray-600">
                  {level.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2.5">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400"
                      />
                      {topic}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Approach */}
      <section className="border-y border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading title={dict.curriculum.approachTitle} />

          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {methodologyMeta.map(({ key, icon }) => {
              const m = dict.curriculum.methodology[key];
              return (
                <Card key={key} className="flex gap-5">
                  <IconTile icon={icon} tone="accent" />
                  <div>
                    <h3 className="font-display text-lg font-semibold text-primary-950">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {m.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly schedule */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading
          title={dict.curriculum.scheduleTitle}
          subtitle={dict.curriculum.scheduleSubtitle}
        />

        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-paper-deep">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-primary-800">
                  {dict.curriculum.scheduleDay}
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-primary-800">
                  {dict.curriculum.scheduleFocus}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {scheduleMeta.map((key) => {
                const row = dict.curriculum.schedule[key];
                return (
                  <tr key={key} className="transition-colors hover:bg-primary-50/40">
                    <td className="px-6 py-4 font-medium whitespace-nowrap text-primary-900">
                      {row.day}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{row.topic}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
