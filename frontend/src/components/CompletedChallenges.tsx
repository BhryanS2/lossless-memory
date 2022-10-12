import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengeComplete } = useContext(ChallengesContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengeComplete}</span>
    </div>
  );
}
