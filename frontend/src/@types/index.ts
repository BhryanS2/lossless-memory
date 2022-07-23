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
