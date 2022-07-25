import { ChallengesProvider } from "../contexts/ChallengeContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import { useAuth } from "../hooks/useAuth";
import { AppRoutes } from "./app";
import { AuthRoutes } from "./auth";

export function Routes() {
  const { isAuthenticated, profile } = useAuth();

  const props = {
    level: profile?.userProfile.userLevel ?? 1,
    currentExperience: profile?.userProfile.experience ?? 0,
    challengeComplete: profile?.challengesCompleted ?? 0,
  };

  if (isAuthenticated) {
    return (
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengeComplete={props.challengeComplete}
      >
        <CountdownProvider>
          <AuthRoutes />
        </CountdownProvider>
      </ChallengesProvider>
    );
  }
  return <AppRoutes />;
}
