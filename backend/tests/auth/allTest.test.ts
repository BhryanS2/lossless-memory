import { expect, test, describe } from "@jest/globals";

import superTest, { Response } from "supertest";
import { serverHttp } from "../../src/app";
import { userData } from "./user";

// type user user
type userType = {
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

type userLoginType = {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    CPF: string;
    birthday: Date;
    createAt: Date;
    credentialsEmail: string;
    image: string;
    updateAt: Date;
    userTypeId: number;
  };
};

type bodyResponseType = {
  message: any;
  success: boolean;
};

describe("API E2E Test Suite", () => {
  const expectedSuccessUserData = {
    response: {
      // id: 1,
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

  function removeDates(userData: userType) {
    const { birthday, createAt, updateAt, id, ...rest } = userData;
    return rest;
  }

  const serverTest = superTest(serverHttp);

  async function clearDb(): Promise<Response> {
    const response = await serverTest.delete("/delete");
    return response;
  }

  test("DELETE / -should delete all users", async () => {
    const response = await clearDb();
    expect(response.status).toBe(200);
  });

  test("POST / - should register user and return a json with your data", async () => {
    const url = "/user/signup";

    const response = await serverTest.post(url).send(userData);

    expect(response.status).toBe(200);

    const body = response.body as bodyResponseType;

    const data = removeDates(body.message as userType);
    expect(data).toMatchObject(expectedSuccessUserData.response);
  });

  test("POST / - shold register it again", async () => {
    const url = "/user/signup";

    const response = await serverTest.post(url).send(userData);
    expect(response.status).toBe(400);

    const errorExpected = {
      message: "User already exists",
      success: false,
    };
    expect(response.body).toMatchObject(errorExpected);
  });

  const user = {
    userData: {
      token: "",
      user: userData,
    },
    setUserData(data: userLoginType) {
      this.userData = data;
    },
  };

  test("POST / - should login", async () => {
    const response = await serverTest.post("/user/login").send(userData);
    // expect(response.status).toBe(200);
    const body = response.body as bodyResponseType;

    expect(body).toMatchObject({
      message: {
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          firstName: userData.firstName,
          lastName: userData.lastName,
          CPF: userData.CPF,
          birthday: expect.any(String),
          createAt: expect.any(String),
          credentialsEmail: userData.email,
          image: userData.image,
          updateAt: expect.any(String),
          userTypeId: expect.any(Number),
        },
      },
      success: true,
    });

    user.setUserData(body.message as userLoginType);
  });

  test("POST / - should signout", async () => {
    const response = await serverTest
      .post("/user/signout")
      .set("Authorization", `Bearer ${user.userData.token}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      message: "User logged out",
    });
  });
});
