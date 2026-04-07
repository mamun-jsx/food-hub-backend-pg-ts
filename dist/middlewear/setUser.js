import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
export const setUser = async (req, res, next) => {
    try {
        // 1. Get session using Better Auth's Node helper
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (session) {
            // 2. Attach user to req so requireRoles can see it
            req.user = session.user;
            req.session = session.session;
        }
        next();
    }
    catch (error) {
        console.error("Auth Middleware Error:", error);
        next(); // Move to next to let requireRoles handle the "missing user" error
    }
};
//# sourceMappingURL=setUser.js.map