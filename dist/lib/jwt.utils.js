import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "7d");
export const signToken = (payload) => {
    const options = {
        expiresIn: JWT_EXPIRES_IN,
    };
    return jwt.sign(payload, JWT_SECRET, options);
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=jwt.utils.js.map