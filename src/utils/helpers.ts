import { addWeeks, endOfWeek, startOfWeek, subDays } from "date-fns";
import type { CalendarItem, Employee } from "./types";

export const generateCalendar = (
  employees: Employee[],
  startDate: Date,
  futureWeeks: number
): CalendarItem[] => {
  employees.sort((a, b) => a.ordinal - b.ordinal);
  const calendar: CalendarItem[] = [];
  const start = startOfWeek(startDate, { weekStartsOn: 1 });

  const end = addWeeks(start, futureWeeks);
  const totalWeeks = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );
  const currentWeek = {
    begin: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  };

  Array.from({ length: totalWeeks }).forEach((_, weekIndex) => {
    const weekStart = addWeeks(start, weekIndex);
    const weekEnd = subDays(endOfWeek(weekStart, { weekStartsOn: 1 }), 2);

    calendar.push({
      begin: weekStart,
      end: weekEnd,
      employee: employees[weekIndex % employees.length],
      isCurrentWeek:
        weekStart.getTime() >= currentWeek.begin.getTime() &&
        weekEnd.getTime() <= currentWeek.end.getTime(),
    });
  });

  console.log("calendar", calendar);

  return calendar;
};
