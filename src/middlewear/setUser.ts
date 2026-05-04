import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt.utils.js";

export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next();
    }

    const decoded = verifyToken(token);

    if (decoded) {
      (req as any).user = decoded;
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next();
  }
};
