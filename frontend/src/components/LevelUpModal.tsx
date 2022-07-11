import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";

import close from "../assets/icons/close.svg";

import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src={close} alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}
