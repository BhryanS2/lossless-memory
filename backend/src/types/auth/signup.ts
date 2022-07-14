export type userSignup = {
  FirstName: string;
  LastName: string;
  Image: string;
  CPF: string;
  Birthday: Date;
  createAt: Date;
  updateAt: Date;
  userTypeId: number;
  Credentials: Credentials;
  userProfile: userProfile;
  challengesCompleted: challengesCompleted[];
};

/*

model Credentials {
  Id       Int
  UserId   Int     @unique
  Email    String  @unique
  Password String
  users    users[]
}

model UserType {
  Id    Int     @id @default(autoincrement())
  Type  String
  users users[]
}

model UserLogs {
  Id     Int      @id @default(autoincrement())
  UserId Int      @unique
  login  DateTime
  logout DateTime
}

model users {

}


model challenges {
  Id                  Int                   @id @default(autoincrement())
  type                String
  description         String
  amount              Int
  userProfile         userProfile[]
  challengesCompleted challengesCompleted[]
}

model challengesCompleted {
  Id           Int        @id @default(autoincrement())
  user         users      @relation(fields: [userId], references: [Id])
  challenge    challenges @relation(fields: [challengesId], references: [Id])
  userId       Int
  challengesId Int
}


*/
type UserType = {
  Type: string;
};

export type Credentials = {
  Email: string;
  Password: string;
  UserId: number;
};

type challengesCompleted = {
  userId: number;
  challengesId: number;
};

/*

model userProfile {
  Id       Int         @id @default(autoincrement())
  userLevel           Int
  challengesCompleted Int
  experience          Int
  user                users       @relation(fields: [userId], references: [Id])
  challenges          challenges? @relation(fields: [challengesId], references: [Id])
  challengesId        Int?
  userId              Int
}
*/
type userProfile = {
  userLevel: number;
  challengesCompleted: number;
  experience: number;
  userId: number;
  challengesId: number;
};
