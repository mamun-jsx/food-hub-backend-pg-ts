// src/lib/constants.ts
export const Role = {
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
  CUSTOMER: "CUSTOMER",
} as const; // 'as const' ensures literal string types

export type RoleType = (typeof Role)[keyof typeof Role]; // "ADMIN" | "PROVIDER" | "CUSTOMER"
