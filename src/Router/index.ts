import { Router } from "express";
import loginRoute from "../modules/auth/login.reg.route";
import adminRoute from "../modules/admin/admin.route";
import { setUser } from "../middlewear/setUser";
import providerRoute from "../modules/provider/provider.route";
import { requireRoles } from "../middlewear/requireRoles";
import { Role } from "../lib/constants";

const routes = Router();
// test route
routes.get("/", (req, res) => {
  res.send("Server is running smooth");
});

// ____________login route _____________

routes.use("/api/v1", loginRoute);

routes.use(setUser);
// ___________ Admin route _____________

routes.use("/api/admin", requireRoles([Role.ADMIN]), adminRoute);

routes.use("/api/provider", requireRoles([Role.PROVIDER]), providerRoute);

export default routes;
