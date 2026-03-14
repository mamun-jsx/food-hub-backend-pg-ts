import { Request, Response, NextFunction } from "express";
import { Role } from "../generated/prisma/enums";

export const requireRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden : permission deny" });
    }
    next();
  };
};
