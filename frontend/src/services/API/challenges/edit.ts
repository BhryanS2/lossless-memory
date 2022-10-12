import { challengeProps } from "../../../@types";
import { BaseApi } from "../ConfigApi";
export async function EditChallege(data: challengeProps) {
  const response = await BaseApi.put(`/challenge/${data.id}`, data);
  return response.data;
}
