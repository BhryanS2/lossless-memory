import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { ChallengesContext } from "./ChallengeContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  timeTotal: number;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

const timeToSet = 25 * 60;

export function CountdownProvider({ children }: ChallengesProviderProps) {
  const { startnewChallenge } = useContext(ChallengesContext);
  const [time, setTime] = useState(timeToSet);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFineshed] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(timeToSet);
    setHasFineshed(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFineshed(true);
      setIsActive(false);
      startnewChallenge();
    }
  }, [isActive, startnewChallenge, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
        timeTotal: timeToSet,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
