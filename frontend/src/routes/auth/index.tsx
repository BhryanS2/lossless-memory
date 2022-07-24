import { Route, Routes } from "react-router-dom";
// import Cookies from "js-cookie";

import { useAuth } from "../../hooks/useAuth";

import Home from "../../pages/index";
import { Rank } from "../../pages/Rank";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export function AuthRoutes() {
  const { profile } = useAuth();

  const props: HomeProps = {
    level: profile?.userProfile.userLevel ?? 1,
    currentExperience: profile?.userProfile.experience ?? 0,
    challengeComplete: profile?.challengesCompleted ?? 0,
  };

  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/rank" element={<Rank />} />
    </Routes>
  );
}
