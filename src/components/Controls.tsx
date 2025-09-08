import { ChevronDown, ChevronUp } from "lucide-react";

import {
  useMeetingUrl,
  useStartDate,
  useTimelineActions,
  useWeeks,
} from "@/store/timeline";

import { startOfWeek, subWeeks } from "date-fns";
import { useAuthActions } from "@/store/auth";
import { redirect } from "@tanstack/react-router";

const Controls = () => {
  const { logout } = useAuthActions();
  const weeks = useWeeks();
  const startDate = useStartDate();
  const meetingUrl = useMeetingUrl();
  const { resetToCurrentWeek, moveOneWeekAgo, moveOneWeekForward } =
    useTimelineActions();

  const previousWeekStart = startOfWeek(
    subWeeks(weeks[0]?.start ?? new Date(), 1),
    {
      weekStartsOn: 1,
    }
  );

  const handleLogout = () => {
    logout();
    redirect({ to: "/login" });
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="btn btn-circle"
        onClick={() => moveOneWeekAgo(startDate)}
        disabled={previousWeekStart < new Date(startDate)}
      >
        <ChevronUp />
      </button>
      <button
        className="btn btn-circle"
        onClick={() => moveOneWeekForward(startDate)}
      >
        <ChevronDown />
      </button>
      <button className="btn btn-outline  btn-sm" onClick={resetToCurrentWeek}>
        Semana en curso
      </button>
      <a
        className="btn btn-primary btn-sm"
        href={meetingUrl ?? "#"}
        target="_blank"
      >
        Open Daily
      </a>
      <button className="btn btn-ghost" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Controls;
