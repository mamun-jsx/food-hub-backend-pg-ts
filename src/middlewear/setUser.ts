import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";

export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (session?.user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          emailVerified: true,
          name: true,
          image: true,
          role: true,
        },
      });

      if (dbUser) {
        req.user = dbUser;
      }
    }
    next();
  } catch (error: any) {
    console.error("Error in setUser middleware:", error);

    // Manual error handling: send response directly
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in setUser middleware",
      details: error.message || error,
    });
  }
};
