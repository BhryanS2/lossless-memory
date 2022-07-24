import { prisma } from "../../prisma";

export class GetChallengeService {
  async execute() {
    const challenges = await prisma.challenges.findMany({});
    return challenges;
  }
}
