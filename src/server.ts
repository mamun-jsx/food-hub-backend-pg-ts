import app from "./app.js";
import { prisma } from "./lib/prisma.js";

// Use one consistent port
const PORT = process.env.PORT || 4000;
console.log(PORT)

async function startServer() {
  try {
    await prisma.$connect();
    console.log("🚀 Database connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer()
