"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutService = void 0;
const prisma_1 = require("../../prisma");
class LogoutService {
    static async execute(userId) {
        // set token to null and save logs in database
        const userLog = await prisma_1.prisma.userLogs.findMany({
            where: {
                UserId: userId,
            },
        });
        if (!userLog) {
            throw new Error("User not found");
        }
        const userLogsNotLogged = userLog.filter((log) => log.logout === null);
        if (!userLogsNotLogged.length) {
            throw new Error("User not logged");
        }
        const userLogs = prisma_1.prisma.userLogs;
        await userLogs.update({
            where: {
                id: userLogsNotLogged[0].id,
            },
            data: {
                logout: new Date(),
            },
        });
        return "User logged out";
    }
}
exports.LogoutService = LogoutService;
