import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
// get all meal
const getAllMeal = async (req: Request, res: Response) => {
  try {
    const meals = await prisma.meal.findMany();
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
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
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
    const provider = await prisma.providerProfile.findMany();
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
    const { userId, totalPrice, address, items } = req.body;

    const result = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        address,
        // This creates the OrderItems and links them to this Order automatically
        items: {
          create: items.map((item: any) => ({
            mealId: item.mealId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      // Include the items in the response so the user sees what they bought
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
    console.error("Error placing order:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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

export const customerAPis = {
  getAllMeal,
  getMealById,
  getProviders,
  getProviderWithMenu,
  placeOrder,
  getAllOrder,
  orderDetails,
};
