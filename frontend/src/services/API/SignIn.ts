import { userToLogin } from "../../@types";
import { bodyResponseType, userLoginresponseType } from "../../@types/API";
import { BaseApi } from "./ConfigApi";

export async function SignIn(
  props: userToLogin
): Promise<bodyResponseType | userLoginresponseType> {
  try {
    const response = await BaseApi.post("/user/login/", props);
    // console.log(response.data);
    const data: bodyResponseType | userLoginresponseType = await response.data;

    if (data.success === false) throw new Error(data.message);
    const { message, success }: userLoginresponseType = data;
    return {
      message,
      success,
    };
  } catch (error: any) {
    const messageError = "Email e/ou senha errada"
    return {
      message: messageError,
      success: false,
    };
  }
}
