import { prisma } from "../../lib/prisma.js";

const getAllMeals = async (search?: string, category?: string) => {
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

const getMealById = async (mealId: string) => {
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

const getProviderWithMenu = async (providerId: string) => {
  return await prisma.meal.findMany({
    where: {
      providerId: providerId,
    },
  });
};

const placeOrder = async (userId: string, address: string, items: any[]) => {
  const totalPrice = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );

  return await prisma.order.create({
    data: {
      userId,
      totalPrice,
      address,
      items: {
        create: items.map((item: any) => ({
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

const getAllOrders = async (userId: string) => {
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

const getOrderDetails = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { meal: true },
      },
    },
  });
};

const createReview = async (reviewData: {
  userId: string;
  mealId: string;
  rating: number;
  comment?: string;
}) => {
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

const getProviderById = async (providerId: string) => {
  return await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });
};

const updateUserProfile = async (userId: string, data: { name?: string; image?: string }) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
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
};
