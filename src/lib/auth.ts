
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Define user roles and default values
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer", // Default for new sign-ups
        input: false, // Prevents users from manually setting their role during sign-up
      },
    },
  },

  trustedOrigins: [process.env.FRONTEND_URL || "http://localhost:3000"],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true, // Optional: automatically signs in user after sign up
  },
});
