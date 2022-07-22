import { prisma } from "../../prisma";

export class DeleteService {
  async execute(userId: number) {
    const users = prisma.users;
    const user = await users.delete({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
