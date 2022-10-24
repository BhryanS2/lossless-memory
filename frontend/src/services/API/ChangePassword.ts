import { bodyResponseType } from "../../@types/API";
import { BaseApi } from "./ConfigApi";


export async function changePassword(
  email: string,
  password: string,
): Promise<bodyResponseType> {
  try {
    const response = await BaseApi.post("/changePassword/", {
      password,
      email,
    });
    const data: bodyResponseType   = await response.data;

    if (data.success === false) throw new Error(data.message);
    const { message, success }  = data;
    return {
      message,
      success,
    };
  } catch (error: any) {
    const messageError = "Erro ao alterar senha";
    return {
      message: messageError as any,
      success: false,
    };
  }
}
