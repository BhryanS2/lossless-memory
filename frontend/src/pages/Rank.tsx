import { Navbar } from "../components/navbar";

import styles from "../styles/pages/Rank.module.css";

export function Rank() {
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
              <tr>
                <td>a</td>
                <td>a</td>
                <td>a</td>
                <td>a</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </Navbar>
  );
}
