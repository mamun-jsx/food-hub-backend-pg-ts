import { Router } from "express";
import { customerAPis } from "./customer.controller.js";
import { setUser } from "../../middlewear/setUser.js";
import { requireRoles } from "../../middlewear/requireRoles.js";
import { Role } from "../../lib/constants.js";

const customerRoute = Router();
customerRoute.get("/meals", customerAPis.getAllMeal);
customerRoute.get("/provider", customerAPis.getProviders);
customerRoute.get("/providers/:id", customerAPis.getProviderWithMenu);
customerRoute.get("/meals/:id", customerAPis.getMealById);
customerRoute.get("/orders", setUser, requireRoles([Role.USER, Role.ADMIN, Role.PROVIDER]), customerAPis.getMyOrders);
customerRoute.get("/orders/:id", setUser, requireRoles([Role.USER, Role.ADMIN, Role.PROVIDER]), customerAPis.orderDetails);
customerRoute.post("/orders", setUser, requireRoles([Role.USER, Role.ADMIN, Role.PROVIDER]), customerAPis.placeOrder);
customerRoute.post("/reviews", setUser, requireRoles([Role.USER, Role.ADMIN, Role.PROVIDER]), customerAPis.createReview);
customerRoute.get("/get-provider/:id", customerAPis.getProviderById);
customerRoute.get("/profile", setUser, customerAPis.getMyProfile);
customerRoute.patch("/profile-update", setUser, requireRoles([Role.USER, Role.ADMIN, Role.PROVIDER]), customerAPis.updateUserProfile);

export default customerRoute;
