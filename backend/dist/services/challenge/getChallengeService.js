"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChallengeService = void 0;
const prisma_1 = require("../../prisma");
class GetChallengeService {
    async execute() {
        const challenges = await prisma_1.prisma.challenges.findMany({});
        return challenges;
    }
}
exports.GetChallengeService = GetChallengeService;
