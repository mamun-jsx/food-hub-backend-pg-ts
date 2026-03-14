import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json({ success: true, users });
  } catch (error: any) {
    console.error("Error in setUser middleware:", error);

    // Manual error handling: send response directly
    return res.status(500).json({
      success: false,
      message: "Internal Server Error in setUser middleware",
      details: error.message || error,
    });
  }
};

export const adminApis = {
  getAllUser,
};
