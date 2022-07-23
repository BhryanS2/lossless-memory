// agora usamos o css module, ele funciona como um styleshhet em rect-native
import { useContext } from "react";

import { ChallengesContext } from "../contexts/ChallengeContext";
import { useAuth } from "../hooks/useAuth";

import levelIcon from "../assets/icons/level.svg";

import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const { user } = useAuth();
  const { level } = useContext(ChallengesContext);
  const userImage =
    user?.image || "https://gravatar.com/avatar/placeholder?d=mp";

  return (
    <div className={styles.profileContainer}>
      <img src={userImage} alt={user?.firstName} />
      <div>
        <strong>
          {user?.firstName} {user?.lastName}
        </strong>
        <p>
          <img src={levelIcon} alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
