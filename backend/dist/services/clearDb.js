"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManyDb = void 0;
const prisma_1 = require("../prisma");
class DeleteManyDb {
    async execute(userId) {
        if (userId === NaN) {
            throw new Error("User id is not a number");
        }
        const user = await prisma_1.prisma.users.findFirst({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.userTypeId !== 1) {
            throw new Error("User is not admin");
        }
        const users = await prisma_1.prisma.users.findMany({});
        const userLog = await prisma_1.prisma.userLogs.findMany({});
        const userType = await prisma_1.prisma.userType.findMany({});
        const userProfile = await prisma_1.prisma.userProfile.findMany({});
        const deleteUser = async (user) => {
            return await prisma_1.prisma.users.delete({
                where: { id: user.id },
            });
        };
        const deleteUsersLogs = async (logs) => {
            return await prisma_1.prisma.userLogs.delete({
                where: { id: logs.id },
            });
        };
        const deleteUserType = async (userType) => {
            return await prisma_1.prisma.userType.delete({
                where: { id: userType.id },
            });
        };
        const deleteUserProfile = async (userProfile) => {
            return await prisma_1.prisma.userProfile.delete({
                where: { id: userProfile.id },
            });
        };
        const deleteUsers = async () => {
            return Promise.all(users.map((user) => deleteUser(user)));
        };
        const deleteUsersLogss = async () => {
            return Promise.all(userLog.map((log) => deleteUsersLogs(log)));
        };
        const deleteUserTypess = async () => {
            return Promise.all(userType.map((userType) => deleteUserType(userType)));
        };
        const deleteUserProfiless = async () => {
            return Promise.all(userProfile.map((userProfile) => deleteUserProfile(userProfile)));
        };
        await deleteUsers();
        await deleteUsersLogss();
        await deleteUserTypess();
        await deleteUserProfiless();
    }
}
exports.DeleteManyDb = DeleteManyDb;
