import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import * as webToken from "jsonwebtoken";

type AuthenticateUserLogin = {
  email: string;
  password: string;
};

type AuthenticateUserSignup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  CPF: string;
  image: string;
};

export class AuthenticateUserService {
  static async signup(data: AuthenticateUserSignup) {
    const credentialsUser = prisma.credentials;

    if (!data.email || !data.password || !data.firstName || !data.lastName) {
      throw new Error("Dados inválidos");
    }

    const userExists = await credentialsUser.findFirst({
      where: {
        Email: data.email,
      },
    });

    if (userExists) {
      throw new Error("Usuário já existe");
    }

    // get id from credentials
    const credentialsId = await credentialsUser.count();

    const buffer = 10;
    const salt = await bcrypt.genSalt(buffer);
    const PasswordHash = await bcrypt.hash(data.password, salt);

    const AuthenticateUser = prisma.users;

    const user = await AuthenticateUser.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        CPF: data.CPF,
        image: data.image ? data.image : "",
        createAt: new Date(),
        updateAt: new Date(),
        credentials: {
          create: {
            Email: data.email,
            Password: PasswordHash,
            id: credentialsId + 1,
          },
        },
        userProfile: {
          create: {
            experience: 0,
            userLevel: 1,
            challengesCompleted: null,
          },
        },
        challengesCompleted: null,
        userType: {
          connectOrCreate: {
            create: {
              Type: "user",
              id: 1,
            },
            where: {
              id: 1,
            },
          },
        },
      },
    });

    // delete user.Password;
    return user;
  }

  static async login(data: AuthenticateUserLogin) {
    const users = prisma.users;
    const user = await users.findFirst({
      where: {
        credentials: {
          Email: data.email,
        },
      },
    });
    if (!user) {
      throw new Error("Usuário não existe");
    }
    const userPassword = await prisma.credentials.findUnique({
      where: {
        Email: data.email,
      },
    });
    if (!userPassword) {
      throw new Error("Usuário não existe");
    }
    const isValidPassword = await bcrypt.compare(
      data.password,
      userPassword.Password
    );
    if (!isValidPassword) {
      throw new Error("Senha inválida");
    }
    const secret = process.env.JWT_SECRET;
    const token = webToken.sign({ userId: user.id }, secret, {
      expiresIn: "1d",
    });
    return { user, token };
    // const AuthenticateUser = prisma.credentials;
    // const credentials = await AuthenticateUser.findUnique({
    //   where: {
    //     Email: data.email,
    //   },
    // });
    // if (!credentials) {
    //   throw new Error("Usuário não encontrado");
    // }
    // const PasswordMatched = await bcrypt.compare(
    //   data.password,
    //   credentials.Password
    // );
    // if (!PasswordMatched) {
    //   throw new Error("Senha inválida");
    // }
    // const user = prisma.users.findFirst({
    //   where: {
    //     credentials: {
    //       id: credentials.id,
    //     },
    //   },
    // });
    // const secret = process.env.JWT_SECRET;
    // const token = webToken.sign({ userId: credentials.id }, secret, {
    //   expiresIn: "1d",
    // });
    // delete user.credentials;
    // return { user, token };
  }

  static async validateToken(token: string) {
    const secret = process.env.JWT_SECRET;
    const decoded = webToken.verify(token, secret);
    return !!decoded;
  }
}
