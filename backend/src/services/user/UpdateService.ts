import * as Yup from "yup";

import { prisma } from "../../prisma";
import { userDataType } from "../../types/auth";

type updateType = userDataType & {
  password: string;
};

export class UpdateService {
  validate(data: updateType) {
    const schema = Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().required("Email is required"),
      birthday: Yup.date().required("Birthday is required"),
      CPF: Yup.string().required("CPF is required"),
      password: Yup.string().required("Password is required"),
    });

    return schema.validate(data, { abortEarly: true });
  }

  async execute(userId: number, data: updateType) {
    const minValidate = await this.validate(data);
    if (
      minValidate.CPF ||
      minValidate.birthday ||
      minValidate.email ||
      minValidate.firstName ||
      minValidate.lastName
    ) {
      const error = {
        message: "Invalid data",
        fields: minValidate,
      };
      throw new Error(JSON.stringify(error));
    }

    const users = prisma.users;
    const user = await users.update({
      where: {
        id: userId,
      },
      data: {
        birthday: data.birthday,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        CPF: data.CPF,
        image: data.image,
        password: data.password,
        updateAt: new Date(),
      },
    });
    return user;
  }
}
