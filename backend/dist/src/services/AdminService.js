"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const prisma_1 = require("../prisma");
class AdminService {
    async execute() {
        const users = await prisma_1.prisma.users.findMany({});
        // delete users.password;
        users.map((user) => {
            delete user.password;
            return user;
        });
        // const userProfiles = await prisma.userProfile.findMany({});
        // const challengesCompleted = await prisma.challengesCompleted.findMany({});
        // const challenges = await prisma.challenges.findMany({});
        // const userToProfile = users.map((user) => {
        //   const userProfile = userProfiles.find((profile) => {
        //     return profile.id === user.id;
        //   });
        //   const challengesCompletedByUser = challengesCompleted.filter(
        //     (challenge) => {
        //       return challenge.userId === user.id;
        //     }
        //   );
        //   const challengesCompletedDetails = challenges.map((challenge) => {
        //     const challenges = challengesCompletedByUser.filter(
        //       (challengeCompleted) => {
        //         return challengeCompleted.challengesId === challenge.id;
        //       }
        //     );
        //     return challenges.length;
        //   });
        //   const challengesPromises =  prisma.challengesCompleted.findMany({
        //     where: {
        //       userId: user.id,
        //     },
        //   });
        //   const challengesCompletedByUserPromise = Promise.all(challengesPromises).then(response => {
        //     return response.length;
        //   });
        //   return {
        //     ...user,
        //     ...userProfile,
        //     challengesCompleted: challengesCompletedDetails.length,
        //     challengesCount: challengesCompletedByUserPromise.length,
        //   };
        // });
        const profiles = await prisma_1.prisma.userProfile.findMany({});
        const challengesCompleted = await prisma_1.prisma.challengesCompleted.findMany({});
        const userToProfile = users.map((user) => {
            const userProfile = profiles.find((profile) => {
                return profile.id === user.id;
            });
            const challengesCompletedByUser = challengesCompleted.filter((challenge) => {
                return challenge.userId === user.id;
            });
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
exports.AdminService = AdminService;
