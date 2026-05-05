import { prisma } from "../../lib/prisma.js";
const getAllMeals = async (search, category) => {
    return await prisma.meal.findMany({
        where: {
            AND: [
                search
                    ? {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    }
                    : {},
                category
                    ? {
                        category: {
                            equals: category,
                            mode: "insensitive",
                        },
                    }
                    : {},
            ],
        },
        include: {
            reviews: {
                select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
};
const getMealById = async (mealId) => {
    return await prisma.meal.findUnique({
        where: { id: mealId },
        include: {
            reviews: {
                select: {
                    rating: true,
                    comment: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                            id: true,
                        },
                    },
                },
            },
        },
    });
};
const getProviders = async () => {
    return await prisma.providerProfile.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
};
const getProviderWithMenu = async (providerId) => {
    return await prisma.meal.findMany({
        where: {
            providerId: providerId,
        },
    });
};
const placeOrder = async (userId, address, items) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return await prisma.order.create({
        data: {
            userId,
            totalPrice,
            address,
            items: {
                create: items.map((item) => ({
                    mealId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            items: true,
        },
    });
};
const getAllOrders = async (userId) => {
    return await prisma.order.findMany({
        where: { userId },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getOrderDetails = async (orderId) => {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            items: {
                include: { meal: true },
            },
        },
    });
};
const createReview = async (reviewData) => {
    const { userId, mealId, rating, comment } = reviewData;
    // Validation should be in controller or a validation middleware, but keep logic here
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (!user || !meal) {
        throw new Error("User or Meal not found");
    }
    const existingReview = await prisma.review.findFirst({
        where: { userId, mealId },
    });
    if (existingReview) {
        throw new Error("You already reviewed this meal");
    }
    return await prisma.review.create({
        data: {
            userId,
            mealId,
            rating,
            comment: comment || null,
        },
    });
};
const getProviderById = async (providerId) => {
    return await prisma.providerProfile.findUnique({
        where: { id: providerId },
    });
};
const updateUserProfile = async (userId, data) => {
    return await prisma.user.update({
        where: { id: userId },
        data,
    });
};
const getUserProfile = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
        },
    });
};
export const CustomerService = {
    getAllMeals,
    getMealById,
    getProviders,
    getProviderWithMenu,
    placeOrder,
    getAllOrders,
    getOrderDetails,
    createReview,
    getProviderById,
    updateUserProfile,
    getUserProfile,
};
//# sourceMappingURL=customer.service.js.map