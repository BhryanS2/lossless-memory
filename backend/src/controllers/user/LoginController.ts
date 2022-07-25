import { Request, Response } from "express";
import { LoginService } from "../../services/user/loginService";

export class LoginController {
  async handle(req: Request, res: Response) {
    try {
      const service = new LoginService();
      const response = await service.execute(req.body);
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
