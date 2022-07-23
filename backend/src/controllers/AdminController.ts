import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class Admin {
  async handle(req: Request, res: Response) {
    try {
      const service = new AdminService();
      const response = await service.execute();
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
