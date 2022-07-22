import { prisma } from "../prisma";

export class AdminService {
  async execute() {
    const users = await prisma.users.findMany({});
    return users;
  }
}
