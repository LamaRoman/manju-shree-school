import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const levelMeta = ["foundation", "intermediate", "advanced"] as const;
const methodologyMeta = [
  { key: "immersion", icon: "🗣️" },
  { key: "storytelling", icon: "📖" },
  { key: "songs", icon: "🎵" },
  { key: "cultural", icon: "🌾" },
] as const;
const scheduleMeta = ["monday", "tuesday", "wednesday", "thursday", "friday"] as const;

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
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.curriculum.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.curriculum.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.curriculum.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.curriculum.levelsTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.curriculum.levelsSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {levelMeta.map((key) => {
            const level = dict.curriculum.levels[key];
            return (
              <div
                key={key}
                className="flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                    {level.grades}
                  </span>
                  {key === "advanced" && (
                    <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
                      {dict.curriculum.proposed}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary-900">
                  {level.stage}
                </h3>
                <p className="text-sm font-medium text-accent-600">{level.focus}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{level.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
                  {level.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2">
                      <span className="mt-1 text-primary-500">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{dict.curriculum.approachTitle}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {methodologyMeta.map(({ key, icon }) => {
              const m = dict.curriculum.methodology[key];
              return (
                <div key={key} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                  <span className="text-3xl">{icon}</span>
                  <div>
                    <h3 className="font-semibold text-primary-900">{m.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">{m.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.curriculum.scheduleTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.curriculum.scheduleSubtitle}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-primary-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-600 text-white">
              <tr>
                <th className="px-6 py-3 font-semibold">{dict.curriculum.scheduleDay}</th>
                <th className="px-6 py-3 font-semibold">{dict.curriculum.scheduleFocus}</th>
              </tr>
            </thead>
            <tbody>
              {scheduleMeta.map((key, i) => {
                const row = dict.curriculum.schedule[key];
                return (
                  <tr
                    key={key}
                    className={i % 2 === 0 ? "bg-white" : "bg-primary-50/60"}
                  >
                    <td className="px-6 py-3 font-medium text-primary-900">{row.day}</td>
                    <td className="px-6 py-3 text-gray-600">{row.topic}</td>
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
