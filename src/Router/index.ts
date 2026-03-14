import { Router } from "express";
import loginRoute from "../modules/auth/login.reg.route";
import adminRoute from "../modules/admin/admin.route";
import { setUser } from "../middlewear/setUser";
import { requireRoles } from "../middlewear/requireRoles";
import { Role } from "../generated/prisma/enums";

const routes = Router();
// test route
routes.get("/", (req, res) => {
  res.send("Server is running smooth");
});
routes.use(setUser);

// ____________login route _____________

routes.use("/api/v1", loginRoute);

// ___________ Admin route _____________

routes.use("/api/v1", requireRoles([Role.ADMIN]), adminRoute);

export default routes;
