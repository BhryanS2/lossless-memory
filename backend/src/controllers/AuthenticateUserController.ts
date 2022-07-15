import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { Request, Response } from "express";

type AuthenticateUserSignup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: string;
  CPF: string;
  image: string;
};

export class AuthenticateUserController {
  async signup(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, birthday, CPF } = req.body;
      if (!firstName || !lastName || !email || !password || !birthday || !CPF) {
        return res.status(400).send({
          message: "Dados inválidos",
          filds: {
            firtName: firstName ? "" : "FirtName is required",
            LastName: lastName ? "" : "LastName is required",
            Email: email ? "" : "email is required",
            Password: password ? "" : "password is required",
            Birthday: birthday ? "" : "birthday is required",
            CPF: CPF ? "" : "CPF is required",
          },
        });
      }
      const response = await AuthenticateUserService.signup(req.body);
      return res.json({ response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  }
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({
          message: "Dados inválidos",
          filds: {
            Email: email ? "" : "Email is required",
            Password: password ? "" : "Password is required",
          },
        });
      }
      const response = await AuthenticateUserService.login(req.body);
      return res.json({ response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  }
  async validateToken(req: Request, res: Response) {
    try {
      const response = await AuthenticateUserService.validateToken(
        req.body.token
      );
      return res.json({ response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  }
}
