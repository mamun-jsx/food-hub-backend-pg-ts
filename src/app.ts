
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import routes from "./Router";

const app = express();
// authentication url from better auth..
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true,
  }),
);


app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

//  all routes -->
app.use(routes);
export default app;
