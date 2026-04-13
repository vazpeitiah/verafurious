import { addWeeks } from "date-fns";
import { Panda, User } from "lucide-react";
import { useState } from "react";

import { furious } from "@furious";
import { calculateFurious } from "@/utils/furious";
import { formatRange, getWeekRangeFromDate } from "@/utils/helpers";

// Un ciclo completo = número de furiosos en rotación
const CYCLE = furious.length;

const TimeLine = () => {
  const [pandaKey, setPandaKey] = useState(0);

  const todayRange = getWeekRangeFromDate(new Date());

  // Próximas semanas para completar el ciclo (excluyendo la actual)
  const nextWeeks = Array.from({ length: CYCLE - 1 }, (_, i) =>
    getWeekRangeFromDate(addWeeks(new Date(), i + 1))
  );

  return (
    <div className="max-w-lg mx-auto mt-8 px-4 pb-12 flex flex-col gap-6">

      {/* Hero — semana actual */}
      <div
        className="animate-pop-in bg-primary text-primary-content rounded-2xl p-6 sm:p-8 flex flex-col gap-3 shadow-lg cursor-default select-none"
        onMouseEnter={() => setPandaKey((k) => k + 1)}
      >
        <span className="text-xs font-semibold uppercase tracking-widest opacity-75">
          Semana actual
        </span>
        <div className="flex items-center gap-3 sm:gap-4">
          <span
            key={pandaKey}
            className={pandaKey === 0 ? "animate-float shrink-0" : "animate-wiggle shrink-0"}
          >
            <Panda size={32} className="sm:size-9" />
          </span>
          <span className="text-2xl sm:text-3xl font-black leading-tight">
            {calculateFurious(todayRange)}
          </span>
        </div>
        <time className="font-mono text-sm opacity-75">
          {formatRange(todayRange)}
        </time>
      </div>

      {/* Proximas semanas — ciclo completo */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/50 px-1">
          Proximas semanas
        </h2>
        <ul className="flex flex-col gap-2">
          {nextWeeks.map((range, i) => (
            <li
              key={i}
              className="animate-slide-in flex flex-row items-center justify-between gap-2 py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <User size={16} className="text-base-content/40 shrink-0" />
                <span className="font-semibold truncate">
                  {calculateFurious(range)}
                </span>
              </div>
              <time className="font-mono text-xs text-base-content/50 shrink-0 text-right">
                {formatRange(range)}
              </time>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default TimeLine;
