import Navbar from "@/components/Navbar";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

interface AuthContext {
  auth: boolean;
}

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
};

export const Route = createRootRouteWithContext<AuthContext>()({
  component: RootLayout,
});
