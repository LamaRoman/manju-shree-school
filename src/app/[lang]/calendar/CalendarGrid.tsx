"use client";

import { useMemo, useState } from "react";
import type { CalendarEvent } from "@/lib/calendar";
import {
  bsToAdDate,
  daysInBsMonth,
  firstWeekdayOfBsMonth,
  formatAdFull,
  formatAdShort,
  todayBs,
} from "@/lib/nepaliCalendar";

interface CalendarGridDict {
  months: string[];
  weekdaysShort: string[];
  eventLabel: string;
  holidayLabel: string;
  empty: string;
  noEventsMonth: string;
  activitiesLabel: string;
  previousMonth: string;
  nextMonth: string;
  todayButton: string;
}

export default function CalendarGrid({
  events,
  dict,
}: {
  events: CalendarEvent[];
  dict: CalendarGridDict;
}) {
  const today = useMemo(() => todayBs(), []);
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);

  const daysInMonth = daysInBsMonth(year, month);
  const startWeekday = firstWeekdayOfBsMonth(year, month);
  const monthKey = `${year}/${String(month + 1).padStart(2, "0")}`;

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>();
    for (const event of events) {
      if (!event.date.startsWith(`${monthKey}/`)) continue;
      const day = Number(event.date.split("/")[2]);
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(event);
    }
    return map;
  }, [events, monthKey]);

  const monthEvents = useMemo(
    () => [...eventsByDay.entries()].sort(([a], [b]) => a - b),
    [eventsByDay],
  );

  const adRangeLabel = `${formatAdShort(bsToAdDate(year, month, 1))} – ${formatAdFull(
    bsToAdDate(year, month, daysInMonth),
  )}`;

  function goToMonth(delta: number) {
    let newMonth = month + delta;
    let newYear = year;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    setYear(newYear);
    setMonth(newMonth);
  }

  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-primary-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label={dict.previousMonth}
            onClick={() => goToMonth(-1)}
            className="rounded-full p-2 text-primary-700 hover:bg-primary-50"
          >
            &larr;
          </button>
          <div className="text-center">
            <h2 className="text-lg font-bold text-primary-950">
              {dict.months[month]} {year}
            </h2>
            <p className="text-xs text-gray-500">{adRangeLabel}</p>
          </div>
          <button
            type="button"
            aria-label={dict.nextMonth}
            onClick={() => goToMonth(1)}
            className="rounded-full p-2 text-primary-700 hover:bg-primary-50"
          >
            &rarr;
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setYear(today.year);
            setMonth(today.month);
          }}
          className="mt-3 text-xs font-semibold text-accent-600 hover:underline"
        >
          {dict.todayButton}
        </button>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-500">
          {dict.weekdaysShort.map((wd) => (
            <div key={wd}>{wd}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`blank-${i}`} />;
            const isToday = year === today.year && month === today.month && day === today.day;
            const hasEvents = eventsByDay.has(day);
            return (
              <div
                key={day}
                className={`flex aspect-square flex-col items-center justify-center rounded-lg text-sm ${
                  isToday
                    ? "bg-primary-700 font-semibold text-white"
                    : hasEvents
                      ? "bg-primary-50 text-primary-900"
                      : "text-gray-700"
                }`}
              >
                <span>{day}</span>
                {hasEvents && !isToday && (
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-accent-500" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-primary-950">
          {dict.months[month]} {year} {dict.activitiesLabel} ({monthEvents.length})
        </h3>
        {monthEvents.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">{dict.noEventsMonth}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {monthEvents.map(([day, dayEvents]) =>
              dayEvents.map((event) => (
                <li
                  key={event.id}
                  className="rounded-2xl border border-primary-100 bg-white p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {day}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-primary-900">{event.title}</h4>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                            event.type === "HOLIDAY"
                              ? "bg-accent-100 text-accent-700"
                              : "bg-primary-100 text-primary-700"
                          }`}
                        >
                          {event.type === "HOLIDAY" ? dict.holidayLabel : dict.eventLabel}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {formatAdFull(bsToAdDate(year, month, day))}
                      </p>
                      {event.description && (
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )),
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
