// import { expect, test, describe } from "@jest/globals";

import superTest from "supertest";
import { serverHttp } from "../../src/app";

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

  test("GET / - should login", async () => {
    const response = await superTest(serverHttp)
      .post("/user/login")
      .send(userData);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
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
    });
  });
});
