import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
// ! Provider APIs
// PATCH /api/provider/orders/:id → update order status //* NEED TO MAKE IT
// create provider information
const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const { restaurantName, description, address, phone } = req.body;

    // ✅ Check auth
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    // ✅ Check if profile already exists (because userId is @unique)
    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Provider profile already exists",
      });
    }

    // ✅ Validate required fields
    if (!restaurantName || !address || !phone) {
      return res.status(400).json({
        success: false,
        message: "restaurantName, address and phone are required",
      });
    }

    // ✅ Create profile
    const providerProfile = await prisma.providerProfile.create({
      data: {
        restaurantName,
        description,
        address,
        phone,
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      providerProfile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// create a meal..
const addMeals = async (req: Request, res: Response) => {
  try {
    const { name, description, price, image, category } = req.body;
    // check user is login or not
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // basic validation
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and categoryId are required",
      });
    }
    // 🔥 Get provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });
    if (!providerProfile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const newMeal = await prisma.meal.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        category,
        providerId: providerProfile.id,
      },
    });

    return res.status(201).json({
      success: true,
      meal: newMeal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// update a meal
const updateMeal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    console.log(id);
    const { name, description, price, image, category } = req.body;
    const updateMeal = await prisma.meal.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        image,
        category,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Data Update Successfully",
      updateMeal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteMeals = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const deleteMeal = await prisma.meal.delete({
      where: { id },
    });
    return res.status(200).json({
      success: true,
      message: "Data Deleted Successfully",
      data: deleteMeal,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// update order status
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as string;
    
    const { status } = req.body;
    const updateStatus = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: status,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updateStatus,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const providerApi = {
  addMeals,
  updateMeal,
  deleteMeals,
  createProviderProfile,
  updateOrderStatus,
};
