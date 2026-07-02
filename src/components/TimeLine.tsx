import { addWeeks } from "date-fns";
import { CalendarPlus, Home, Panda, User } from "lucide-react";
import { useState } from "react";

import { furious } from "@furious";
import { buildDailyIcsFile, downloadIcsFile } from "@/utils/calendar";
import { calculateFurious } from "@/utils/furious";
import {
  formatHomeOfficeDays,
  formatRange,
  getWeekRangeFromDate,
} from "@/utils/helpers";
import type { DateRange } from "@/utils/types";

// Un ciclo completo = número de furiosos en rotación
const CYCLE = furious.length;

const TimeLine = () => {
  const [pandaKey, setPandaKey] = useState(0);

  const todayRange = getWeekRangeFromDate(new Date());

  // Próximas semanas para completar el ciclo (excluyendo la actual)
  const nextWeeks = Array.from({ length: CYCLE - 1 }, (_, i) =>
    getWeekRangeFromDate(addWeeks(new Date(), i + 1))
  );

  const furiousWithHomeOffice = furious.filter(
    (member) => member.homeOffice.length > 0
  );

  const addWeekToCalendar = (range: DateRange, personName: string) => {
    const { filename, content } = buildDailyIcsFile(range, personName);
    downloadIcsFile(filename, content);
  };

  const currentPerson = calculateFurious(todayRange);

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
            {currentPerson}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <time className="font-mono text-sm opacity-75">
            {formatRange(todayRange)}
          </time>
          <button
            className="btn btn-sm border-none bg-primary-content/10 hover:bg-primary-content/20 text-primary-content"
            onClick={() => addWeekToCalendar(todayRange, currentPerson)}
            title="Agregar los 5 días de esta semana a Outlook"
          >
            <CalendarPlus size={16} />
            Agregar semana
          </button>
        </div>
      </div>

      {/* Proximas semanas — ciclo completo */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/50 px-1">
          Proximas semanas
        </h2>
        <ul className="flex flex-col gap-2">
          {nextWeeks.map((range, i) => {
            const person = calculateFurious(range);
            return (
              <li
                key={i}
                className="animate-slide-in flex flex-col sm:flex-row sm:items-center items-start justify-between gap-2 py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                  <User size={16} className="text-base-content/40 shrink-0" />
                  <span className="font-semibold truncate">{person}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  <time className="font-mono text-xs text-base-content/50 text-right">
                    {formatRange(range)}
                  </time>
                  <button
                    className="btn btn-xs btn-ghost btn-circle"
                    onClick={() => addWeekToCalendar(range, person)}
                    title={`Agregar los 5 días de ${person} a Outlook`}
                  >
                    <CalendarPlus size={14} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Home office — días fijos por integrante */}
      {furiousWithHomeOffice.length > 0 && (
        <section className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-base-content/50 px-1">
            Home office
          </h2>
          <ul className="flex flex-col gap-2">
            {furiousWithHomeOffice.map((member, i) => (
              <li
                key={member.ordinal}
                className="animate-slide-in flex flex-row items-center justify-between gap-2 py-3 px-4 rounded-xl bg-base-200 hover:bg-base-300 transition-colors"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Home size={16} className="text-base-content/40 shrink-0" />
                  <span className="font-semibold truncate">{member.name}</span>
                </div>
                <span className="font-mono text-xs text-base-content/50 shrink-0 text-right">
                  {formatHomeOfficeDays(member.homeOffice)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
};

export default TimeLine;
