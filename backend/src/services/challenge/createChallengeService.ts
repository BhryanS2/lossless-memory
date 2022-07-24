import { prisma } from "../../prisma";
import { challengeType } from "../../types/auth";

export class CreateChallengeService {
  async execute(data: challengeType) {
    if (!data.amount || !data.description || !data.type) {
      const fields = {
        amount: !data.amount ? "amount is required" : "",
        description: !data.description ? "description is required" : "",
        type: !data.type ? "type is required" : "",
      };
      throw new Error(JSON.stringify(fields));
    }
    const challenge = await prisma.challenges.create({
      data: {
        amount: data.amount,
        description: data.description,
        type: data.type,
      },
    });
    return challenge;
  }
}
