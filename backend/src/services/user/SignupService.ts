import { genSalt, hash } from "bcrypt";
import { prisma } from "../../prisma";
import { ValidateData } from "../../utils/validate";

type userSigninType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string | null;
  CPF: string;
  image: string | null;
};

export class SignupService {
  async execute(data: userSigninType) {
    const validator = ValidateData;

    if (
      !data.email ||
      !data.password ||
      !data.firstName ||
      !data.lastName ||
      !data.CPF
    ) {
      const error = {
        message: "Missing required fields",
        fields: {
          email: data.email ? "" : "Email is required",
          password: data.password ? "" : "Password is required",
          firstName: data.firstName ? "" : "First name is required",
          lastName: data.lastName ? "" : "Last name is required",
          // birthday: data.birthday ? "" : "Birthday is required",
          CPF: data.CPF ? "" : "CPF is required",
        },
      };
      throw new Error(JSON.stringify(error));
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

    const userExists = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists !== null) {
      throw new Error("User already exists");
    }

    const buffer = 10;
    const salt = await genSalt(buffer);
    const PasswordHash = await hash(data.password, salt);

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
        image: data.image
          ? data.image
          : "https://gravatar.com/avatar/placeholder?d=mp",
        createAt: date,
        updateAt: date,
        email: data.email,
        password: PasswordHash,
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

    delete user.password;
    const { password, ...userToReturn } = user;
    return userToReturn;
  }
}
