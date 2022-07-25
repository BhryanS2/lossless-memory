"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChallengeController = void 0;
const createChallengeService_1 = require("../../services/challenge/createChallengeService");
class CreateChallengeController {
    async handle(req, res) {
        try {
            const data = req.body;
            const service = new createChallengeService_1.CreateChallengeService();
            const response = await service.execute(data);
            return res.json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.CreateChallengeController = CreateChallengeController;
