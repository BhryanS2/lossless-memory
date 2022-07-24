import { expect, test, describe } from "@jest/globals";

import superTest, { Response } from "supertest";
import { serverHttp } from "../../src/app";
import { challengeType, userProfileType } from "../../src/types/auth";
import { challenges } from "./challenges";
import { userData } from "./user";

// type user user
type userType = {
  CPF: string;
  birthday: string;
  createAt: string;
  email: string;
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
    email: string;
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
      email: userData.email,
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

    expect(response.status).toBe(201);

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
          email: userData.email,
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

  const userProfile = {
    idChallenge: 0,
    userData: {
      userLevel: 0,
      experience: 0,
      challengeCompletedId: 0,
    },
    setUserData(data: {
      userLevel: number;
      experience: number;
      challengeCompletedId: number;
    }) {
      this.userData = data;
    },
  };

  test("POST / - should register challenges", async () => {
    const url = "/challenges";
    const promises = challenges.map((challenge) => {
      return serverTest.post(url).send(challenge);
    });

    const responses = await Promise.all(promises);
    const datas = responses.map((response) => response.body);
    userProfile.idChallenge = datas[0].message.id;
    const challengesData = datas.map((data: bodyResponseType) => {
      const { amount, id, type, description } = data.message;
      return { amount, type, description };
    });
    expect(responses.length).toBe(challenges.length);
    expect(challengesData).toMatchObject(challenges);
  });

  test("GET / - should get all challenges", async () => {
    const url = "/challenges";
    const response = await serverTest.get(url);
    const data = response.body as bodyResponseType;

    // const challengesData = data.message.map((data: challengeType) => {
    //   const { amount, type, description } = data;
    //   return { amount, type, description };
    // });
    expect(data.success).toBe(true);
  });

  test("UPDATE / - should update user profile", async () => {
    const url = "/user/profile";
    userProfile.setUserData({
      challengeCompletedId: userProfile.idChallenge,
      experience: 50,
      userLevel: 2,
    });
    const response = await serverTest
      .put(url)
      .set("Authorization", `Bearer ${user.userData.token}`)
      .send(userProfile.userData);
    const data = response.body as bodyResponseType;
    console.log(data);
    expect(data.success).toBe(true);
  });
});
