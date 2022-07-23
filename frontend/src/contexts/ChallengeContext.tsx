// neverstoplearning
import { createContext, ReactNode, useEffect, useState } from "react";

// cookies
import Cookies from "js-cookie";

import { useAuth } from "../hooks/useAuth";

import { LevelUpModal } from "../components/LevelUpModal";

// desafios
import { challenges } from "./challenges";

// dados do challenge (dos desafios)
type Challenge = {
  type: "body" | "eye";
  description: String;
  amount: number;
};

// tipo do value do ChallengesProviderProps
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

// tipo do children
type ChallengesProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

// esse context serve para um componente se comunicar com outro
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
  // estado do modal
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  // calcular a experiência do usuário
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  // pedir para o usuário permitir notificação
  useEffect(() => {
    Notification.requestPermission();
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

  // fechar modal
  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  // mostra um desafio aleatorio
  function startnewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    const newActiveChallenge = {
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

  // zera o desafio
  function resetChallenge() {
    setActiveChallenge(null);
  }

  // desafio completo
  function completeChallenge() {
    if (!activeChallenge) return;
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeComplete(challengeComplete + 1);
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
