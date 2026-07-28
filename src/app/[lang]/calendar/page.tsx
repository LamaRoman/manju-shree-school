import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getCalendarEvents } from "@/lib/calendar";
import CalendarGrid from "./CalendarGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: `${dict.calendar.title} | ${dict.meta.schoolName}`,
    description: dict.calendar.subtitle,
  };
}

export default async function CalendarPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const events = await getCalendarEvents();

  return (
    <div>
      <section className="bg-gradient-to-b from-primary-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <span className="rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-700">
            {dict.calendar.badge}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary-950 sm:text-5xl">
            {dict.calendar.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">{dict.calendar.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">{dict.calendar.empty}</p>
        ) : (
          <CalendarGrid events={events} dict={dict.calendar} />
        )}
      </section>
    </div>
  );
}
