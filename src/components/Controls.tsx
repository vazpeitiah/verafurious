import { ChevronDown, ChevronUp } from "lucide-react";

import { useTimelineActions, useWeeks } from "@/store/timeline";

import { meetingUrl, startDate } from "@furious";
import { startOfWeek, subWeeks } from "date-fns";

const Controls = () => {
  const weeks = useWeeks();
  const { resetToCurrentWeek, moveOneWeekAgo, moveOneWeekForward } =
    useTimelineActions();

  const previousWeekStart = startOfWeek(subWeeks(weeks[0].start, 1), {
    weekStartsOn: 1,
  });

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="btn btn-circle"
        onClick={moveOneWeekAgo}
        disabled={previousWeekStart < new Date(startDate)}
      >
        <ChevronUp />
      </button>
      <button className="btn btn-circle" onClick={moveOneWeekForward}>
        <ChevronDown />
      </button>
      <button className="btn btn-outline  btn-sm" onClick={resetToCurrentWeek}>
        Semana en curso
      </button>
      <a className="btn btn-primary btn-sm" href={meetingUrl} target="_blank">
        Open Daily
      </a>
    </div>
  );
};

export default Controls;
