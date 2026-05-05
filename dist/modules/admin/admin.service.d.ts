export declare const AdminService: {
    getAllUsers: () => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        image: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateUserRole: (userId: string, role: string) => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        image: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllOrders: () => Promise<({
        items: ({
            meal: {
                id: string;
                name: string;
                image: string | null;
                description: string | null;
                price: number;
                category: string;
                cookingTime: number | null;
                deliveryTime: number | null;
                providerId: string;
            };
        } & {
            id: string;
            price: number;
            mealId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        address: string;
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map