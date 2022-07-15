// import { expect, test, describe } from "@jest/globals";

import superTest from "supertest";
import { serverHttp } from "../../src/app";
import { prisma } from "../../src/prisma";

// type user user
type user = {
  CPF: string;
  birthday: string;
  createAt: string;
  credentialsEmail: string;
  firstName: string;
  id: number;
  image: string;
  lastName: string;
  updateAt: string;
  userTypeId: number;
};

describe("API E2E Test Suite", () => {
  const userData = {
    firstName: "Bhryan",
    lastName: "Stepenhen",
    email: "bhryanstepenhen@gmail.com",
    password: "Papagaio1@",
    birthday: "2004-11-03",
    CPF: "131.792.780-05", // generate 4devs
    image: "https://github.com/bhryans2.png",
  };

  const expectedSuccessUserData = {
    response: {
      id: 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      CPF: userData.CPF,
      // birthday: userData.birthday,
      userTypeId: 1,
      credentialsEmail: userData.email,
    },
    success: true,
  };

  async function clearDatabase() {
    return {
      users: await prisma.users.deleteMany(),
      userProfile: await prisma.userProfile.deleteMany(),
    };
  }

  function removeDates(userData: user) {
    // const { birthday, createAt, updateAt, ...rest} = userData;
    delete userData.createAt;
    delete userData.updateAt;
    delete userData.birthday;
  }

  test("DELETE / -should delete all users", async () => {
    const prismaInstaces = await clearDatabase();
    const countInstaces = {
      users: prismaInstaces.users.count,
      userProfile: prismaInstaces.userProfile.count,
    };

    const expected = {
      users: 0,
      userProfile: 0,
    };

    expect(countInstaces).toMatchObject(expected);
  });

  test("POST / - should register user and return a json with your data", async () => {
    const url = "/user/signup";

    const response = await superTest(serverHttp).post(url).send(userData);

    expect(response.status).toBe(200);

    removeDates(response.body.response);
    expect(response.body).toMatchObject(expectedSuccessUserData);
  });

  test("POST / - shold register it again", async () => {
    const url = "/user/signup";

    const response = await superTest(serverHttp).post(url).send(userData);
    expect(response.status).toBe(400);

    const errorExpected = {
      error: "User already exists",
      success: false,
    };
    expect(response.body).toMatchObject(errorExpected);
  });
});
