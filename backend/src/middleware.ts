import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

interface JwtPayload {
  id: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(403)
      .json({ message: "Authorization token is missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
    req.id = payload.id;
    next();
  } catch (e) {
    res.status(403).json({ message: "You are not logged in" });
    return;
  }
}
