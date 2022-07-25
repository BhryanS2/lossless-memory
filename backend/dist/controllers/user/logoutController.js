"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutController = void 0;
const logoutService_1 = require("../../services/user/logoutService");
class LogoutController {
    async handle(req, res) {
        try {
            const { userId } = req;
            const service = logoutService_1.LogoutService;
            const result = await service.execute(Number(userId));
            return res.json({
                message: result,
                success: true,
            });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.LogoutController = LogoutController;
