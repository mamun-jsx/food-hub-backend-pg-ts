// import { Router } from "express";
// import loginRoute from "../modules/auth/login.reg.route";
// import adminRoute from "../modules/admin/admin.route";
// import { setUser } from "../middlewear/setUser";
// import providerRoute from "../modules/provider/provider.route";
// import { requireRoles } from "../middlewear/requireRoles";
// import { Role } from "../lib/constants";
// import customerRoute from "../modules/customer/customer.route";
// const routes = Router();
// // test route
// routes.get("/", (req, res) => {
//   res.send("Server is running smooth");
// });
// // ____________login route _____________
// routes.use( loginRoute);
// routes.use("/api", customerRoute);
// routes.use(setUser);
// // ___________ Admin route _____________
// routes.use("/api/admin", requireRoles([Role.ADMIN]), adminRoute);
// routes.use("/api/provider", requireRoles([Role.PROVIDER]), providerRoute);
// // ------------ Customer route ------------
// export default routes;
import { Router } from "express";
import loginRoute from "../modules/auth/login.reg.route.js";
import adminRoute from "../modules/admin/admin.route.js";
import providerRoute from "../modules/provider/provider.route.js";
import customerRoute from "../modules/customer/customer.route.js";
import { setUser } from "../middlewear/setUser.js";
import { requireRoles } from "../middlewear/requireRoles.js";
import { Role } from "../lib/constants.js";
const routes = Router();
// ---------------- Test Route ----------------
routes.get("/", (req, res) => {
    res.send("Server is running smooth");
});
// ---------------- Public Routes ----------------
routes.use(loginRoute);
// ---------------- Protected Customer Routes ----------------
// user must be logged in to access customer APIs
// routes.use("/api", setUser, customerRoute);
routes.use("/api", setUser, customerRoute);
// ---------------- Admin Routes ----------------
// user must be logged in + must be ADMIN
routes.use("/api/admin", setUser, requireRoles([Role.ADMIN]), adminRoute);
// ---------------- Provider Routes ----------------
// user must be logged in + must be PROVIDER
routes.use("/api/provider", setUser, requireRoles([Role.PROVIDER]), providerRoute);
export default routes;
//# sourceMappingURL=index.js.map