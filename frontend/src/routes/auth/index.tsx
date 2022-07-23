import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import { useAuth } from "../../hooks/useAuth";

import Home from "../../pages/index";
import { Rank } from "../../pages/Rank";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export function AuthRoutes() {
  const { user } = useAuth();
  const name = user?.firstName;
  const props: HomeProps = {
    level: Number(Cookies.get(`level.${name}`) ?? "1"),
    currentExperience: Number(Cookies.get(`currentExperience.${name}`) ?? "0"),
    challengeComplete: Number(Cookies.get(`challengeComplete.${name}`) ?? "0"),
  };

  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
}
