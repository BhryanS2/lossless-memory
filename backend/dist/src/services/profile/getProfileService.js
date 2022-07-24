"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileService = void 0;
const prisma_1 = require("../../prisma");
class getProfileService {
    async execute(userId) {
        const profile = await prisma_1.prisma.userProfile.findFirst({
            where: {
                id: userId,
            },
        });
        if (!profile) {
            throw new Error("Profile not exists");
        }
        const challenges = await prisma_1.prisma.challengesCompleted.findMany({
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
exports.getProfileService = getProfileService;
