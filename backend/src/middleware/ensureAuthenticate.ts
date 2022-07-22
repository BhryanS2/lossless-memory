import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  userId: string;
  iat: number;
  exp: number;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    response.status(401).json({ message: "token invalid." });
  }
  // como o token vem no formato Bearer, precisamos separar
  const [, token] = authToken.split(" ");
  try {
    const { userId } = verify(token, process.env.JWT_SECRET) as Payload;
    req.userId = userId;
    return next();
  } catch (err) {
    response.status(401).json({ message: "token expired." });
  }

  // res.redirect("/login");
}
