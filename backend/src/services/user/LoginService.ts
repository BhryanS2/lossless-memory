import { prisma } from "../../prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

type userLoginType = {
  email: string;
  password: string;
};

export class LoginService {
  async execute(data: userLoginType) {
    const users = prisma.users;
    const user = await users.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    const secret = process.env.JWT_SECRET;

    const token = sign(
      {
        userId: user.id,
      },
      secret,
      {
        expiresIn: "1d",
      }
    );

    // logs
    const userLogs = prisma.userLogs;
    const log = await userLogs.findUnique({
      where: {
        UserId: user.id,
      },
    });

    if (!log) {
      await userLogs.create({
        data: {
          UserId: user.id,
          login: new Date(),
          logout: null,
        },
      });
    }

    await userLogs.update({
      where: {
        UserId: user.id,
      },
      data: {
        login: new Date(),
      },
    });

    return { user, token };
  }
}
