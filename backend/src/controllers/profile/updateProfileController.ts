import { Response, Request } from "express";
import { UpdateProfileService } from "../../services/profile/updateProfileService";

export class UpdateProfileController {
  async handle(req: Request, res: Response) {
    try {
      const userId = Number(req.userId);
      const data = req.body;
      const service = new UpdateProfileService();
      const response = await service.execute({ userId, data });
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
