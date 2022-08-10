import { prisma } from "../../prisma";

interface userProfileData {
  userLevel: number;
  experience: number;
  challengeCompletedId: number;
}

interface updateProfileProps {
  userId: number;
  data: userProfileData;
}

export class UpdateProfileService {
  async execute({ data, userId }: updateProfileProps) {
    if (!data) {
      throw new Error("Data is required");
    }
    if (!data.challengeCompletedId || !data.userLevel || !data.experience) {
      const fields = {
        challengeCompletedId: !data.challengeCompletedId
          ? "challengeCompletedId is required"
          : "",
        userLevel: !data.userLevel ? "userLevel is required" : "",
        experience: !data.experience ? "experience is required" : "",
      };
      throw new Error(JSON.stringify(fields));
    }

    const userProfile = await prisma.userProfile.findFirst({
      where: {
        id: userId,
      },
    });

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    const challenge = await prisma.challenges.findFirst({
      where: {
        id: data.challengeCompletedId,
      },
    });

    if (!challenge) {
      throw new Error("Challenge not found");
    }

    await prisma.userProfile.update({
      where: {
        id: userId,
      },
      data: {
        userLevel: data.userLevel,
        experience: data.experience,
        challengesCompleted: {
          create: {
            userId: userId,
            challengesId: data.challengeCompletedId,
          },
        },
      },
    });

    const profile = await prisma.userProfile.findFirst({
      where: {
        id: userId,
      },
    });

    const challengeCompleted = await prisma.challengesCompleted.findMany({
      where: {
        userId,
      },
    });

    return {
      userProfile: profile,
      challengesCompleted: challengeCompleted.length,
    };
  }
}
