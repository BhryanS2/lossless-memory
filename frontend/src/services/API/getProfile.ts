import { bodyResponseType, userProfileResponseProps } from "../../@types/API";
import { BaseApi } from "./ConfigApi";

export async function getProfileApi(): Promise<
  bodyResponseType | userProfileResponseProps
> {
  try {
    const response = await BaseApi.get("/user/profile");
    const data: bodyResponseType | userProfileResponseProps =
      await response.data;

    if (data.success === false) throw new Error(data.message);
    const { message, success }: userProfileResponseProps = data;
    return {
      message,
      success,
    };
  } catch (error: any) {
    const messageError = "Erro ao fazer update no perfil";
    return {
      message: messageError as any,
      success: false,
    };
  }
}
