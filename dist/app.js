// import express from "express";
// import { toNodeHandler } from "better-auth/node";
// import cors from "cors";
// import { auth } from "./lib/auth.js";
// import routes from "./Router/index.js";
// const app = express();
// // authentication url from better auth..
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000", 
//     credentials: true,
//   }),
// );
// app.use(express.json());
// app.all("/api/auth/*splat", toNodeHandler(auth));
// //  all routes -->
// app.use(routes);
// export default app;
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth.js";
import routes from "./Router/index.js";
import { parseFrontendOrigins } from "./lib/frontendOrigins.js";
const app = express();
const allowedOrigins = parseFrontendOrigins();
app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        const normalized = origin.replace(/\/+$/, "");
        if (allowedOrigins.includes(normalized)) {
            callback(null, true);
            return;
        }
        callback(null, false);
    },
    credentials: true,
}));
app.use(express.json());
// Auth Route
app.all("/api/auth/*splat", toNodeHandler(auth));
// All other routes
app.use(routes);
// CRITICAL: Export the app for Vercel to handle
export default app;
//# sourceMappingURL=app.js.map