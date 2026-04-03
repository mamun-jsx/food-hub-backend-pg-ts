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

    // check auth
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ FIXED VALIDATION
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    // get provider
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
// delete a meal
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
// get provider order 
const getProviderOrders = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const providerId = req.user.id;

    // 1. find provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId: providerId,
      },
    });

    if (!providerProfile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    // 2. get orders that contain provider's meals
    const orders = await prisma.order.findMany({
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

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// get provider meal 
export const getAllMeals = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // get provider profile
    const providerProfile = await prisma.providerProfile.findUnique({
      where: {
        userId: req.user.id,
      },
    });

    if (!providerProfile) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    // get ONLY this provider meals + only needed fields
    const meals = await prisma.meal.findMany({
      where: {
        providerId: providerProfile.id,
      },
      select: {
        id: true,
        name: true,
        image: true,
        price:true,
        description:true,
        category:true
      },
    });

    return res.status(200).json({
      success: true,
      meals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// update provider profile 
const updateProviderProfile = async (req: Request, res: Response) => {
  try {
    const { restaurantName, description, address, phone } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const updatedProfile = await prisma.providerProfile.update({
      where: { userId },
      data: {
        ...(restaurantName && { restaurantName }),
        ...(description && { description }),
        ...(address && { address }),
        ...(phone && { phone }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      providerProfile: updatedProfile,
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
  getProviderOrders,
  getAllMeals,
  updateProviderProfile
};
