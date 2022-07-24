import { bodyResponseType } from "../../@types/API";
import { BaseApi } from "./ConfigApi";

interface response {
  message: any;
  success: boolean;
}

export interface user {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  CPF: string;
  birthday: string;
  createAt: string;
  updateAt: string;
  userTypeId: number;
  email: string;
  userLevel: number;
  experience: number;
  challengesId: null;
  challengesCompletedId: number;
  challengesCompleted: number;
  currentExperience: number;
}

export interface responseType extends response {
  message: user[];
}

export async function getUsers(): Promise<responseType> {
  const response = await BaseApi.get("/users/");

  const { message, success }: bodyResponseType | responseType = response.data;

  if (success === false) return message;

  return { message, success };
}
