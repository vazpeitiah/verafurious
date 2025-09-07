import { useWeeks } from "@/store/timeline";

import TimelineItem from "./TimelineItem";

const TimeLine = () => {
  const weeks = useWeeks();

  return (
    <div className="max-w-3xl mx-auto mt-12 flex items-center flex-col gap-6">
      <ul className="timeline timeline-snap-icon timeline-vertical">
        {weeks.map((range, index) => (
          <li key={index}>
            <TimelineItem
              range={range}
              index={index}
              isLast={index === weeks.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeLine;
