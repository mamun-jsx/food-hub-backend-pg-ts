import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const getAllUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "You are not login" });
    }
    const users = await prisma.user.findMany();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    console.error("Error fetching users:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      details: error.message || error,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const { role } = req.body;
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    
    res.status(200).json({ success: true, user: updateUser });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const adminApis = {
  getAllUser,
  updateUser,
};
