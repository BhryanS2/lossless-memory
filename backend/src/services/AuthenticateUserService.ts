import { prisma } from "../prisma";
import * as bcrypt from "bcrypt";
import * as webToken from "jsonwebtoken";
import { ValidateData } from "../utils/validate";

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
  image: string | null;
};

export class AuthenticateUserService {
  static async signup(data: AuthenticateUserSignup) {
    const credentialsUser = prisma.credentials;
    const validator = ValidateData;

    if (
      !data.email ||
      !data.password ||
      !data.firstName ||
      !data.lastName ||
      !data.birthday ||
      !data.CPF
    ) {
      throw new Error("Invalid data");
    }

    const errors = {
      email: validator.Email.isValid(data.email),
      password: validator.Password.isValid(data.password),
      name: validator.Name.isValid({
        firstName: data.firstName,
        lastName: data.lastName,
      }),
      birthday: validator.Birthday.isValid(data.birthday),
      cpf: validator.Cpf.isValid(data.CPF),
    };

    const errorsMessages = {
      email: validator.Email.getErrorMessage(),
      password: validator.Password.getErrorsMessages(),
      name: validator.Name.getErrorMessage(),
      birthday: validator.Birthday.getErrorMessage(),
      cpf: validator.Cpf.getErrorMessage(),
    };
    if (Object.values(errors).includes(false)) {
      throw new Error(
        errorsMessages[Object.keys(errors).find((key) => !errors[key])]
      );
    }

    const userExists = await credentialsUser.findFirst({
      where: {
        Email: data.email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    // get id from credentials
    const credentialsId = await credentialsUser.count();

    const buffer = 10;
    const salt = await bcrypt.genSalt(buffer);
    const PasswordHash = await bcrypt.hash(data.password, salt);

    const AuthenticateUser = prisma.users;
    const formatBirthday = new Date(data.birthday);
    const formatBirthdayString = formatBirthday.toISOString();
    const date = new Date();

    const user = await AuthenticateUser.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: formatBirthdayString,
        CPF: data.CPF,
        image: data.image ? data.image : "",
        createAt: date,
        updateAt: date,
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
          },
        },
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
    // const user = await users.findFirst({
    //   where: {
    //     credentials: {
    //       Email: data.email,
    //     },
    //   },
    // });
    // return user;
  }

  static async validateToken(token: string) {
    const secret = process.env.JWT_SECRET;
    const decoded = webToken.verify(token, secret);
    return !!decoded;
  }
}
