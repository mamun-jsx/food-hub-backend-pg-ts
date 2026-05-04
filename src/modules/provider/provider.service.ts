import { prisma } from "../../lib/prisma.js";

const createProviderProfile = async (userId: string, data: any) => {
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

const addMeal = async (userId: string, mealData: any) => {
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
      providerId: providerProfile.id,
    },
  });
};

const updateMeal = async (mealId: string, mealData: any) => {
  return await prisma.meal.update({
    where: { id: mealId },
    data: mealData,
  });
};

const deleteMeal = async (mealId: string) => {
  return await prisma.meal.delete({
    where: { id: mealId },
  });
};

const updateOrderStatus = async (orderId: string, status: any) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const getProviderOrders = async (userId: string) => {
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

const getAllMeals = async (userId: string) => {
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
    },
  });
};

const updateProviderProfile = async (userId: string, data: any) => {
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

const getProviderProfile = async (userId: string) => {
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
