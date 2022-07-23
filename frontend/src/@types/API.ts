import { userProps } from ".";

export interface bodyResponseType {
  message: any;
  success: boolean;
}

export interface userSingupType extends bodyResponseType {
  message: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
    CPF: string;
    birthday: string;
    userTypeId: number;
    email: string;
  };
}

export interface userLoginresponseType extends bodyResponseType {
  message: {
    token: string;
    user: userProps;
  };
}
