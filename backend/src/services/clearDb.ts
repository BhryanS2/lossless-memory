import { prisma } from "../prisma";

export class DeleteManyDb {
  async execute(userId: number) {
    if (userId === NaN) {
      throw new Error("User id is not a number");
    }

    const user = await prisma.users.findFirst({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.userTypeId !== 1) {
      throw new Error("User is not admin");
    }

    const users = await prisma.users.findMany({});
    const userLog = await prisma.userLogs.findMany({});
    const userType = await prisma.userType.findMany({});
    const userProfile = await prisma.userProfile.findMany({});

    const deleteUser = async (user) => {
      return await prisma.users.delete({
        where: { id: user.id },
      });
    };

    const deleteUsersLogs = async (logs) => {
      return await prisma.userLogs.delete({
        where: { id: logs.id },
      });
    };

    const deleteUserType = async (userType) => {
      return await prisma.userType.delete({
        where: { id: userType.id },
      });
    };

    const deleteUserProfile = async (userProfile) => {
      return await prisma.userProfile.delete({
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
      return Promise.all(
        userProfile.map((userProfile) => deleteUserProfile(userProfile))
      );
    };

    await deleteUsers();
    await deleteUsersLogss();
    await deleteUserTypess();
    await deleteUserProfiless();
  }
}
