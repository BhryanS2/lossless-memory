// componentes
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { Navbar } from "../components/navbar";

import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengeContext";

// style
import styles from "../styles/pages/Home.module.css";

type HomeProps = {
  level: number;
  currentExperience: number;
  challengeComplete: number;
};

export default function Home(props: HomeProps) {
  return (
    <Navbar isHome isRank={false}>
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengeComplete={props.challengeComplete}
      >
        <div className={styles.container}>
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div className={styles.challengeBox}>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </Navbar>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { level, currentExperience, challengeComplete } = ctx.req.cookies;

//   return {
//     props: {
//       level: Number(level),
//       currentExperience: Number(currentExperience),
//       challengeComplete: Number(challengeComplete),
//     },
//   };
// };
