import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import Home from "../../pages/index";
import { Rank } from "../../pages/Rank";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export function AuthRoutes() {
  // Cookies.set("level", String(level));
  // Cookies.set("currentExperience", String(currentExperience));
  // Cookies.set("challengeComplete", String(challengeComplete));
  const props: HomeProps = {
    level: Number(Cookies.get("level")) ?? 0,
    currentExperience: Number(Cookies.get("currentExperience")) ?? 0,
    challengeComplete: Number(Cookies.get("challengeComplete")) ?? 0,
  };

  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
}
