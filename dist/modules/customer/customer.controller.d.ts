import { Request, Response } from "express";
export declare const getMyOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const customerAPis: {
    getAllMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMealById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getProviders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviderWithMenu: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    placeOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    orderDetails: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviderById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMyOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=customer.controller.d.ts.map