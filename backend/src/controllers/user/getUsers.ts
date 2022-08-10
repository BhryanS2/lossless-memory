import { Request, Response } from "express";
import { getUsersService } from "../../services/user/getUsersService";

export class getUsersControllers {
  async handle(req: Request, res: Response) {
    try {
      const service = new getUsersService();
      const response = await service.execute();
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
