export interface userToSend {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
  CPF: string;
}

export interface userToLogin {
  email: string;
  password: string;
}

export interface userProps {
  id: number;
  firstName: string;
  lastName: string;
  CPF: string;
  birthday: Date;
  createAt: Date;
  email: string;
  image: string;
  updateAt: Date;
  userTypeId: number;
}

export interface userProfileProps {
  challengeCompletedId: number;
  experience: number;
  userLevel: number;
}

export interface userProfileResponseProps {
  challengesCompleted: number;
  userProfile: {
    id: number;
    userLevel: number;
    experience: number;
    challengesId: number | null;
    challengesCompletedId: number;
  };
}

export interface challengeProps {
  id: number;
  type: string;
  description: string;
  amount: number;
}
