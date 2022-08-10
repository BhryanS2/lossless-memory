"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteManyDbController = void 0;
const clearDb_1 = require("../services/clearDb");
class DeleteManyDbController {
    async clear(req, res) {
        try {
            const userId = req.userId;
            const service = new clearDb_1.DeleteManyDb();
            const isClear = await service.execute(Number(userId));
            return res.json({ message: isClear, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.DeleteManyDbController = DeleteManyDbController;
