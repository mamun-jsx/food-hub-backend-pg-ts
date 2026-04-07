import { Request, Response } from "express";
export declare const adminApis: {
    getAllUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    adminOrderView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=admin.controller.d.ts.map