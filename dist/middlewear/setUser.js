import { verifyToken } from "../lib/jwt.utils.js";
export const setUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next();
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return next();
        }
        const decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        console.error("Auth Middleware Error:", error);
        next();
    }
};
//# sourceMappingURL=setUser.js.map