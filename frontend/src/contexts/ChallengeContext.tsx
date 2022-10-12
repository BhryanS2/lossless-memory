import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { LevelUpModal } from "../components/LevelUpModal";

import { useAuth } from "../hooks/useAuth";
import { challengeProps } from "../@types";

import { getChallenge } from "../services/API/getChallenge";
import { updateProfile } from "../services/API/updateProfile";

import { challenges } from "./challenges";

type Challenge = {
  id: number;
  type: "body" | "eye";
  description: String;
  amount: number;
};

type ChallengesContextData = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
  activeChallenge: Challenge | null;
  experienceToNextLevel: number;
  levelUp: () => void;
  startnewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
};

type ChallengesProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const { user } = useAuth();

  const name = user?.firstName;
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengeComplete, setChallengeComplete] = useState(
    rest.challengeComplete ?? 0
  );

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null
  );

  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
    getChallengeInApi();
  }, []);

  useEffect(() => {
    Cookies.set(`level.${name}`, String(level));
    Cookies.set(`currentExperience.${name}`, String(currentExperience));
    Cookies.set(`challengeComplete.${name}`, String(challengeComplete));
  }, [level, currentExperience, challengeComplete, name]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startnewChallenge() {
    const challengesString = localStorage.getItem("@lossless.Challenges");
    let Challenges = challenges;
    if (challengesString !== null) {
      const challengesParsed = JSON.parse(challengesString) as challengeProps[];
      Challenges = challengesParsed;
    }

    const randomChallengeIndex = Math.floor(Math.random() * Challenges.length);
    const challenge = Challenges[randomChallengeIndex];
    const newActiveChallenge = {
      id: challenge.id,
      type: challenge.type as "body" | "eye",
      description: challenge.description,
      amount: challenge.amount,
    };
    setActiveChallenge(newActiveChallenge);

    new Audio("../assets/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio", {
        body: `Valendo ${challenge.amount} xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return;
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setChallengeComplete(challengeComplete + 1);
    updateProfile({
      challengeCompletedId: activeChallenge.id,
      experience: finalExperience,
      userLevel: finalExperience >= experienceToNextLevel ? level + 1 : level,
    }).then((res) => {
      const profile = res.message;
      if (!res.success) {
        return;
      }
      localStorage.setItem("@lossless.Profile", JSON.stringify(profile));
    });
    setActiveChallenge(null);
  }

  async function getChallengeInApi() {
    const response = await getChallenge();
    if (!response.success) return;
    const challenge = response.message as challengeProps[];

    localStorage.setItem("@lossless.Challenges", JSON.stringify(challenge));
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengeComplete,
        levelUp,
        experienceToNextLevel,
        startnewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
