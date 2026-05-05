export declare const CustomerService: {
    getAllMeals: (search?: string, category?: string) => Promise<({
        reviews: {
            createdAt: Date;
            user: {
                name: string;
                image: string | null;
            };
            rating: number;
            comment: string | null;
        }[];
    } & {
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    })[]>;
    getMealById: (mealId: string) => Promise<({
        reviews: {
            createdAt: Date;
            user: {
                id: string;
                name: string;
                image: string | null;
            };
            rating: number;
            comment: string | null;
        }[];
    } & {
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    }) | null>;
    getProviders: () => Promise<({
        user: {
            name: string;
            email: string;
            image: string | null;
        };
    } & {
        id: string;
        userId: string;
        address: string;
        restaurantName: string;
        description: string | null;
        phone: string;
    })[]>;
    getProviderWithMenu: (providerId: string) => Promise<{
        id: string;
        name: string;
        image: string | null;
        description: string | null;
        price: number;
        category: string;
        cookingTime: number | null;
        deliveryTime: number | null;
        providerId: string;
    }[]>;
    placeOrder: (userId: string, address: string, items: any[]) => Promise<{
        items: {
            id: string;
            price: number;
            mealId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        address: string;
    }>;
    getAllOrders: (userId: string) => Promise<({
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
    getOrderDetails: (orderId: string) => Promise<({
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
    }) | null>;
    createReview: (reviewData: {
        userId: string;
        mealId: string;
        rating: number;
        comment?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        mealId: string;
        rating: number;
        comment: string | null;
    }>;
    getProviderById: (providerId: string) => Promise<{
        id: string;
        userId: string;
        address: string;
        restaurantName: string;
        description: string | null;
        phone: string;
    } | null>;
    updateUserProfile: (userId: string, data: {
        name?: string;
        image?: string;
    }) => Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        image: string | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserProfile: (userId: string) => Promise<{
        id: string;
        name: string;
        email: string;
        image: string | null;
        role: string;
    } | null>;
};
//# sourceMappingURL=customer.service.d.ts.map