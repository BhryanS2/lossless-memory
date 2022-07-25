import { Request, Response } from "express";
import { LogoutService } from "../../services/user/logoutService";

export class LogoutController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req;
      const service = LogoutService;
      const result = await service.execute(Number(userId));
      return res.json({
        message: result,
        success: true,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
