import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { parseFrontendOrigins } from "./frontendOrigins.js";
const authBaseURL = process.env.BETTER_AUTH_URL?.trim().replace(/\/+$/, "") ?? undefined;
/** Separate frontend (e.g. *.vercel.app) + API subdomain needs SameSite=None on HTTPS */
const isVercel = process.env.VERCEL === "1";
export const auth = betterAuth({
    baseURL: authBaseURL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    defaultCookieAttributes: isVercel
        ? { sameSite: "none", secure: true }
        : { sameSite: "lax" },
    // Define user roles and default values
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "CUSTOMER", // Default for new sign-ups - MUST match Prisma schema
                input: false, // Prevents users from manually setting their role during sign-up
            },
        },
    },
    trustedOrigins: parseFrontendOrigins(),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true, // Optional: automatically signs in user after sign up
    },
});
