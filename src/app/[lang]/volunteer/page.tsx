import type { Metadata } from "next";
import Image from "next/image";
import VolunteerForm from "@/components/VolunteerForm";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

const categoryMeta = [
  { key: "food", icon: "🍲" },
  { key: "hygiene", icon: "🩸" },
  { key: "stationery", icon: "✏️" },
] as const;

const stepMeta = ["choose", "tell", "coordinate", "reach"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.volunteer.badge} | ${dict.meta.schoolName}`,
    description: dict.volunteer.subtitle,
  };
}

export default async function VolunteerPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <div>
      <section className="bg-gradient-to-b from-accent-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-accent-100 px-4 py-1 text-sm font-semibold text-accent-700">
            {dict.volunteer.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.volunteer.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.volunteer.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl border border-accent-100">
          <div className="relative aspect-[16/7] w-full">
            <Image
              src="/photos/opening-ceremony.jpeg"
              alt={dict.volunteer.photoCaption}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500">
          {dict.volunteer.photoCaption}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.volunteer.waysTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.volunteer.waysSubtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {categoryMeta.map(({ key, icon }) => {
            const cat = dict.volunteer.categories[key];
            return (
              <div
                key={key}
                className="flex flex-col rounded-2xl border border-primary-100 bg-white p-6 shadow-sm"
              >
                <span className="text-3xl">{icon}</span>
                <h3 className="mt-3 text-lg font-semibold text-primary-900">{cat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{cat.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-accent-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-primary-50">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary-950">{dict.volunteer.howTitle}</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stepMeta.map((key, i) => {
              const step = dict.volunteer.steps[key];
              return (
                <div key={key} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-semibold text-primary-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary-950">{dict.volunteer.ctaTitle}</h2>
          <p className="mt-3 text-gray-600">{dict.volunteer.ctaSubtitle}</p>
        </div>
        <div className="mt-10">
          <VolunteerForm dict={dict} />
        </div>
      </section>
    </div>
  );
}
