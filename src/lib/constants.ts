// src/lib/constants.ts
export const Role = {
  ADMIN: "ADMIN",
  PROVIDER: "PROVIDER",
  USER: "USER",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role]; // "ADMIN" | "PROVIDER" | "USER"
