// agora usamos o css module, ele funciona como um styleshhet em rect-native
import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengeContext";

import levelIcon from "../assets/icons/level.svg";

import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/bhryans2.png" alt="bhryans2" />
      <div>
        <strong>Bhryan</strong>
        <p>
          <img src={levelIcon} alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
