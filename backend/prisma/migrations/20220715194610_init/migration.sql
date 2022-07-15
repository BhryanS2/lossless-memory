-- CreateTable
CREATE TABLE "Credentials" (
    "id" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserLogs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserId" INTEGER NOT NULL,
    "login" DATETIME NOT NULL,
    "logout" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userTypeId" INTEGER NOT NULL,
    "credentialsEmail" TEXT NOT NULL,
    CONSTRAINT "users_credentialsEmail_fkey" FOREIGN KEY ("credentialsEmail") REFERENCES "Credentials" ("Email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "userProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userLevel" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "challengesId" INTEGER,
    "challengesCompletedId" INTEGER,
    CONSTRAINT "userProfile_challengesId_fkey" FOREIGN KEY ("challengesId") REFERENCES "challenges" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "userProfile_challengesCompletedId_fkey" FOREIGN KEY ("challengesCompletedId") REFERENCES "challengesCompleted" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "challengesCompleted" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "challengesId" INTEGER NOT NULL,
    CONSTRAINT "challengesCompleted_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "challengesCompleted_challengesId_fkey" FOREIGN KEY ("challengesId") REFERENCES "challenges" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_Email_key" ON "Credentials"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogs_UserId_key" ON "UserLogs"("UserId");
