import { prisma } from "../../lib/prisma.js";
const createProviderProfile = async (userId, data) => {
    const existingProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (existingProfile) {
        throw new Error("Provider profile already exists");
    }
    return await prisma.providerProfile.create({
        data: {
            ...data,
            userId,
        },
    });
};
const addMeal = async (userId, mealData) => {
    const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!providerProfile) {
        throw new Error("Provider profile not found");
    }
    return await prisma.meal.create({
        data: {
            ...mealData,
            price: Number(mealData.price),
            cookingTime: Number(mealData.cookingTime || 0),
            deliveryTime: Number(mealData.deliveryTime || 0),
            providerId: providerProfile.id,
        },
    });
};
const updateMeal = async (mealId, mealData) => {
    const updatedData = { ...mealData };
    if (mealData.price)
        updatedData.price = Number(mealData.price);
    if (mealData.cookingTime)
        updatedData.cookingTime = Number(mealData.cookingTime);
    if (mealData.deliveryTime)
        updatedData.deliveryTime = Number(mealData.deliveryTime);
    return await prisma.meal.update({
        where: { id: mealId },
        data: updatedData,
    });
};
const deleteMeal = async (mealId) => {
    return await prisma.meal.delete({
        where: { id: mealId },
    });
};
const updateOrderStatus = async (orderId, status) => {
    return await prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
const getProviderOrders = async (userId) => {
    const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!providerProfile) {
        throw new Error("Provider profile not found");
    }
    return await prisma.order.findMany({
        where: {
            items: {
                some: {
                    meal: {
                        providerId: providerProfile.id,
                    },
                },
            },
        },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });
};
const getAllMeals = async (userId) => {
    const providerProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!providerProfile) {
        throw new Error("Provider not found");
    }
    return await prisma.meal.findMany({
        where: {
            providerId: providerProfile.id,
        },
        select: {
            id: true,
            name: true,
            image: true,
            price: true,
            description: true,
            category: true,
            cookingTime: true,
            deliveryTime: true,
        },
    });
};
const updateProviderProfile = async (userId, data) => {
    const existingProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!existingProfile) {
        throw new Error("Provider profile not found");
    }
    return await prisma.providerProfile.update({
        where: { userId },
        data,
    });
};
const getProviderProfile = async (userId) => {
    return await prisma.providerProfile.findUnique({
        where: { userId },
    });
};
export const ProviderService = {
    createProviderProfile,
    addMeal,
    updateMeal,
    deleteMeal,
    updateOrderStatus,
    getProviderOrders,
    getAllMeals,
    updateProviderProfile,
    getProviderProfile,
};
//# sourceMappingURL=provider.service.js.map