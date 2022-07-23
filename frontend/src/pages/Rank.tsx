import { useEffect, useState } from "react";
import { Navbar } from "../components/navbar";
import { getUsers, user } from "../services/API/getUsers";

import styles from "../styles/pages/Rank.module.css";

export function Rank() {
  const [users, setUsers] = useState<user[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  function ordUserByScore(users: user[]) {
    return users.sort((a, b) => b.experience - a.experience);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const message = await getUsers();
        const users = message.message;
        ordUserByScore(users);
        setUsers(users);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading || !users) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar isHome={false} isRank>
      <main className={styles.Container}>
        <section>
          <div>
            <h1>Leaderboard</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Desafios</th>
                <th>Experiência</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName} </td>
                    <td>{user.challengesCompleted.length}</td>
                    <td>{user.experience}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </Navbar>
  );
}
