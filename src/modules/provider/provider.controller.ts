import { Request, Response } from "express";
import { ProviderService } from "./provider.service.js";

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const { restaurantName, address, phone } = req.body;
    if (!restaurantName || !address || !phone) {
      return res.status(400).json({ success: false, message: "restaurantName, address and phone are required" });
    }

    const providerProfile = await ProviderService.createProviderProfile(req.user!.id, req.body);
    return res.status(201).json({ success: true, providerProfile });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error creating profile" });
  }
};

const addMeals = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, price and category are required" });
    }

    const newMeal = await ProviderService.addMeal(req.user!.id, req.body);
    return res.status(201).json({ success: true, meal: newMeal });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error adding meal" });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  try {
    const updatedMeal = await ProviderService.updateMeal(req.params.id as string, req.body);
    return res.status(200).json({ success: true, message: "Data Update Successfully", updateMeal: updatedMeal });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating meal" });
  }
};

const deleteMeals = async (req: Request, res: Response) => {
  try {
    const deletedMeal = await ProviderService.deleteMeal(req.params.id as string);
    return res.status(200).json({ success: true, message: "Data Deleted Successfully", data: deletedMeal });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error deleting meal" });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const updatedOrder = await ProviderService.updateOrderStatus(req.params.id as string, req.body.status);
    return res.status(200).json({ success: true, message: "Order status updated successfully", data: updatedOrder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating order status" });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const orders = await ProviderService.getProviderOrders(req.user!.id);
    return res.status(200).json({ success: true, data: orders });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error fetching orders" });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const meals = await ProviderService.getAllMeals(req.user!.id);
    return res.status(200).json({ success: true, meals });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error fetching meals" });
  }
};

const updateProviderProfile = async (req: Request, res: Response) => {
  try {
    const updatedProfile = await ProviderService.updateProviderProfile(req.user!.id, req.body);
    return res.status(200).json({ success: true, message: "Profile updated successfully", providerProfile: updatedProfile });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error updating profile" });
  }
};

const getProviderProfile = async (req: Request, res: Response) => {
  try {
    const profile = await ProviderService.getProviderProfile(req.user!.id);
    return res.status(200).json({ success: true, profile });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message || "Error fetching profile" });
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
  updateProviderProfile,
  getProviderProfile,
};
