import { ChevronLeft, ChevronRight, Panda } from "lucide-react";
import { startOfWeek, subWeeks } from "date-fns";

import { startDate } from "@furious";
import { useWeeks, useTimelineActions } from "@/store/timeline";
import {
  formatRange,
  getWeekRangeFromDate,
  isDateBetween,
  isPastRange,
} from "@/utils/helpers";
import { calculateFurious } from "@/utils/furious";

const TimeLine = () => {
  const weeks = useWeeks();
  const { moveOneWeekAgo, moveOneWeekForward, resetToCurrentWeek } =
    useTimelineActions();

  const todayRange = getWeekRangeFromDate(new Date());

  const pastWeeks = weeks.filter((range) => isPastRange(range));
  const futureWeeks = weeks.filter(
    (range) =>
      !isPastRange(range) && !isDateBetween(range, new Date())
  );

  const previousWeekStart = startOfWeek(subWeeks(weeks[0].start, 1), {
    weekStartsOn: 1,
  });
  const canGoBack = previousWeekStart >= new Date(startDate);

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 flex flex-col gap-8">
      {/* Hero - semana actual (siempre muestra hoy) */}
      <div className="bg-primary text-primary-content rounded-2xl p-8 flex flex-col gap-3 shadow-lg">
        <span className="text-xs font-semibold uppercase tracking-widest opacity-75">
          Semana actual
        </span>
        <div className="flex items-center gap-4">
          <Panda size={36} />
          <span className="text-3xl font-black">
            {calculateFurious(todayRange)}
          </span>
        </div>
        <time className="font-mono text-sm opacity-75">
          {formatRange(todayRange)}
        </time>
      </div>

      {/* Navegacion */}
      <div className="flex justify-between items-center">
        <button
          className="btn btn-outline btn-sm gap-1"
          onClick={moveOneWeekAgo}
          disabled={!canGoBack}
        >
          <ChevronLeft size={16} /> Anterior
        </button>
        <button
          className="btn btn-ghost btn-xs text-base-content/50"
          onClick={resetToCurrentWeek}
        >
          Hoy
        </button>
        <button
          className="btn btn-outline btn-sm gap-1"
          onClick={moveOneWeekForward}
        >
          Siguiente <ChevronRight size={16} />
        </button>
      </div>

      {/* Semanas anteriores */}
      {pastWeeks.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
            Semanas anteriores
          </h2>
          <ul className="flex flex-col gap-2">
            {[...pastWeeks].reverse().map((range, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-3 px-4 rounded-xl bg-base-200 opacity-60"
              >
                <time className="font-mono text-sm">{formatRange(range)}</time>
                <span className="font-semibold">{calculateFurious(range)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Proximas semanas */}
      {futureWeeks.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/50">
            Proximas semanas
          </h2>
          <ul className="flex flex-col gap-2">
            {futureWeeks.map((range, i) => (
              <li
                key={i}
                className="flex justify-between items-center py-3 px-4 rounded-xl bg-base-200"
              >
                <time className="font-mono text-sm">{formatRange(range)}</time>
                <span className="font-semibold">{calculateFurious(range)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default TimeLine;
