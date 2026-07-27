import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { getCalendarEvents, groupEventsByMonth } from "@/lib/calendar";

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
  const monthGroups = groupEventsByMonth(events);

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

      <section className="mx-auto max-w-3xl px-6 py-16">
        {monthGroups.length === 0 ? (
          <p className="text-center text-gray-500">{dict.calendar.empty}</p>
        ) : (
          <div className="space-y-10">
            {monthGroups.map((group) => (
              <div key={`${group.year}/${group.month}`}>
                <h2 className="text-xl font-bold text-primary-950">
                  {dict.calendar.months[group.month - 1]} {group.year}
                </h2>
                <ul className="mt-4 divide-y divide-primary-100 overflow-hidden rounded-2xl border border-primary-100 bg-white">
                  {group.events.map((event) => (
                    <li key={event.id} className="flex items-start gap-4 p-4">
                      <span className="mt-0.5 shrink-0 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                        {event.date.split("/")[2]}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-primary-900">{event.title}</h3>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              event.type === "HOLIDAY"
                                ? "bg-accent-100 text-accent-700"
                                : "bg-primary-100 text-primary-700"
                            }`}
                          >
                            {event.type === "HOLIDAY" ? dict.calendar.holidayLabel : dict.calendar.eventLabel}
                          </span>
                        </div>
                        {event.description && (
                          <p className="mt-1 text-sm leading-6 text-gray-600">{event.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
