import {
  addWeeks,
  endOfWeek,
  formatDate,
  startOfWeek,
  subDays,
} from "date-fns";
import type { DateRange } from "./types";
import { es } from "date-fns/locale";

/**
 * Generates an array of date ranges representing weeks around a given date.
 *
 * @param date - The reference date from which to calculate the weeks.
 * @param n - The number of weeks before and after the reference date to include.
 * @returns An array of `DateRange` objects, each representing a week around the given date.
 */
export const getWeeksAround = (
  date: Date,
  n: number,
  startDate: Date
): DateRange[] => {
  const weeks: DateRange[] = [];
  for (let i = -n; i <= n; i++) {
    weeks.push(getWeekRangeFromDate(addWeeks(date, i)));
  }
  const filterWeeks = weeks.filter((week) => week.start >= new Date(startDate));

  return filterWeeks;
};

/**
 * Checks if a given date falls within a specified date range.
 *
 * @param range - An object representing the date range with `start` and `end` properties.
 *                Both `start` and `end` should be `Date` objects.
 * @param date - The date to check, represented as a `Date` object.
 * @returns `true` if the date is within the range (inclusive), otherwise `false`.
 */
export const isDateBetween = (range: DateRange, date: Date): boolean => {
  return (
    range.start.getTime() <= date.getTime() &&
    range.end.getTime() >= date.getTime()
  );
};

/**
 * Determines whether a given date range is entirely in the past.
 *
 * @param range - The date range to evaluate, consisting of a start and end date.
 * @returns `true` if the date range is entirely in the past; otherwise, `false`.
 */
export const isPastRange = (range: DateRange): boolean => {
  const currentDate = new Date();
  if (isDateBetween(range, currentDate)) return false;
  return range.end.getTime() < currentDate.getTime();
};

/**
 * Calculates the start and end dates of the week for a given date.
 * The week is considered to start on Monday.
 *
 * @param date - The date for which the week range is to be calculated.
 * @returns An object containing the start and end dates of the week.
 */
export const getWeekRangeFromDate = (date: Date): DateRange => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return { start, end };
};

/**
 * Formats a given date into a localized string representation.
 *
 * @param date - The date object to be formatted.
 * @returns A string representing the formatted date in the "PP" format with Spanish locale.
 */
export const customFormatDate = (date: Date) => {
  return formatDate(date, "PP", { locale: es });
};

const WEEKDAY_NAMES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

/**
 * Returns the Spanish name of a weekday given its ISO weekday number (1 = Lunes ... 7 = Domingo).
 *
 * @param day - The ISO weekday number.
 * @returns The Spanish name of the weekday.
 */
export const getWeekdayName = (day: number): string => WEEKDAY_NAMES[day - 1];

/**
 * Formats a list of ISO weekday numbers into a comma-separated string of Spanish weekday names.
 *
 * @param days - The ISO weekday numbers (1 = Lunes ... 7 = Domingo).
 * @returns A formatted string with the weekday names, or a fallback message if empty.
 */
export const formatHomeOfficeDays = (days: number[]): string => {
  if (days.length === 0) return "Sin días asignados";
  return days
    .slice()
    .sort((a, b) => a - b)
    .map(getWeekdayName)
    .join(", ");
};

export const formatRange = (
  range: DateRange,
  ignoreWeekends: boolean = true
) => {
  if (ignoreWeekends) {
    const start = range.start;
    const end = subDays(range.end, 2);
    return `${customFormatDate(start)} - ${customFormatDate(end)}`;
  }
  return `${customFormatDate(range.start)} - ${customFormatDate(range.end)}`;
};
