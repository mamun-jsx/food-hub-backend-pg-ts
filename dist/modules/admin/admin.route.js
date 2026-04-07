import { Router } from "express";
import { adminApis } from "./admin.controller.js";
const adminRoute = Router();
adminRoute.get("/users", adminApis.getAllUser);
adminRoute.patch("/users/:id", adminApis.updateUser);
adminRoute.get("/orders", adminApis.adminOrderView);
export default adminRoute;
//# sourceMappingURL=admin.route.js.map