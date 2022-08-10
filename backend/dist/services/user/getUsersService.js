"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersService = void 0;
const prisma_1 = require("../../prisma");
class getUsersService {
    async execute() {
        const users = await prisma_1.prisma.users.findMany({});
        const newUsers = users.map((user) => {
            const { id, firstName, image } = user;
            return { id, firstName, image };
        });
        const profiles = await prisma_1.prisma.userProfile.findMany({});
        const challengesCompleted = await prisma_1.prisma.challengesCompleted.findMany({});
        const userToProfile = newUsers.map((user) => {
            const userProfile = profiles.find((profile) => {
                return profile.id === user.id;
            });
            const challengesCompletedByUser = challengesCompleted.filter((challenge) => {
                return challenge.userId === user.id;
            });
            return Object.assign(Object.assign(Object.assign({}, user), userProfile), { challengesCompleted: challengesCompletedByUser.length });
        });
        // userToProfile
        return userToProfile;
    }
}
exports.getUsersService = getUsersService;
