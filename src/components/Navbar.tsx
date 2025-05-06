import data from "@furious";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto max-w-3xl w-full flex justify-between items-center">
        <a className="btn btn-ghost text-xl">VeraFuriosos</a>
        <a
          className="btn btn-primary btn-sm"
          href={data.meetingUrl}
          target="_blank"
        >
          Open Daily
        </a>
      </div>
    </div>
  );
};

export default Navbar;
