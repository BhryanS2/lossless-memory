"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = void 0;
const signupService_1 = require("../../services/user/signupService");
class SignupController {
    async handle(req, res) {
        try {
            const service = new signupService_1.SignupService();
            const response = await service.execute(req.body);
            return res.status(201).json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.SignupController = SignupController;
