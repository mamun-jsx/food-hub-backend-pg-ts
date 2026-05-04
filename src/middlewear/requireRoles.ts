import { Request, Response, NextFunction } from "express";
import { RoleType } from "../lib/constants.js";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        name?: string;
        image?: string;
      };
    }
  }
}

export const requireRoles = (allowedRoles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please log in first",
      });
    }

    const userRole = req.user.role as RoleType;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: This requires ${allowedRoles.join(" or ")} permissions.`,
      });
    }

    next();
  };
};
