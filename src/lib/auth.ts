import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { User } from "../generated/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // anabel the email & password feature
  emailAndPassword: {
    enabled: true,
  },
});

// set user to global for TS

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
