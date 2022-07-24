"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const prisma_1 = require("../../prisma");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_1 = require("bcrypt");
class LoginService {
    async execute(data) {
        const users = prisma_1.prisma.users;
        const user = await users.findFirst({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isValidPassword = await (0, bcrypt_1.compare)(data.password, user.password);
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }
        const secret = process.env.JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)({
            userId: user.id,
        }, secret, {
            expiresIn: "1d",
        });
        // logs
        const userLogs = prisma_1.prisma.userLogs;
        const log = await userLogs.findUnique({
            where: {
                UserId: user.id,
            },
        });
        if (!log) {
            await userLogs.create({
                data: {
                    UserId: user.id,
                    login: new Date(),
                    logout: null,
                },
            });
        }
        await userLogs.update({
            where: {
                UserId: user.id,
            },
            data: {
                login: new Date(),
            },
        });
        return { user, token };
    }
}
exports.LoginService = LoginService;
