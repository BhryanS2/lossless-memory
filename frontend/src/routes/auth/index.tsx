import { Route, Routes } from "react-router-dom";

import Home from "../../pages/index";
import { Rank } from "../../pages/Rank";
import { Admin } from "../../pages/Admin";
import AdminContextProvider from "../../contexts/adminContext";

export function AuthRoutes() {
  return (
    <AdminContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AdminContextProvider>
  );
}
