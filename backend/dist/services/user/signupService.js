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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupService = void 0;
const bcrypt_1 = require("bcrypt");
const prisma_1 = require("../../prisma");
const validate_1 = require("../../utils/validate");
class SignupService {
    async execute(data) {
        const validator = validate_1.ValidateData;
        if (!data.email ||
            !data.password ||
            !data.firstName ||
            !data.lastName ||
            !data.CPF) {
            const error = {
                message: "Missing required fields",
                fields: {
                    email: data.email ? "" : "Email is required",
                    password: data.password ? "" : "Password is required",
                    firstName: data.firstName ? "" : "First name is required",
                    lastName: data.lastName ? "" : "Last name is required",
                    // birthday: data.birthday ? "" : "Birthday is required",
                    CPF: data.CPF ? "" : "CPF is required",
                },
            };
            throw new Error(JSON.stringify(error));
        }
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
        if (Object.values(errors).includes(false)) {
            throw new Error(errorsMessages[Object.keys(errors).find((key) => !errors[key])]);
        }
        const userExists = await prisma_1.prisma.users.findUnique({
            where: {
                email: data.email,
            },
        });
        if (userExists !== null) {
            throw new Error("User already exists");
        }
        const buffer = 10;
        const salt = await (0, bcrypt_1.genSalt)(buffer);
        const PasswordHash = await (0, bcrypt_1.hash)(data.password, salt);
        const AuthenticateUser = prisma_1.prisma.users;
        const formatBirthday = new Date(data.birthday);
        const formatBirthdayString = formatBirthday.toISOString();
        const date = new Date();
        const user = await AuthenticateUser.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                birthday: formatBirthdayString,
                CPF: data.CPF,
                image: data.image
                    ? data.image
                    : "https://gravatar.com/avatar/placeholder?d=mp",
                createAt: date,
                updateAt: date,
                email: data.email,
                password: PasswordHash,
                userProfile: {
                    create: {
                        experience: 0,
                        userLevel: 1,
                    },
                },
                userType: {
                    connectOrCreate: {
                        create: {
                            Type: "user",
                            id: 1,
                        },
                        where: {
                            id: 1,
                        },
                    },
                },
            },
        });
        delete user.password;
        const { password } = user, userToReturn = __rest(user, ["password"]);
        return userToReturn;
    }
}
exports.SignupService = SignupService;
