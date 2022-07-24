"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const AdminService_1 = require("../services/AdminService");
class Admin {
    async handle(req, res) {
        try {
            const service = new AdminService_1.AdminService();
            const response = await service.execute();
            return res.json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.Admin = Admin;
