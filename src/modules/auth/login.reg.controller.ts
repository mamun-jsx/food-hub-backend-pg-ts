import { Request, Response } from "express";
import { auth } from "../../lib/auth";


// ============================| SIGN-UP |==========================================
const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, image } = req.body;

    const data = await auth.api.signUpEmail({
      body: { name, email, password, image },
      headers: req.headers as any,
    });

    return res.status(201).json({
      success: true,
      data,
    });
  } catch (error: any) {
    const status =
      typeof error.statusCode === "number" ? error.statusCode : 500;
    return res.status(status).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

// ============================|LOGIN |==========================================
const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Use 'asResponse: true' to get the full response object including headers
    const data = await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: req.headers as any,
      asResponse: true,
    });

    // 1. Manually extract the 'Set-Cookie' header
    const setCookie = data.headers.get("set-cookie");

    if (setCookie) {
      // 2. Set it on your Express response
      res.setHeader("Set-Cookie", setCookie);
    }

    // 3. Convert the Better Auth response to JSON to send back to client
    const user = await data.json();

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const LoginRegistrationFunction = {
  signInController,
  registerController,
};
