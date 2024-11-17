import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "../auth/AuthContext";
import Header from "../components/Header";

export const Route = createRootRoute({
  // component: () => <Outlet />,
  component: () => (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  ),
});
