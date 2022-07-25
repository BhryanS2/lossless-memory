"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { expect, test, describe } from "@jest/globals";
const validate_1 = require("../../utils/validate");
describe("API Test validade test suite", () => {
    const userDataCorrect = {
        firstName: "Bhryan",
        lastName: "Stepenhen",
        email: "bhryanstepenhen@gmail.com",
        password: "Papagaio1@",
        birthday: "2004-11-03",
        CPF: "131.792.780-05",
        image: "https://github.com/bhryans2.png",
    };
    const userDataIncorrect = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthday: "",
        CPF: "",
        image: "",
    };
    function getErrorsAndErrorsMessage(data) {
        const validator = validate_1.ValidateData;
        const errors = {
            email: validator.Email.isValid(data.email),
            password: validator.Password.isValid(data.password),
            name: validator.Name.isValid({
                firstName: data.firstName,
                lastName: data.lastName,
            }),
            birthday: validator.Birthday.isValid(data.birthday),
            cpf: validator.Cpf.isValid(data.CPF),
        };
        const errorsMessages = {
            email: validator.Email.getErrorMessage(),
            password: validator.Password.getErrorsMessages(),
            name: validator.Name.getErrorMessage(),
            birthday: validator.Birthday.getErrorMessage(),
            cpf: validator.Cpf.getErrorMessage(),
        };
        return { errors, errorsMessages };
    }
    test(" / - should user corrert, not error", async () => {
        const userCorrect = getErrorsAndErrorsMessage(userDataCorrect);
        const expected = {
            email: true,
            password: {
                minLength: true,
                maxLength: true,
                hasNumber: true,
                hasUpperCase: true,
                hasLowerCase: true,
                hasEspecialChar: true,
            },
            name: true,
            birthday: true,
            cpf: true,
        };
        expect(userCorrect.errors).toEqual(expected);
    });
    test(" / - should user incorrert", async () => {
        const userIncorrect = getErrorsAndErrorsMessage(userDataIncorrect);
        const expected = {
            email: false,
            password: {
                minLength: false,
                maxLength: false,
                hasNumber: false,
                hasUpperCase: false,
                hasLowerCase: false,
                hasEspecialChar: false,
            },
            name: false,
            birthday: false,
            cpf: false,
        };
        expect(userIncorrect.errors).toEqual(expected);
    });
    test(" / - should user incorrert, get error message", async () => {
        const userIncorrect = getErrorsAndErrorsMessage(userDataIncorrect);
        const expected = {
            email: "Email is not valid",
            name: "Name is not valid",
            birthday: "Birthday is not valid",
            cpf: "CPF is not valid",
            password: {
                minLength: "Password must be at least 8 characters",
                maxLength: "Password must be at most 16 characters",
                hasNumber: "Password must contain at least one number",
                hasUpperCase: "Password must contain at least one uppercase letter",
                hasLowerCase: "Password must contain at least one lowercase letter",
                hasEspecialChar: "Password must contain at least one special character",
            },
        };
        expect(userIncorrect.errorsMessages).toEqual(expected);
    });
    test(" / - should user incorrect (password - Max Length)", async () => {
        userDataIncorrect.password = "aw";
        const userIncorrect = getErrorsAndErrorsMessage(userDataIncorrect);
        const expected = {
            email: false,
            password: {
                minLength: false,
                maxLength: true,
                hasNumber: false,
                hasUpperCase: false,
                hasLowerCase: true,
                hasEspecialChar: false,
            },
            name: false,
            birthday: false,
            cpf: false,
        };
        expect(userIncorrect.errors).toEqual(expected);
    });
});
