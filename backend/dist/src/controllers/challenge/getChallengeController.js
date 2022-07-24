"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChallengeController = void 0;
const getChallengeService_1 = require("../../services/challenge/getChallengeService");
class GetChallengeController {
    async handle(req, res) {
        try {
            const service = new getChallengeService_1.GetChallengeService();
            const response = await service.execute();
            return res.json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.GetChallengeController = GetChallengeController;
