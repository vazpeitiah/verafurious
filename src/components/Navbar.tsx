import { CalendarPlus } from "lucide-react";

import { meetingUrl } from "@furious";
import { buildOutlookDailyUrl } from "@/utils/calendar";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto max-w-2xl w-full flex flex-wrap justify-between items-center gap-y-2 px-4">
        <span className="text-xl font-bold">VeraFuriosos</span>
        <div className="flex items-center gap-2">
          <a
            className="btn btn-outline btn-sm"
            href={buildOutlookDailyUrl()}
            target="_blank"
            rel="noreferrer"
            title="Agregar la daily a Outlook"
          >
            <CalendarPlus size={16} />
            Agregar a Outlook
          </a>
          <a
            className="btn btn-primary btn-sm"
            href={meetingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Daily ↗
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
