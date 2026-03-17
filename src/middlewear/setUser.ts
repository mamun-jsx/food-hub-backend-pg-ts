// import { Request, Response, NextFunction } from "express";
// import { auth } from "../lib/auth";
// import { prisma } from "../lib/prisma";
// import { User } from "../generated/prisma/client";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: User;
//     }
//   }
// }

// export const setUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const session = await auth.api.getSession({
//       headers: req.headers as any,
//     });

//     if (session?.user) {
//       const dbUser = await prisma.user.findUnique({
//         where: { id: session.user.id },
//       });

//       if (dbUser) {
//         req.user = dbUser as User;
//       }
//     }

//     next();
//   } catch (err) {
//     console.error("Error in setUser middleware:", err);
//     next();
//   }
// };

import { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

export const setUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // 1. Get session using Better Auth's Node helper
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      // 2. Attach user to req so requireRoles can see it
      (req as any).user = session.user;
      (req as any).session = session.session;
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next(); // Move to next to let requireRoles handle the "missing user" error
  }
};
