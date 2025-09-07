import Controls from "./Controls";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto max-w-3xl w-full flex justify-between items-center">
        <a className="btn btn-ghost text-xl">VeraFuriosos</a>
        <Controls />
      </div>
    </div>
  );
};

export default Navbar;
