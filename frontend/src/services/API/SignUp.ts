import { userToSend } from "../../@types";
import { bodyResponseType, userSingupType } from "../../@types/API";
import { BaseApi } from "./ConfigApi";

export async function SignUp(props: userToSend): Promise<userSingupType> {
  try {
    const response = await BaseApi.post("/user/signup/", props);

    const { message, success }: userSingupType | bodyResponseType =
      response.data;

    if (success === false) return message;

    return { message, success };
  } catch (error: any) {
    const messageError =
      error.response.data.message === "User already exists"
        ? "Usuário já existe"
        : "Erro ao cadastrar usuário";
    return {
      message: messageError as any,
      success: false,
    };
  }
}
