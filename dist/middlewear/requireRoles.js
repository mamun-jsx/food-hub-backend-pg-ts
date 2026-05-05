export const requireRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Please log in first",
            });
        }
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: This requires ${allowedRoles.join(" or ")} permissions.`,
            });
        }
        next();
    };
};
//# sourceMappingURL=requireRoles.js.map