export type userTypeToLogin = {
  email: string;
  password: string;
};

export type userDataType = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string | Date;
  CPF: string;
  image: string | null;
};

export type userLogeedType = userDataType & {
  id: number;
  createAt: Date;
  updateAt: Date;
  userTypeId: number;
};

export type userProfile = {
  userLevel: number;
  challengesCompleted: number;
  experience: number;
  userId: number;
  challengesId: number;
};
