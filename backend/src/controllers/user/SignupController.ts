import { Request, Response } from "express";
import { SignupService } from "../../services/user/signupService";

export class SignupController {
  async handle(req: Request, res: Response) {
    try {
      const service = new SignupService();
      const response = await service.execute(req.body);
      return res.status(201).json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
