import { Router } from "express";
import { customerAPis } from "./customer.controller.js";

const customerRoute = Router();
customerRoute.get("/meals", customerAPis.getAllMeal);
customerRoute.get("/provider", customerAPis.getProviders);
customerRoute.get("/providers/:id", customerAPis.getProviderWithMenu);
customerRoute.get("/meals/:id", customerAPis.getMealById);
// customerRoute.get("/orders", customerAPis.getAllOrder);
customerRoute.get("/orders/", customerAPis.getMyOrders); // pass user id - MUST BE BEFORE :id route
customerRoute.get("/orders/:id", customerAPis.orderDetails);
customerRoute.post("/orders", customerAPis.placeOrder);
customerRoute.post("/reviews", customerAPis.createReview);
customerRoute.get("/get-provider/:id", customerAPis.getProviderById);
customerRoute.patch("/profile-update", customerAPis.updateUserProfile); // pass user id

export default customerRoute;
// api/orders
