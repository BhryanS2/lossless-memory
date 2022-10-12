import { challengeProps } from "../../../@types";
import { BaseApi } from "../ConfigApi";
export async function CreateChallege(data: Omit<challengeProps, "id">) {
  const response = await BaseApi.post("/challenge", data);
  return response.data;
}
