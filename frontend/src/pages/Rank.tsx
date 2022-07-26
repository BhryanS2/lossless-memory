import { useMemo, useState } from "react";
import { Navbar } from "../components/navbar";
import { getUsers, user } from "../services/API/getUsers";

import level from "../assets/icons/level.svg";

import styles from "../styles/pages/Rank.module.css";

export function Rank() {
  const [users, setUsers] = useState<user[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function orderByLevel(users: user[]) {
    return users.sort((a, b) => {
      if (a.userLevel > b.userLevel) {
        return -1;
      }
      if (a.userLevel < b.userLevel) {
        return 1;
      }
      return 0;
    });
  }

  useMemo(() => {
    document.title = "Rank | lossless";
    (async () => {
      const users = await getUsers();
      if (!users.message) return;
      setUsers(orderByLevel(users.message));
      setIsLoading(false);
    })();
  }, []);

  function getTotalExperience(user: user) {
    let totalExperience = 0;
    for (let i = 1; i < user.userLevel; i++) {
      const userExperience = Math.pow((i + 1) * 4, 2);
      totalExperience += userExperience;
    }
    totalExperience = Math.round(totalExperience + user.experience);
    return totalExperience;
  }

  if (isLoading || !users) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar toPath="/rank">
      <main className={styles.container}>
        <div className={styles.leaderboard}>
          <strong>Leaderboard</strong>

          <section className={styles.info}>
            <p className={styles.infoPosition}>POSIÇÃO</p>
            <p className={styles.infoUser}>USUÁRIO</p>
            <p className={styles.infoChallenge}>DESAFIOS</p>
            <p className={styles.infoExperience}>EXPERIÊNCIA</p>
          </section>

          {users.map((user, index) => (
            <section className={styles.users} key={user.id}>
              <div className={styles.position}>{index + 1}</div>

              {/* <div className={styles.userInfo}></div> */}

              <div className={styles.user}>
                <img
                  src={
                    user.image.length > 2
                      ? user.image
                      : "https://gravatar.com/avatar/placeholder?d=mp"
                  }
                  alt={user.firstName}
                />

                <div>
                  <strong>{user.firstName}</strong>
                  <p>
                    <img src={level} alt="level" />
                    Level {user.userLevel}
                  </p>
                </div>
              </div>

              <div className={styles.text}>
                <div>
                  <p>{user.challengesCompleted}</p>
                  <p>completados</p>
                </div>
              </div>

              <div className={styles.text}>
                <p>{getTotalExperience(user)}</p>
                <p>xp</p>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Navbar>
  );
}
