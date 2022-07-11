import { Route, Routes } from "react-router-dom";

import { Login } from "../../pages/Login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" children={<Login />} />
    </Routes>
  );
}
