import { prisma } from "../prisma";

export class AdminService {
  async execute() {
    const users = await prisma.users.findMany({});
    // delete users.password;
    users.map((user) => {
      delete user.password;
      return user;
    });

    const userProfiles = await prisma.userProfile.findMany({});
    const challengesCompleted = await prisma.challengesCompleted.findMany({});
    const challenges = await prisma.challenges.findMany({});

    const userToProfile = users.map((user) => {
      const userProfile = userProfiles.find((profile) => {
        return profile.id === user.id;
      });

      const challengesCompletedByUser = challengesCompleted.filter(
        (challenge) => {
          return challenge.userId === user.id;
        }
      );

      const challengesCompletedDetails = challenges.map((challenge) => {
        const challenges = challengesCompletedByUser.filter(
          (challengeCompleted) => {
            return challengeCompleted.challengesId === challenge.id;
          }
        );
        return challenges;
      });

      return {
        ...user,
        ...userProfile,
        challengesCompleted: challengesCompletedDetails,
      };
    });

    return userToProfile;
  }
}
