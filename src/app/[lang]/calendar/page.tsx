import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getCalendarEvents } from "@/lib/calendar";
import CalendarGrid from "./CalendarGrid";
import { PageHero } from "@/components/ui";

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
      <PageHero
        eyebrow={dict.calendar.badge}
        title={dict.calendar.title}
        lede={dict.calendar.subtitle}
      />

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
