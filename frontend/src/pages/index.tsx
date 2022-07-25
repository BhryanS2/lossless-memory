import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { Navbar } from "../components/navbar";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  document.title = "Home | lossless";
  return (
    <Navbar isHome isRank={false}>
      <div className={styles.container}>
        <ExperienceBar />
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
      </div>
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
