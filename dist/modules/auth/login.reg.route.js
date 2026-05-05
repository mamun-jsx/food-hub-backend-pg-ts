import express from "express";
import { LoginRegistrationFunction } from "./login.reg.controller.js";
const loginRoute = express.Router();
loginRoute.post("/api/auth/register", LoginRegistrationFunction.registerController);
loginRoute.post("/api/auth/login", LoginRegistrationFunction.signInController);
loginRoute.post("/api/auth/logout", LoginRegistrationFunction.louOut);
export default loginRoute;
//# sourceMappingURL=login.reg.route.js.map