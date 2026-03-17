// // import { Request, Response, NextFunction } from "express";
// // import { RoleType } from "../lib/constants";

// // export const requireRoles = (allowedRoles: RoleType[]) => {
// //   return (req: Request, res: Response, next: NextFunction) => {
// //     // Not logged in
// //     if (!req.user) {
// //       return res.status(401).json({
// //         success: false,
// //         message: "Unauthorized: user not logged in",
// //       });
// //     }

// //     // Role not allowed
// //     if (!allowedRoles.includes(req.user.role as RoleType)) {
// //       return res.status(403).json({
// //         success: false,
// //         message: "Forbidden: permission denied",
// //       });
// //     }

// //     next();
// //   };
// // };
// import { Request, Response, NextFunction } from "express";
// import { RoleType } from "../lib/constants";

// export const requireRoles = (allowedRoles: RoleType[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     // Check if user exists (set by setUser)
//     if (!req.user) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: Please log in first",
//       });
//     }

//     // Role check - ensure the user's role matches the allowed list
//     const userRole = req.user.role as RoleType;
//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({
//         success: false,
//         message: `Forbidden: This requires ${allowedRoles.join(" or ")} permissions.`,
//       });
//     }

//     next();
//   };
// };

import { User, Session } from "better-auth";

declare global {
  namespace Express {
    interface Request {
      // This tells TypeScript that 'user' and 'session' exist on req
      user?: User & { role: string };
      session?: Session;
    }
  }
}
import { Request, Response, NextFunction } from "express";
import { RoleType } from "../lib/constants";

export const requireRoles = (allowedRoles: RoleType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // req.user is populated by the 'setUser' middleware above
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Please log in first",
      });
    }

    // Since you added 'role' to Better Auth additionalFields, it's available here
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
