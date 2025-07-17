import { generateCalendar } from "@/utils/helpers";
import { nanoid } from "nanoid";
import data from "@furious";
import clsx from "clsx";

const TimeLine = () => {
  const items = generateCalendar(
    data.furious.map((f) => ({ ...f, id: nanoid() })),
    new Date(2025, 6, 17),
    data.totalWeeks
  );

  return (
    <ul className="timeline timeline-vertical">
      {items.map((item, index) => (
        <li key={item.employee.id}>
          {index !== 0 && <hr />}
          <div
            className={clsx("timeline-box", {
              ["timeline-start"]: index % 2 === 0,
              ["timeline-end"]: index % 2 !== 0,
              ["bg-primary-content"]: item.isCurrentWeek,
            })}
          >
            <div className="flex flex-col gap-2 text-lg">
              <strong>{item.employee.name}</strong>
              <time className="text-sm text-gray-500">
                {item.begin.toLocaleDateString("es-MX")} -{" "}
                {item.end.toLocaleDateString("es-MX")}
              </time>
            </div>
          </div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {index !== items.length - 1 && <hr />}
        </li>
      ))}
    </ul>
  );
};

export default TimeLine;
