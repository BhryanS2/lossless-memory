import { Request, Response } from "express";
import { UpdateService } from "../../services/user/UpdateService";

export class UpdateController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const data = request.body;
    const service = new UpdateService();
    try {
      await service.execute(Number(userId), data);
      response.status(204).json({
        message: "User updated successfully",
        success: true,
      });
    } catch (error) {
      response.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}
