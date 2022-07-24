"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateController = void 0;
const UpdateService_1 = require("../../services/user/UpdateService");
class UpdateController {
    async handle(request, response) {
        const { userId } = request;
        const data = request.body;
        const service = new UpdateService_1.UpdateService();
        try {
            await service.execute(Number(userId), data);
            response.status(204).json({
                message: "User updated successfully",
                success: true,
            });
        }
        catch (error) {
            response.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
}
exports.UpdateController = UpdateController;
