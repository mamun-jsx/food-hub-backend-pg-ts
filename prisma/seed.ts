import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function main() {
  const password = await bcrypt.hash("123456789", 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { email: "superadmin@gmail.com" },
    update: {},
    create: {
      email: "superadmin@gmail.com",
      name: "Super Admin",
      password: password,
      role: "ADMIN",
    },
  });

  // 2. User
  await prisma.user.upsert({
    where: { email: "almamun@gmail.com" },
    update: {},
    create: {
      email: "almamun@gmail.com",
      name: "Al Mamun",
      password: password,
      role: "USER",
    },
  });

  // 3. Provider
  await prisma.user.upsert({
    where: { email: "provider@gmail.com" },
    update: {},
    create: {
      email: "provider@gmail.com",
      name: "Food Provider",
      password: password,
      role: "PROVIDER",
    },
  });

  console.log("✅ Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
