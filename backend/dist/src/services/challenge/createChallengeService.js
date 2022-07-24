"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChallengeService = void 0;
const prisma_1 = require("../../prisma");
class CreateChallengeService {
    async execute(data) {
        if (!data.amount || !data.description || !data.type) {
            const fields = {
                amount: !data.amount ? "amount is required" : "",
                description: !data.description ? "description is required" : "",
                type: !data.type ? "type is required" : "",
            };
            throw new Error(JSON.stringify(fields));
        }
        const challenge = await prisma_1.prisma.challenges.create({
            data: {
                amount: data.amount,
                description: data.description,
                type: data.type,
            },
        });
        return challenge;
    }
}
exports.CreateChallengeService = CreateChallengeService;
