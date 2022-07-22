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
    const { password, ...rest } = user;
    const dataToken = {
      userId: user.id,
      ...rest,
    };
    const token = sign({ ...dataToken }, secret, {
      expiresIn: "1d",
    });

    // logs
    const userLogs = prisma.userLogs;
    await userLogs.create({
      data: {
        login: new Date(),
        logout: null,
        UserId: user.id,
      },
    });

    return { user, token };
  }
}
