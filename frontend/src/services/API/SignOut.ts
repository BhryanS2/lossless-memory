import { BaseApi } from "./ConfigApi";

export async function SignOut(): Promise<any> {
  try {
    const response = await BaseApi.post("/user/signout/");
    // console.log(response.data);
    const data = await response.data;

    if (data.success === false) throw new Error(data.message);
    const { message, success } = data;
    return {
      message,
      success,
    };
  } catch (error: any) {
    return {
      message: "No logged user" as any,
      success: false,
    };
  }
}
