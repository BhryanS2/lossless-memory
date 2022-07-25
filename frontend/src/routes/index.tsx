import { CountdownProvider } from "../contexts/CountdownContext";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app";
import { AuthRoutes } from "./auth";

export function Routes() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return (
      <CountdownProvider>
        <AuthRoutes />
      </CountdownProvider>
    );
  }
  return <AppRoutes />;
}
