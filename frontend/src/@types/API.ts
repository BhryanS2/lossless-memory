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

export interface userProfileResponseProps extends bodyResponseType {
  message: {
    id: number;
    userLevel: number;
    experience: number;
    challengesId: null | number;
    challengesCompletedId: number;
  };
}

export interface challengeReponseProps extends bodyResponseType {
  message: {
    id: number;
    type: string;
    description: string;
    amount: number;
  };
}
