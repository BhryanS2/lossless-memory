import { prisma } from "../../prisma";

export class getUsersService {
  async execute() {
    const users = await prisma.users.findMany({});

    const newUsers = users.map((user) => {
      const { id, firstName, image } = user;
      return { id, firstName, image };
    });

    const profiles = await prisma.userProfile.findMany({});
    const challengesCompleted = await prisma.challengesCompleted.findMany({});

    const userToProfile = newUsers.map((user) => {
      const userProfile = profiles.find((profile) => {
        return profile.id === user.id;
      });

      const challengesCompletedByUser = challengesCompleted.filter(
        (challenge) => {
          return challenge.userId === user.id;
        }
      );

      return {
        ...user,
        ...userProfile,
        challengesCompleted: challengesCompletedByUser.length,
      };
    });
    // userToProfile
    return userToProfile;
  }
}
