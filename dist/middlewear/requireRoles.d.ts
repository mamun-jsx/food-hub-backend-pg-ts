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
export declare const requireRoles: (allowedRoles: RoleType[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requireRoles.d.ts.map