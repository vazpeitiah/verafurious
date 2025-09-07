import { getWeeksAround } from "@/utils/helpers";
import type { DateRange } from "@/utils/types";
import { addWeeks, subWeeks } from "date-fns";
import { create } from "zustand";

import { startDate } from "@furious";

interface TimelineState {
  selectedDate: Date;
  weeks: DateRange[];
  weeksSize: number;
  actions: {
    moveOneWeekAgo: () => void;
    moveOneWeekForward: () => void;
    resetToCurrentWeek: () => void;
    configureWeeks: (size: number) => void;
  };
}

const useTimelineStore = create<TimelineState>()((set) => {
  const updateWeeks = (
    selectedDate: Date,
    weeksSize: number,
    startDate: string
  ) => getWeeksAround(selectedDate, weeksSize, new Date(startDate));

  return {
    selectedDate: new Date(),
    weeks: getWeeksAround(new Date(), 3, new Date(startDate)),
    weeksSize: 3,
    actions: {
      moveOneWeekAgo: () =>
        set((state) => {
          const newDate = subWeeks(state.selectedDate, 1);
          return {
            selectedDate: newDate,
            weeks: updateWeeks(newDate, state.weeksSize, startDate),
          };
        }),
      moveOneWeekForward: () =>
        set((state) => {
          const newDate = addWeeks(state.selectedDate, 1);
          return {
            selectedDate: newDate,
            weeks: updateWeeks(newDate, state.weeksSize, startDate),
          };
        }),
      resetToCurrentWeek: () =>
        set((state) => ({
          selectedDate: new Date(),
          weeks: updateWeeks(new Date(), state.weeksSize, startDate),
        })),
      configureWeeks: (size: number) => {
        set((state) => ({
          weeksSize: size,
          weeks: updateWeeks(state.selectedDate, size, startDate),
        }));
      },
    },
  };
});

export const useSelectedDate = () =>
  useTimelineStore((state) => state.selectedDate);
export const useWeeksSize = () => useTimelineStore((state) => state.weeksSize);
export const useWeeks = () => useTimelineStore((state) => state.weeks);

export const useTimelineActions = () =>
  useTimelineStore((state) => state.actions);
