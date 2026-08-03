"use client";

import { useMemo, useState } from "react";
import { SectionBanner } from "@/components/SectionBanner";
import type { Event } from "@/db/schema";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function daysInMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function EventCalendar({ events }: { events: Event[] }) {
  const [cursor, setCursor] = useState(() => startOfMonth(new Date()));

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
      }).format(cursor),
    [cursor],
  );

  const eventMap = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const event of events) {
      const d = new Date(event.startsAt);
      const key = toKey(d);
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  const firstWeekday = (cursor.getDay() + 6) % 7; // Monday=0
  const totalDays = daysInMonth(cursor);
  const cells: Array<{ day: number | null; key: string }> = [];

  for (let i = 0; i < firstWeekday; i++) {
    cells.push({ day: null, key: `pad-${i}` });
  }
  for (let day = 1; day <= totalDays; day++) {
    cells.push({
      day,
      key: `day-${day}`,
    });
  }

  const monthEvents = events.filter((e) => {
    const d = new Date(e.startsAt);
    return d.getMonth() === cursor.getMonth() && d.getFullYear() === cursor.getFullYear();
  });

  return (
    <section
      aria-labelledby="calendar-heading"
      className="scroll-mt-20 space-y-5"
    >
      <SectionBanner tone="dark" kicker="Kalender" title="Termine" titleId="calendar-heading">
        <span className="capitalize">{monthLabel}</span>
      </SectionBanner>

      <div className="bg-white p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            className="min-h-11 rounded border border-[color:var(--cdu-blue)]/20 px-3 font-semibold text-[color:var(--cdu-blue)] hover:bg-[color:var(--cdu-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-teal)]"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
            aria-label="Vorheriger Monat"
          >
            ←
          </button>
          <button
            type="button"
            className="min-h-11 rounded border border-[color:var(--cdu-blue)]/20 px-3 font-semibold text-[color:var(--cdu-blue)] hover:bg-[color:var(--cdu-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-teal)]"
            onClick={() => setCursor(startOfMonth(new Date()))}
          >
            Heute
          </button>
          <button
            type="button"
            className="min-h-11 rounded border border-[color:var(--cdu-blue)]/20 px-3 font-semibold text-[color:var(--cdu-blue)] hover:bg-[color:var(--cdu-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--cdu-teal)]"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
            aria-label="Nächster Monat"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="mt-4 grid grid-cols-7 gap-1 text-center text-sm"
        role="grid"
        aria-label={`Kalender ${monthLabel}`}
      >
        {WEEKDAYS.map((d) => (
          <div key={d} role="columnheader" className="py-2 font-semibold text-[color:var(--cdu-blue)]">
            {d}
          </div>
        ))}
        {cells.map((cell) => {
          if (cell.day === null) {
            return <div key={cell.key} className="min-h-14 rounded-md bg-transparent" />;
          }
          const date = new Date(cursor.getFullYear(), cursor.getMonth(), cell.day);
          const key = toKey(date);
          const dayEvents = eventMap.get(key) ?? [];
          const hasEvents = dayEvents.length > 0;
          return (
            <div
              key={cell.key}
              role="gridcell"
              aria-label={`${cell.day}. ${monthLabel}${hasEvents ? `, ${dayEvents.length} Termin(e)` : ""}`}
              className={`min-h-14 border p-1 ${
                hasEvents
                  ? "border-[color:var(--cdu-teal)] bg-[color:var(--cdu-teal)]/25"
                  : "border-transparent bg-[color:var(--cdu-teal-10)]"
              }`}
            >
              <span className="font-bold text-[color:var(--cdu-blue)]">{cell.day}</span>
              {hasEvents ? (
                <span className="mt-1 block truncate text-[10px] font-medium text-[color:var(--cdu-blue)]">
                  {dayEvents[0].title}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5">
        <h3 className="font-headline text-lg text-[color:var(--cdu-blue)]">
          Termine in diesem Monat
        </h3>
        {monthEvents.length === 0 ? (
          <p className="mt-2 text-sm text-[color:var(--cdu-blue)]/75">
            Keine eingetragenen Termine in diesem Monat.
          </p>
        ) : (
          <ul className="mt-2 space-y-2">
            {monthEvents.map((event) => (
              <li
                key={event.id}
                className="border-l-4 border-[color:var(--cdu-gold)] bg-[color:var(--cdu-surface)] px-3 py-2"
              >
                <p className="font-bold text-[color:var(--cdu-blue)]">{event.title}</p>
                <p className="text-sm text-[color:var(--cdu-blue)]/80">
                  <time dateTime={new Date(event.startsAt).toISOString()}>
                    {new Intl.DateTimeFormat("de-DE", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(event.startsAt))}
                  </time>
                  {event.location ? ` · ${event.location}` : ""}
                </p>
                {event.description ? (
                  <p className="mt-1 text-sm text-[color:var(--cdu-ink)]">{event.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </section>
  );
}
