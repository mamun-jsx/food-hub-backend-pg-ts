import { CustomerService } from "./customer.service.js";
const getAllMeal = async (req, res) => {
    try {
        const { search, category } = req.query;
        const meals = await CustomerService.getAllMeals(search, category);
        return res.status(200).json({
            success: true,
            numberOfItems: meals.length,
            meal: meals,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching meals" });
    }
};
const getMealById = async (req, res) => {
    try {
        const meal = await CustomerService.getMealById(req.params.id);
        return res.status(200).json({ success: true, data: meal });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching meal" });
    }
};
const getProviders = async (req, res) => {
    try {
        const providers = await CustomerService.getProviders();
        if (providers.length === 0) {
            return res.status(404).json({ success: true, message: "No providers registered yet", provider: [] });
        }
        return res.status(200).json({ success: true, provider: providers });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching providers" });
    }
};
const getProviderWithMenu = async (req, res) => {
    try {
        const meals = await CustomerService.getProviderWithMenu(req.params.id);
        if (meals.length === 0) {
            return res.status(404).json({ success: false, message: "No meals found for this provider" });
        }
        return res.status(200).json({ success: true, count: meals.length, data: meals });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching menu" });
    }
};
const placeOrder = async (req, res) => {
    try {
        const { userId, address, items } = req.body;
        const result = await CustomerService.placeOrder(userId, address, items);
        return res.status(201).json({ success: true, message: "Order placed successfully", data: result });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Order failed" });
    }
};
const getAllOrder = async (req, res) => {
    try {
        const orders = await CustomerService.getAllOrders(req.user.id);
        return res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};
const orderDetails = async (req, res) => {
    try {
        const result = await CustomerService.getOrderDetails(req.params.id);
        return res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching order details" });
    }
};
const getMyOrders = async (req, res) => {
    try {
        const orders = await CustomerService.getAllOrders(req.user.id);
        return res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching my orders" });
    }
};
const getProviderById = async (req, res) => {
    try {
        const profile = await CustomerService.getProviderById(req.params.id);
        if (!profile) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }
        return res.status(200).json({ success: true, profile });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching provider" });
    }
};
const createReview = async (req, res) => {
    try {
        const review = await CustomerService.createReview(req.body);
        return res.status(200).json({ success: true, message: "Review created successfully", reviewData: review });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message || "Review failed" });
    }
};
const updateUserProfile = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name && !image) {
            return res.status(400).json({ success: false, message: "Name or image is required" });
        }
        const updatedUser = await CustomerService.updateUserProfile(req.user.id, { name, image });
        return res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating profile" });
    }
};
const getMyProfile = async (req, res) => {
    try {
        const user = await CustomerService.getUserProfile(req.user.id);
        return res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching profile" });
    }
};
export const customerAPis = {
    getAllMeal,
    getMealById,
    getProviders,
    getProviderWithMenu,
    placeOrder,
    getAllOrder,
    orderDetails,
    createReview,
    getProviderById,
    getMyOrders,
    updateUserProfile,
    getMyProfile,
};
//# sourceMappingURL=customer.controller.js.map