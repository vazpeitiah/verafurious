import { useIsAuth } from "@/store/auth";
import Controls from "./Controls";

const Navbar = () => {
  const isAuth = useIsAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="mx-auto max-w-3xl w-full flex justify-between items-center">
        <a className="btn btn-ghost text-xl">VeraFuriosos</a>
        {isAuth ? <Controls /> : null}
      </div>
    </div>
  );
};

export default Navbar;
