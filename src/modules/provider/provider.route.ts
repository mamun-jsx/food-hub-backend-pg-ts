import { Router } from "express";
import { providerApi } from "./provider.controller";

const providerRoute = Router();

providerRoute.post("/meals", providerApi.addMeals);
providerRoute.put("/meals/:id", providerApi.updateMeal);
providerRoute.delete("/meals/:id", providerApi.deleteMeals);
providerRoute.post("/profile", providerApi.createProviderProfile);
providerRoute.patch("/orders/:id", providerApi.updateOrderStatus);

export default providerRoute;

{
  // ! Provider APIs
  // PATCH /api/provider/orders/:id → update order status
}

// http://localhost:4001/api/provider/meals /Post a meal
// http://localhost:4001/api/provider/profile /Post a meal
// http://localhost:4001/api/provider/meals/:id /Update a meal
// http://localhost:4001/api/provider/meals/:id /Delete a meal
// http://localhost:4001/api/provider/order/:id /Delete a meal
