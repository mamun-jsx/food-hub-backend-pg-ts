import { AdminService } from "./admin.service.js";
const getAllUser = async (req, res) => {
    try {
        const users = await AdminService.getAllUsers();
        return res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching users" });
    }
};
const updateUser = async (req, res) => {
    try {
        const updatedUser = await AdminService.updateUserRole(req.params.id, req.body.role);
        return res.status(200).json({ success: true, user: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating user" });
    }
};
const adminOrderView = async (req, res) => {
    try {
        const orders = await AdminService.getAllOrders();
        if (orders.length === 0) {
            return res.status(404).json({ success: true, message: "No order placed yet", data: [] });
        }
        return res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};
export const adminApis = {
    getAllUser,
    updateUser,
    adminOrderView,
};
//# sourceMappingURL=admin.controller.js.map