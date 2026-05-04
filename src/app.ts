import express from "express";
import cors from "cors";
import routes from "./Router/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
    credentials: true,
  }),
);

app.use(express.json());

//  all routes -->
app.use(routes);

export default app;
