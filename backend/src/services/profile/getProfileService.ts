import { prisma } from "../../prisma";

export class getProfileService {
  async execute(userId: number) {
    const profile = await prisma.userProfile.findFirst({
      where: {
        id: userId,
      },
    });
    if (!profile) {
      throw new Error("Profile not exists");
    }
    const challenges = await prisma.challengesCompleted.findMany({
      where: {
        userId,
      },
    });

    return {
      userProfile: profile,
      challengesCompleted: challenges.length,
    };
  }
}
