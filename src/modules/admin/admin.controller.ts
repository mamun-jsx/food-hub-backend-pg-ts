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

export const adminApis = {
  getAllUser,
};
