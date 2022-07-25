"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteService = void 0;
const prisma_1 = require("../../prisma");
class DeleteService {
    async execute(userId) {
        const users = prisma_1.prisma.users;
        const user = await users.delete({
            where: {
                id: userId,
            },
        });
        return user;
    }
}
exports.DeleteService = DeleteService;
