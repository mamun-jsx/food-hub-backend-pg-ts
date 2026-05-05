export declare const ProviderService: {
    createProviderProfile: (userId: string, data: any) => Promise<{
        id: string;
        userId: string;
        address: string;
        restaurantName: string;
        description: string | null;
        phone: string;
    }>;
    addMeal: (userId: string, mealData: any) => Promise<{
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    }>;
    updateMeal: (mealId: string, mealData: any) => Promise<{
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    }>;
    deleteMeal: (mealId: string) => Promise<{
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    }>;
    updateOrderStatus: (orderId: string, status: any) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        address: string;
    }>;
    getProviderOrders: (userId: string) => Promise<({
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
    getAllMeals: (userId: string) => Promise<{
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
    }[]>;
    updateProviderProfile: (userId: string, data: any) => Promise<{
        id: string;
        userId: string;
        address: string;
        restaurantName: string;
        description: string | null;
        phone: string;
    }>;
    getProviderProfile: (userId: string) => Promise<{
        id: string;
        userId: string;
        address: string;
        restaurantName: string;
        description: string | null;
        phone: string;
    } | null>;
};
//# sourceMappingURL=provider.service.d.ts.map