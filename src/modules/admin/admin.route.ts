import { Router } from "express";
import { adminApis } from "./admin.controller";
import { Role } from "../../generated/prisma/enums";
import { requireRoles } from "../../middlewear/requireRoles";

const adminRoute = Router();

adminRoute.get("/users", adminApis.getAllUser);

export default adminRoute;
