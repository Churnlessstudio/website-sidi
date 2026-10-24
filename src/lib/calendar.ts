export type CalendarEvent = {
  title: string;
  /** ISO 8601 with offset, e.g. "2026-12-03T19:00:00-05:00" */
  start: string;
  durationMinutes: number;
  details?: string;
  location?: string;
};

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** "Add to Google Calendar" link built from the funnel's real event config. */
export function googleCalendarUrl(e: CalendarEvent) {
  const start = new Date(e.start);
  const end = new Date(start.getTime() + e.durationMinutes * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: e.details ?? "",
    location: e.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Human date line in the event's own timezone, e.g. "Thursday, December 3 · 7:00 PM EST". */
export function formatEventDate(iso: string, timeZone: string, locale = "en-US") {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", timeZone }).format(d);
  const time = new Intl.DateTimeFormat(locale, { hour: "numeric", minute: "2-digit", timeZone, timeZoneName: "short" }).format(d);
  return `${date} · ${time}`;
}
