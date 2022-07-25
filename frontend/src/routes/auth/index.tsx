import { Route, Routes } from "react-router-dom";

import Home from "../../pages/index";
import { Rank } from "../../pages/Rank";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
}
