import { addWeeks, subWeeks } from "date-fns";

import type { DateRange, Furious } from "./types";
import { isDateBetween } from "./helpers";

/**
 * Generates a sequence of dates based on the provided parameters.
 *
 * @param ordinal - The position in the sequence (1-based index).
 * @param total - The total number of elements in the sequence.
 * @param boundaryDate - The date that serves as the boundary for the sequence.
 * @param isPositive - A boolean indicating the direction of the sequence.
 *                      If `true`, the sequence moves forward in time.
 *                      If `false`, the sequence moves backward in time.
 * @returns An array of `Date` objects representing the generated sequence.
 */
const generatePath = (
  startDate: Date,
  ordinal: number,
  total: number,
  boundaryDate: Date,
  isPositive: boolean
): Date[] => {
  const path: Date[] = [];
  let current = isPositive
    ? addWeeks(startDate, ordinal - 1)
    : subWeeks(startDate, total - ordinal + 1);
  const step = isPositive ? addWeeks : subWeeks;

  while (isPositive ? current <= boundaryDate : current >= boundaryDate) {
    path.push(current);
    current = step(current, total);
  }

  return path;
};

export const calculateFurious = (
  furious: Furious[],
  startDate: Date,
  range: DateRange
): string => {
  const total = furious.length;
  const isPositive = range.end > new Date(startDate);
  const boundaryDate = isPositive ? range.end : range.start;

  for (const item of furious) {
    const path = generatePath(
      startDate,
      item.ordinal ?? 0,
      total,
      boundaryDate,
      isPositive
    );
    if (path.some((date) => isDateBetween(range, date))) {
      return item.name;
    }
  }

  return "N/A";
};
