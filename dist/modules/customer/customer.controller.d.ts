import { Request, Response } from "express";
export declare const customerAPis: {
    getAllMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMealById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviderWithMenu: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    placeOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    orderDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMyOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=customer.controller.d.ts.map