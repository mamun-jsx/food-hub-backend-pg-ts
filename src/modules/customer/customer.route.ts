import { Router } from "express";
import { customerAPis } from "./customer.controller";

const customerRoute = Router();
customerRoute.get("/meals", customerAPis.getAllMeal);
customerRoute.get("/providers", customerAPis.getProviders);
customerRoute.get("/providers/:id", customerAPis.getProviderWithMenu);
customerRoute.get("/meals/:id", customerAPis.getMealById);
customerRoute.post("/orders", customerAPis.placeOrder);
customerRoute.get("/orders", customerAPis.getAllOrder);
customerRoute.get("/orders/:id", customerAPis.orderDetails);

export default customerRoute;
