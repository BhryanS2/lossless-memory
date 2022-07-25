"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileController = void 0;
const getProfileService_1 = require("../../services/profile/getProfileService");
class GetProfileController {
    async handle(req, res) {
        try {
            const userId = Number(req.userId);
            const service = new getProfileService_1.getProfileService();
            const response = await service.execute(userId);
            res.status(200).json({
                message: response,
                success: true,
            });
        }
        catch (error) {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
}
exports.GetProfileController = GetProfileController;
