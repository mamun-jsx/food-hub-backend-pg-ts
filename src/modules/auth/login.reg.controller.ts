import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const registerController = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.register(req.body);
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      ...result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

const signInController = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.login(req.body);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const louOut = async (req: Request, res: Response) => {
  // With JWT, logout is usually handled by the client by deleting the token.
  // We can just return success.
  return res.status(200).json({
    success: true,
    message: "Logged out successfully (please clear your token on client side)",
  });
};

export const LoginRegistrationFunction = {
  signInController,
  registerController,
  louOut,
};
