import { Request, Response } from "express";
import { CreateChallengeService } from "../../services/challenge/createChallengeService";

export class CreateChallengeController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;
      const service = new CreateChallengeService();
      const response = await service.execute(data);
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
