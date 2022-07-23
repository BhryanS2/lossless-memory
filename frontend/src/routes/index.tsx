import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app";
import { AuthRoutes } from "./auth";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AuthRoutes /> : <AppRoutes />;
}
