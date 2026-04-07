import express from "express";
import { LoginRegistrationFunction } from "./login.reg.controller.js";

const loginRoute = express.Router();

loginRoute.post("/sign-up/email", LoginRegistrationFunction.registerController);
loginRoute.post("/sign-in/email", LoginRegistrationFunction.signInController);
loginRoute.post("/sign-out", LoginRegistrationFunction.louOut);

export default loginRoute;
