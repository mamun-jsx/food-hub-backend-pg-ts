import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
// get all meal
const getAllMeal = async (req: Request, res: Response) => {
  try {
    const meals = await prisma.meal.findMany({
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
    const numberOfItems = meals.length;
    return res.status(200).json({
      success: true,
      numberOfItems,
      meal: meals,
    });
  } catch (error) {
    console.error("Error fetching meals:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// get a single meal
const getMealById = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.id as string;
    const meal = await prisma.meal.findUnique({
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
              },
            },
          },
        },
      },
    });

    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// get all provider
const getProviders = async (req: Request, res: Response) => {
  try {
    const provider = await prisma.providerProfile.findMany({
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
    if (provider.length === 0) {
      return res.status(404).json({
        success: true,
        message: "Currently No Provider Register yet˝",
      });
    }
    return res.status(200).json({ success: true, provider: provider });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// /api/providers/:id with menu
const getProviderWithMenu = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.id as string;

    // 1. Use findMany to get all meals matching this providerId
    const meals = await prisma.meal.findMany({
      where: {
        providerId: providerId,
      },
    });

    // 2. Check if we found any meals (optional but helpful)
    if (!meals || meals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No meals found for this provider",
      });
    }

    // 3. Return the meals array in the response
    res.status(200).json({
      success: true,
      count: meals.length,
      data: meals,
    });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// place order
const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, address, items } = req.body;

    // 1. Calculate Total Price on the server for safety
    const totalPrice = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    // 2. Create Order and OrderItems in one go
    const result = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        address,
        items: {
          create: items.map((item: any) => ({
            mealId: item.id, // Mapping your cart "id" to "mealId"
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Order failed" });
  }
};

// get all orders
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const orderData = await prisma.order.findMany({
      where: {
        userId: req.user!.id, // Filter by the logged-in user
      },
      include: {
        items: {
          include: {
            meal: true, // This joins the Meal table to get the food names/images
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Show newest orders first
      },
    });

    if (orderData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orderData,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// order details
const orderDetails = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "You are not login" });
    }
    const id = req.params.id as string;
    const result = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { meal: true },
        },
      },
    });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// get users orders
export const getMyOrders = async (req: Request, res: Response) => {
  try {
    //  get user from auth session (NOT params)
    const userId = req.user?.id; 

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: userId, // ✅ SAFE
      },
      include: {
        items: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// get a single user by profile...
const getProviderById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;

    const result = await prisma.providerProfile.findUnique({
      where: { id: userId },
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// ! review route

const createReview = async (req: Request, res: Response) => {
  try {
    const { userId, mealId, rating, comment } = req.body;

    // validation
    if (!userId || !mealId || !rating) {
      return res.status(400).json({
        success: false,
        message: "user id , mealId, ratting are required",
      });
    }
    // check review ratting
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ success: false, message: "Rating must be between 1 and 5" });
    }
    // check user is exist
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (!user || !meal) {
      return res.status(404).json({
        success: false,
        message: "User or Meal not found",
      });
    }
    // check duplicate review
    const existingReview = await prisma.review.findFirst({
      where: { userId, mealId },
    });
    // block if review exist
    if (existingReview) {
      return res
        .status(400)
        .json({ success: false, message: "You already reviewed this meal" });
    }
    // create review into database..
    const reviewData = await prisma.review.create({
      data: {
        userId,
        mealId,
        rating,
        comment,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Review Created Successfully",
      reviewData,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({
      success: false,
      message: "Review failed",
    });
  }
};
// update user profile 
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
    const userId = req.user.id; // from auth middleware

    const { name, image } = req.body;

    // validation (only allow name & image)
    if (!name && !image) {
      return res.status(400).json({
        success: false,
        message: "Name or image is required",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(image && { image }),
      },
    });

    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const customerAPis = {
  getAllMeal,
  getMealById,
  getProviders,
  getProviderWithMenu,
  placeOrder,
  getAllOrder,
  orderDetails,
  createReview,
  getProviderById,
  getMyOrders,
  updateUserProfile,
};