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

export const customerAPis = {
  getAllMeal,
  getMealById,
  getProviders,
  getProviderWithMenu,
};
