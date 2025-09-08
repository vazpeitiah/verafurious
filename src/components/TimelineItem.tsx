import { memo } from "react";
import { clsx } from "clsx";
import { isPast } from "date-fns";
import { Panda, User } from "lucide-react";

import { formatRange, isDateBetween } from "@/utils/helpers";
import type { DateRange } from "@/utils/types";

import TimelineIcon from "./TimelineIcon";
import { calculateFurious } from "@/utils/furious";
import { useFurious, useStartDate } from "@/store/timeline";

interface TimelineItemProps {
  range: DateRange;
  index: number;
  isLast: boolean;
}

const TimelineItem = ({ range, index, isLast }: TimelineItemProps) => {
  const startDate = useStartDate();
  const furious = useFurious();
  const currentRange = isDateBetween(range, new Date());
  const isPastRange = isPast(range.end);

  return (
    <>
      <div className="timeline-middle">
        <TimelineIcon currentRange={currentRange} isPastRange={isPastRange} />
      </div>
      <div
        className={clsx(
          "timeline-start timeline-box mb-10 md:text-start text-end min-h-24 flex flex-col justify-center gap-2",
          {
            "bg-primary text-primary-content": currentRange,
            "opacity-60": isPastRange,
            "timeline-end": index % 2 === 0,
          }
        )}
      >
        <time className="font-mono italic text-sm">{formatRange(range)}</time>
        <div className="text-xl font-black flex items-center gap-3">
          {currentRange ? <Panda /> : <User />}
          {calculateFurious(furious, startDate, range)}
        </div>
      </div>
      {!isLast && (
        <hr
          className={clsx({
            "bg-primary": currentRange,
            "opacity-60": isPastRange,
          })}
        />
      )}
    </>
  );
};

export default memo(TimelineItem);
