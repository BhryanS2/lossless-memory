"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const challenges_1 = require("./challenges");
const user_1 = require("./user");
(0, globals_1.describe)("API E2E Test Suite", () => {
    const expectedSuccessUserData = {
        response: {
            // id: 1,
            firstName: user_1.userData.firstName,
            lastName: user_1.userData.lastName,
            image: user_1.userData.image,
            CPF: user_1.userData.CPF,
            // birthday: userData.birthday,
            userTypeId: 1,
            email: user_1.userData.email,
        },
        success: true,
    };
    function removeDates(userData) {
        const { birthday, createAt, updateAt, id } = userData, rest = __rest(userData, ["birthday", "createAt", "updateAt", "id"]);
        return rest;
    }
    const serverTest = (0, supertest_1.default)(app_1.serverHttp);
    async function clearDb() {
        const response = await serverTest.delete("/delete");
        return response;
    }
    (0, globals_1.test)("DELETE / -should delete all users", async () => {
        const response = await clearDb();
        (0, globals_1.expect)(response.status).toBe(200);
    });
    (0, globals_1.test)("POST / - should register user and return a json with your data", async () => {
        const url = "/user/signup";
        const response = await serverTest.post(url).send(user_1.userData);
        (0, globals_1.expect)(response.status).toBe(201);
        const body = response.body;
        const data = removeDates(body.message);
        (0, globals_1.expect)(data).toMatchObject(expectedSuccessUserData.response);
    });
    (0, globals_1.test)("POST / - shold register it again", async () => {
        const url = "/user/signup";
        const response = await serverTest.post(url).send(user_1.userData);
        (0, globals_1.expect)(response.status).toBe(400);
        const errorExpected = {
            message: "User already exists",
            success: false,
        };
        (0, globals_1.expect)(response.body).toMatchObject(errorExpected);
    });
    const user = {
        userData: {
            token: "",
            user: user_1.userData,
        },
        setUserData(data) {
            this.userData = data;
        },
    };
    (0, globals_1.test)("POST / - should login", async () => {
        const response = await serverTest.post("/user/login").send(user_1.userData);
        const body = response.body;
        (0, globals_1.expect)(body).toMatchObject({
            message: {
                token: globals_1.expect.any(String),
                user: {
                    id: globals_1.expect.any(Number),
                    firstName: user_1.userData.firstName,
                    lastName: user_1.userData.lastName,
                    CPF: user_1.userData.CPF,
                    birthday: globals_1.expect.any(String),
                    createAt: globals_1.expect.any(String),
                    email: user_1.userData.email,
                    image: user_1.userData.image,
                    updateAt: globals_1.expect.any(String),
                    userTypeId: globals_1.expect.any(Number),
                },
            },
            success: true,
        });
        user.setUserData(body.message);
    });
    (0, globals_1.test)("POST / - should signout", async () => {
        const response = await serverTest
            .post("/user/signout")
            .set("Authorization", `Bearer ${user.userData.token}`);
        (0, globals_1.expect)(response.status).toBe(200);
        (0, globals_1.expect)(response.body).toMatchObject({
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
        setUserData(data) {
            this.userData = data;
        },
    };
    (0, globals_1.test)("POST / - should register challenges", async () => {
        const url = "/challenges";
        const promises = challenges_1.challenges.map((challenge) => {
            return serverTest.post(url).send(challenge);
        });
        const responses = await Promise.all(promises);
        const datas = responses.map((response) => response.body);
        userProfile.idChallenge = datas[0].message.id;
        const challengesData = datas.map((data) => {
            const { amount, id, type, description } = data.message;
            return { amount, type, description };
        });
        (0, globals_1.expect)(responses.length).toBe(challenges_1.challenges.length);
        (0, globals_1.expect)(challengesData).toMatchObject(challenges_1.challenges);
    });
    (0, globals_1.test)("GET / - should get all challenges", async () => {
        const url = "/challenges";
        const response = await serverTest.get(url);
        const data = response.body;
        // const challengesData = data.message.map((data: challengeType) => {
        //   const { amount, type, description } = data;
        //   return { amount, type, description };
        // });
        (0, globals_1.expect)(data.success).toBe(true);
    });
    (0, globals_1.test)("UPDATE / - should update user profile", async () => {
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
        const data = response.body;
        console.log(data);
        (0, globals_1.expect)(data.success).toBe(true);
    });
});
