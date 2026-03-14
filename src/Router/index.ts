import { Router } from "express";
import loginRoute from "../modules/auth/login.reg.route";

const routes = Router();

// test route 
routes.get("/", (req, res) => {
  res.send("Server is running smooth");
});
// login route 
routes.use("/api/v1",loginRoute)


export default routes;
