// agora usamos o css module, ele funciona como um styleshhet em rect-native
import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } =
    useContext(ChallengesContext);

  // calcular o tanto que o usuario progrediu
  const percentToNextLevel = Math.round(
    (currentExperience * 100) / experienceToNextLevel
  );

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div
          style={{ width: `${percentToNextLevel ? percentToNextLevel : 0}%` }}
        />
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel ? percentToNextLevel : 0}%` }}
        >
          {currentExperience}
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
