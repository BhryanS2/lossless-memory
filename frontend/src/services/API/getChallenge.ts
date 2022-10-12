import { bodyResponseType, challengeReponseProps } from "../../@types/API";
import { BaseApi } from "./ConfigApi";

export async function getChallenge(): Promise<
  bodyResponseType | challengeReponseProps
> {
  try {
    const response = await BaseApi.get("/challenges/");
    const data: bodyResponseType | challengeReponseProps = await response.data;

    if (data.success === false) throw new Error(data.message);
    const { message, success }: challengeReponseProps = data;
    return {
      message,
      success,
    };
  } catch (error: any) {
    const messageError = "Erro ao pegar desafios";
    return {
      message: messageError as any,
      success: false,
    };
  }
}
