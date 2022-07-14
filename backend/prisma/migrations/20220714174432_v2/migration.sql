/*
  Warnings:

  - You are about to drop the column `challengesCompleted` on the `userProfile` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Credentials` table. All the data in the column will be lost.
  - Added the required column `credentialsEmail` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
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
INSERT INTO "new_users" ("CPF", "birthday", "createAt", "firstName", "id", "image", "lastName", "updateAt", "userTypeId") SELECT "CPF", "birthday", "createAt", "firstName", "id", "image", "lastName", "updateAt", "userTypeId" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE TABLE "new_userProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userLevel" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "challengesId" INTEGER,
    "challengesCompletedId" INTEGER,
    CONSTRAINT "userProfile_challengesId_fkey" FOREIGN KEY ("challengesId") REFERENCES "challenges" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "userProfile_challengesCompletedId_fkey" FOREIGN KEY ("challengesCompletedId") REFERENCES "challengesCompleted" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_userProfile" ("challengesId", "experience", "id", "userLevel") SELECT "challengesId", "experience", "id", "userLevel" FROM "userProfile";
DROP TABLE "userProfile";
ALTER TABLE "new_userProfile" RENAME TO "userProfile";
CREATE TABLE "new_Credentials" (
    "id" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL
);
INSERT INTO "new_Credentials" ("Email", "Password", "id") SELECT "Email", "Password", "id" FROM "Credentials";
DROP TABLE "Credentials";
ALTER TABLE "new_Credentials" RENAME TO "Credentials";
CREATE UNIQUE INDEX "Credentials_Email_key" ON "Credentials"("Email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
