import { getWeeksAround } from "@/utils/helpers";
import type { DateRange, Furious } from "@/utils/types";
import { addWeeks, subWeeks } from "date-fns";
import { create } from "zustand";

interface Configs {
  furious: Furious[];
  startDate: Date;
  meetingUrl: string;
  weeksSize: number;
}

interface TimelineState {
  selectedDate: Date;
  weeks: DateRange[];
  furious: Furious[];
  startDate: Date;
  meetingUrl: string;
  weeksSize: number;
  actions: {
    moveOneWeekAgo: (startDate: Date) => void;
    moveOneWeekForward: (startDate: Date) => void;
    resetToCurrentWeek: () => void;
    configureWeeks: (config: Configs) => void;
  };
}

const useTimelineStore = create<TimelineState>()((set) => {
  const updateWeeks = (
    selectedDate: Date,
    weeksSize: number,
    startDate: Date
  ) => getWeeksAround(selectedDate, weeksSize, startDate);

  return {
    startDate: new Date(),
    furious: [],
    meetingUrl: "#",
    selectedDate: new Date(),
    weeks: [],
    weeksSize: 0,
    actions: {
      moveOneWeekAgo: () =>
        set((state) => {
          const newDate = subWeeks(state.selectedDate, 1);
          return {
            selectedDate: newDate,
            weeks: updateWeeks(newDate, state.weeksSize, state.startDate),
          };
        }),
      moveOneWeekForward: () =>
        set((state) => {
          const newDate = addWeeks(state.selectedDate, 1);
          return {
            selectedDate: newDate,
            weeks: updateWeeks(newDate, state.weeksSize, state.startDate),
          };
        }),
      resetToCurrentWeek: () =>
        set((state) => ({
          selectedDate: new Date(),
          weeks: updateWeeks(new Date(), state.weeksSize, state.startDate),
        })),
      configureWeeks: ({ weeksSize, furious, meetingUrl, startDate }) => {
        set((state) => ({
          weeksSize,
          furious,
          meetingUrl,
          weeks: updateWeeks(state.selectedDate, weeksSize, startDate),
        }));
      },
    },
  };
});

export const useSelectedDate = () =>
  useTimelineStore((state) => state.selectedDate);
export const useWeeksSize = () => useTimelineStore((state) => state.weeksSize);
export const useWeeks = () => useTimelineStore((state) => state.weeks);
export const useStartDate = () => useTimelineStore((state) => state.startDate);
export const useMeetingUrl = () =>
  useTimelineStore((state) => state.meetingUrl);
export const useFurious = () => useTimelineStore((state) => state.furious);

export const useTimelineActions = () =>
  useTimelineStore((state) => state.actions);
