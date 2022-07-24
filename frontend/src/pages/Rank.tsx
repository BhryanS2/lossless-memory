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
    (async () => {
      const users = await getUsers();
      if (!users.message) return;
      setUsers(orderByLevel(users.message));
      setIsLoading(false);
    })();
  }, []);

  if (isLoading || !users) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar isHome={false} isRank>
      <main className={styles.container}>
        <div className={styles.leaderboard}>
          <strong>Leaderboard</strong>

          <section className={styles.info}>
            <p>POSIÇÃO</p>
            <p>USUÁRIO</p>
            <p>DESAFIOS</p>
            <p>EXPERIÊNCIA</p>
          </section>

          {users.map((user, index) => (
            <section className={styles.users}>
              <div className={styles.position}>{index + 1}</div>

              <div className={styles.userInfo}>
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
                  <p>{user.challengesCompleted}</p>
                  <p>completados</p>
                </div>

                <div className={styles.text}>
                  <p>
                    {Math.round(Math.pow(user.experience / user.userLevel, 2))}
                  </p>
                  <p>xp</p>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </Navbar>
  );
}
