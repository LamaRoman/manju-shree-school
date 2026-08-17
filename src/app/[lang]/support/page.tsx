import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { notFound } from "next/navigation";
import {
  Card,
  IconTile,
  PageHero,
  SectionHeading,
  buttonOnDark,
  buttonPrimary,
} from "@/components/ui";

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
      <PageHero eyebrow={s.badge} title={s.title} lede={s.subtitle} />

      {/* The letter opening, lifted out of the hero into its own card so the
          hero stays a consistent height with every other page. */}
      <section className="mx-auto max-w-3xl px-6 pt-16">
        <Card className="p-8 sm:p-10">
          <p className="font-display text-lg font-semibold text-primary-950">
            {s.greeting}
          </p>
          <p className="mt-4 leading-8 text-gray-600">{s.greetingText}</p>
        </Card>
      </section>

      {/* The situation */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-primary-950 sm:text-3xl">
              {s.situationTitle}
            </h2>
          </div>
          <div className="space-y-4 lg:col-span-3">
            <p className="leading-8 text-gray-600">{s.situationP1}</p>
            <p className="leading-8 text-gray-600">{s.situationP2}</p>
          </div>
        </div>
      </section>

      {/* Vision */}
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
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {s.visionTitle}
          </h2>
          <p className="mt-6 leading-8 text-primary-100/80">{s.visionText}</p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeading
          title={s.philosophyTitle}
          subtitle={s.philosophySubtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {philosophyMeta.map(({ key, icon }, i) => {
            const item = s.philosophy[key];
            return (
              <Card key={key} delay={i * 90} className="text-center">
                <div className="flex justify-center">
                  <IconTile icon={icon} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Objectives */}
      <section className="border-y border-gray-200/70 bg-paper-deep">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <SectionHeading title={s.objectivesTitle} />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2">
            {s.objectives.map((objective, i) => (
              <li
                key={objective}
                className="flex gap-4 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-soft"
              >
                <span
                  aria-hidden
                  className="font-display text-2xl font-semibold leading-none text-primary-200"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-7 text-gray-600">{objective}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-3xl px-6 py-24">
        <SectionHeading title={s.whyTitle} />
        <div className="mt-10 space-y-5">
          <p className="leading-8 text-gray-600">{s.whyP1}</p>
          <p className="leading-8 text-gray-600">{s.whyP2}</p>
          <p className="leading-8 text-gray-600">{s.whyP3}</p>
        </div>
      </section>

      {/* Closing */}
      <section className="grain relative overflow-hidden bg-primary-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 50% 0%, rgba(246,165,36,0.14) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7 px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {s.closingTitle}
          </h2>
          <p className="max-w-xl leading-8 text-primary-100/80">
            {s.closingText}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:manjushreeschool2024@gmail.com"
              className={buttonPrimary}
            >
              {s.contactButton}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonOnDark}
            >
              {s.whatsappButton}
            </a>
          </div>

          <div className="mt-6 w-full border-t border-white/10 pt-7 text-sm text-primary-100/60">
            <p>{s.closingSignoff}</p>
            <p className="mt-1.5 font-display text-base font-semibold text-white">
              {s.closingSchool}
            </p>
            <p className="mt-0.5">{s.closingLocation}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
