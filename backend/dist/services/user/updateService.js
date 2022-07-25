"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateService = void 0;
const Yup = __importStar(require("yup"));
const prisma_1 = require("../../prisma");
class UpdateService {
    validate(data) {
        const schema = Yup.object().shape({
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string().required("Email is required"),
            birthday: Yup.date().required("Birthday is required"),
            CPF: Yup.string().required("CPF is required"),
            password: Yup.string().required("Password is required"),
        });
        return schema.validate(data, { abortEarly: true });
    }
    async execute(userId, data) {
        const minValidate = await this.validate(data);
        if (minValidate.CPF ||
            minValidate.birthday ||
            minValidate.email ||
            minValidate.firstName ||
            minValidate.lastName) {
            const error = {
                message: "Invalid data",
                fields: minValidate,
            };
            throw new Error(JSON.stringify(error));
        }
        const users = prisma_1.prisma.users;
        const user = await users.update({
            where: {
                id: userId,
            },
            data: {
                birthday: data.birthday,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                CPF: data.CPF,
                image: data.image,
                password: data.password,
                updateAt: new Date(),
            },
        });
        return user;
    }
}
exports.UpdateService = UpdateService;
