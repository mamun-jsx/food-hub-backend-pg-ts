import { prisma } from "../../lib/prisma.js";
// get all user
const getAllUser = async (req, res) => {
    try {
        if (!req.user) {
            return res
                .status(401)
                .json({ success: false, message: "You are not login" });
        }
        const users = await prisma.user.findMany();
        return res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            details: error.message || error,
        });
    }
};
// update user
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        res.status(200).json({ success: true, user: updateUser });
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
//  view all order
const adminOrderView = async (req, res) => {
    try {
        const orderData = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        meal: true,
                    },
                },
            },
        });
        if (orderData.length === 0) {
            return res
                .status(404)
                .json({ success: true, message: "No order placed yet" });
        }
        return res.status(200).json({ success: true, data: orderData });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
export const adminApis = {
    getAllUser,
    updateUser,
    adminOrderView,
};
//# sourceMappingURL=admin.controller.js.map