import { Router } from "express";
import { adminApis } from "./admin.controller";

const adminRoute = Router();
adminRoute.get("/users", adminApis.getAllUser);

export default adminRoute;
