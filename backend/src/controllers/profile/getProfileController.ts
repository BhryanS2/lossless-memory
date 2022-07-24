import { Response, Request } from "express";
import { getProfileService } from "../../services/profile/getProfileService";

export class GetProfileController {
  async handle(req: Request, res: Response) {
    try {
      const userId = Number(req.userId);
      const service = new getProfileService();
      const response = await service.execute(userId);
      res.status(200).json({
        message: response,
        success: true,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}
