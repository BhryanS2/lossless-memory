import { Request, Response } from "express";
import { GetChallengeService } from "../../services/challenge/getChallengeService";

export class GetChallengeController {
  async handle(req: Request, res: Response) {
    try {
      const service = new GetChallengeService();
      const response = await service.execute();
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
