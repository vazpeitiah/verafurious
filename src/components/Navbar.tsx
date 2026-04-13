import { meetingUrl } from "@furious";

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto max-w-2xl w-full flex justify-between items-center px-4">
        <span className="text-xl font-bold">VeraFuriosos</span>
        <a
          className="btn btn-primary btn-sm"
          href={meetingUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open Daily ↗
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
