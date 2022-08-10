"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileController = void 0;
const updateProfileService_1 = require("../../services/profile/updateProfileService");
class UpdateProfileController {
    async handle(req, res) {
        try {
            const userId = Number(req.userId);
            const data = req.body;
            const service = new updateProfileService_1.UpdateProfileService();
            const response = await service.execute({ userId, data });
            res.status(200).json({
                message: response,
                success: true,
            });
        }
        catch (error) {
            const json = JSON.parse(error.message);
            res.status(400).json({
                message: json,
                success: false,
            });
        }
    }
}
exports.UpdateProfileController = UpdateProfileController;
