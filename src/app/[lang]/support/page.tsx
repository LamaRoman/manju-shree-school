import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { notFound } from "next/navigation";

const philosophyMeta = [
  { key: "culture", icon: "🗣️" },
  { key: "environment", icon: "🌱" },
  { key: "family", icon: "❤️" },
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
    title: `${dict.support.badge} | ${dict.meta.schoolName}`,
    description: dict.support.visionText,
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const s = dict.support;

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {s.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {s.title}
          </h1>
          <p className="mt-3 text-sm font-medium text-primary-600">{s.subtitle}</p>
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-primary-100 bg-white p-6 text-left shadow-sm">
            <p className="font-semibold text-primary-900">{s.greeting}</p>
            <p className="mt-3 text-gray-600 leading-7">{s.greetingText}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary-950">{s.situationTitle}</h2>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <p className="text-gray-600 leading-7">{s.situationP1}</p>
            <p className="text-gray-600 leading-7">{s.situationP2}</p>
          </div>
        </div>
      </section>

      <section className="bg-primary-900">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">{s.visionTitle}</h2>
          <p className="mt-4 text-primary-100 leading-7">{s.visionText}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{s.philosophyTitle}</h2>
          <p className="mt-3 text-gray-600">{s.philosophySubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {philosophyMeta.map(({ key, icon }) => {
            const item = s.philosophy[key];
            return (
              <div
                key={key}
                className="rounded-2xl border border-primary-100 p-6 text-center transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-3 font-semibold text-primary-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{s.objectivesTitle}</h2>
          </div>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {s.objectives.map((objective, i) => (
              <li
                key={objective}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-sm leading-6 text-gray-600">{objective}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-3xl font-bold text-primary-950 text-center">{s.whyTitle}</h2>
        <div className="mt-6 space-y-4">
          <p className="text-gray-600 leading-7">{s.whyP1}</p>
          <p className="text-gray-600 leading-7">{s.whyP2}</p>
          <p className="text-gray-600 leading-7">{s.whyP3}</p>
        </div>
      </section>

      <section className="bg-primary-900">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">{s.closingTitle}</h2>
          <p className="text-primary-100 leading-7">{s.closingText}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:manjushreeschool2024@gmail.com"
              className="rounded-full bg-accent-500 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600"
            >
              {s.contactButton}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 bg-white/10 px-7 py-3 text-base font-semibold text-white backdrop-blur-sm shadow-sm transition-colors hover:bg-white/20"
            >
              {s.whatsappButton}
            </a>
          </div>
          <div className="mt-4 border-t border-primary-800 pt-6 text-sm text-primary-200">
            <p>{s.closingSignoff}</p>
            <p className="mt-1 font-semibold text-white">{s.closingSchool}</p>
            <p>{s.closingLocation}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
