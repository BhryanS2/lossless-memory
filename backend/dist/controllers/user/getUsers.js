"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersControllers = void 0;
const getUsersService_1 = require("../../services/user/getUsersService");
class getUsersControllers {
    async handle(req, res) {
        try {
            const service = new getUsersService_1.getUsersService();
            const response = await service.execute();
            return res.json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.getUsersControllers = getUsersControllers;
