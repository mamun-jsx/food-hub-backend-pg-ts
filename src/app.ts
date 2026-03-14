import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import routes from "./Router";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, //frontend URL
    credentials: true,
  }),
);

// authentication url from better auth..
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

//  all routes -->
app.use(routes);
export default app;
