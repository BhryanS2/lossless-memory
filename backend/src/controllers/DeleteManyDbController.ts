import { DeleteManyDb } from "../services/clearDb";
import { Request, Response } from "express";

export class DeleteManyDbController {
  async clear(req: Request, res: Response) {
    try {
      const service = new DeleteManyDb();

      const isClear = await service.execute();
      return res.json({ message: isClear, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
