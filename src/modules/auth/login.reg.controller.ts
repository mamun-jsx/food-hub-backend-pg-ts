import { Request, Response, NextFunction } from "express";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, image } = req.body; // take data form client
    // validation input exist or not
    if (!name || !email || !password || image) {

      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    // call Better Auth signUP functions
    const data = await auth.api.signUpEmail({
      body: { name, email, password, image },
      headers: { cookies: req.headers.cookie as string | undefined },
    });
    const existingUser = await prisma.user.findUnique({
      where: { email: data.user.email },
    });

    // store the data by prisma into Postgres if user is not exist..
    if (!existingUser) {
      await prisma.user.create({
        data: {
          name: data.user.name,
          email: data.user.email,
          role: "CUSTOMER",
        },
      });
    }
    console.log("registration --> ", data.user);
    // response to client side
    return res.status(201).json({ success: true, user: data.user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body; // take data from input
    //    check
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "Email and password are required" });
    }
    // call better Auth function
    const data = await auth.api.signInEmail({
      body: { email, password, rememberMe: true },
      headers: { cookie: req.headers.cookie as string | undefined },
    });

    // send response to client
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

export const LoginRegistrationFunction = {
  signInController,
  registerController,
};
