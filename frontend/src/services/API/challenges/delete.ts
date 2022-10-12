import { BaseApi } from "../ConfigApi";
export async function DeleteChallege(id: string) {
  const response = await BaseApi.delete(`/challenge/${id}`);
  return response.data;
}
