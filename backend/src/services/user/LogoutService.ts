import { prisma } from "../../prisma";
export class LogoutService {
  static async execute(userId: number) {
    // set token to null and save logs in database
    const userLog = await prisma.userLogs.findMany({
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

    const userLogs = prisma.userLogs;
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
