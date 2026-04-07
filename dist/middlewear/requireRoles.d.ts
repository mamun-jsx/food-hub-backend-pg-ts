import { User, Session } from "better-auth";
declare global {
    namespace Express {
        interface Request {
            user?: User & {
                role: string;
            };
            session?: Session;
        }
    }
}
import { Request, Response, NextFunction } from "express";
import { RoleType } from "../lib/constants.js";
export declare const requireRoles: (allowedRoles: RoleType[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requireRoles.d.ts.map