import { AppRoutes } from "./app";
import { AuthRoutes } from "./auth";

export function Routes() {
  // const { isAuthenticated, loading } = useAuthContext();

  // if (loading) return <Load />;

  // return isAuthenticated ? <Home /> : <AppRoutes />;
  const isAuthenticated = true;
  return isAuthenticated ? <AuthRoutes /> : <AppRoutes />;
}
