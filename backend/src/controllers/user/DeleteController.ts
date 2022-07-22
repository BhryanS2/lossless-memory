import { Request, Response } from "express";
import { DeleteService } from "../../services/user/DeleteService";

export class DeleteController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const service = new DeleteService();
    try {
      await service.execute(Number(userId));
      response.status(204).json({
        message: "User deleted successfully",
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
