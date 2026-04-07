import { Request, Response } from "express";
export declare const getAllMeals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const providerApi: {
    addMeals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteMeals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createProviderProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateOrderStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProviderOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllMeals: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateProviderProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=provider.controller.d.ts.map