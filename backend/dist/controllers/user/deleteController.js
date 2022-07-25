"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteController = void 0;
const deleteService_1 = require("../../services/user/deleteService");
class DeleteController {
    async handle(request, response) {
        const { userId } = request;
        const service = new deleteService_1.DeleteService();
        try {
            await service.execute(Number(userId));
            response.status(204).json({
                message: "User deleted successfully",
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
exports.DeleteController = DeleteController;
