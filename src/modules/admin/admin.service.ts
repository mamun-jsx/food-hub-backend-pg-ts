import { prisma } from "../../lib/prisma.js";

const getAllUsers = async () => {
  return await prisma.user.findMany();
};

const updateUserRole = async (userId: string, role: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role },
  });
};

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserRole,
  getAllOrders,
};
