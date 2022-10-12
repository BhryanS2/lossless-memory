import { challengeReponseProps } from "../../../@types/API";
import { BaseApi } from "../ConfigApi";
export async function GetChallege(): Promise<challengeReponseProps> {
  const response = await BaseApi.get("/challenges");
  return response.data as challengeReponseProps;
}
