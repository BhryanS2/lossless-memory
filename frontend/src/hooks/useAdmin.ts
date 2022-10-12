import { useContext } from "react";
import { AdminContext } from "../contexts/adminContext";

export function useAdmin() {
  const auth = useContext(AdminContext);
  return auth;
}
