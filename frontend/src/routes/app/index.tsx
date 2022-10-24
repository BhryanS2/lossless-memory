import { Route, Routes } from "react-router-dom";

import { Login } from "../../pages/Login";
import { Signup } from "../../pages/Signup";
import { ChangePassword } from "../../pages/ChangePassoword";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<ChangePassword />} />
    </Routes>
  );
}
