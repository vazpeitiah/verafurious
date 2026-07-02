import { addDays, formatDate, isWeekend, setHours, setMinutes, setSeconds } from "date-fns";
import { nanoid } from "nanoid";

import { meetingUrl } from "@furious";
import type { DateRange } from "./types";
import { formatOutlookDateTime } from "./helpers";

const DAILY_START = { hours: 9, minutes: 30 };
const DAILY_END = { hours: 10, minutes: 0 };
const WEEKDAYS_PER_WEEK = 5;

/**
 * Calculates the next weekday occurrence of a given time of day, starting
 * from `reference`. If `reference` already falls on or after that time on a
 * weekday, the current day is used; otherwise it advances to the next
 * weekday.
 */
const getNextWeekdayAt = (
  hours: number,
  minutes: number,
  reference: Date = new Date()
): Date => {
  let date = setSeconds(setMinutes(setHours(reference, hours), minutes), 0);
  while (isWeekend(date) || date < reference) {
    date = addDays(date, 1);
  }
  return date;
};

/**
 * Builds an Outlook Web "add event" deeplink for the next occurrence of the
 * daily meeting. Outlook's compose deeplink does not reliably support
 * recurrence, so the link prefills a single event — recurrence (Mon-Fri)
 * can be set from Outlook's own "Does not repeat" control once it opens.
 */
export const buildOutlookDailyUrl = (): string => {
  const start = getNextWeekdayAt(DAILY_START.hours, DAILY_START.minutes);
  const end = setMinutes(setHours(start, DAILY_END.hours), DAILY_END.minutes);

  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    startdt: formatOutlookDateTime(start),
    enddt: formatOutlookDateTime(end),
    subject: "Daily VeraFuriosos",
    location: "Microsoft Teams Meeting",
    body: `Junta diaria del equipo. Únete aquí: ${meetingUrl}`,
  });

  return `https://outlook.office.com/calendar/deeplink/compose?${params.toString()}`;
};

/**
 * Formats a date as a local (floating) ICS datetime: `yyyyMMdd'T'HHmmss`.
 */
const formatIcsLocalDateTime = (date: Date): string =>
  formatDate(date, "yyyyMMdd'T'HHmmss");

/**
 * Formats a date as a UTC ICS datetime, required for DTSTAMP.
 */
const formatIcsUtcDateTime = (date: Date): string =>
  date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

/** Escapes text per RFC 5545 (commas, semicolons, backslashes, newlines). */
const escapeIcsText = (text: string): string =>
  text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

/** Folds a content line to 75 octets per RFC 5545, as required by strict parsers. */
const foldIcsLine = (line: string): string => {
  const chunks: string[] = [];
  let rest = line;
  while (rest.length > 75) {
    chunks.push(rest.slice(0, 75));
    rest = rest.slice(75);
  }
  chunks.push(rest);
  return chunks.join("\r\n ");
};

/**
 * Builds an .ics file scheduling the daily meeting for every weekday
 * (Monday-Friday) of the given week range, for the given person.
 */
export const buildDailyIcsFile = (
  range: DateRange,
  personName: string
): { filename: string; content: string } => {
  const now = new Date();
  const weekdayDates = Array.from({ length: WEEKDAYS_PER_WEEK }, (_, i) =>
    addDays(range.start, i)
  );

  const events = weekdayDates
    .map((day) => {
      const start = setSeconds(
        setMinutes(setHours(day, DAILY_START.hours), DAILY_START.minutes),
        0
      );
      const end = setMinutes(
        setHours(day, DAILY_END.hours),
        DAILY_END.minutes
      );

      return [
        "BEGIN:VEVENT",
        `UID:${nanoid()}@verafurious`,
        `DTSTAMP:${formatIcsUtcDateTime(now)}`,
        `DTSTART:${formatIcsLocalDateTime(start)}`,
        `DTEND:${formatIcsLocalDateTime(end)}`,
        foldIcsLine(
          `SUMMARY:${escapeIcsText(`Daily VeraFuriosos - ${personName}`)}`
        ),
        `LOCATION:${escapeIcsText("Microsoft Teams Meeting")}`,
        foldIcsLine(
          `DESCRIPTION:${escapeIcsText(
            `Junta diaria del equipo. Únete aquí: ${meetingUrl}`
          )}`
        ),
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VeraFuriosos//Daily//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    events,
    "END:VCALENDAR",
  ].join("\r\n");

  const filename = `daily-${personName.replace(/[^a-zA-Z0-9]+/g, "-")}-${formatDate(
    range.start,
    "yyyyMMdd"
  )}.ics`;

  return { filename, content };
};

/** Triggers a browser download of the given .ics content. */
export const downloadIcsFile = (filename: string, content: string): void => {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
