export const requireRoles = (allowedRoles) => {
    return (req, res, next) => {
        // req.user is populated by the 'setUser' middleware above
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Please log in first",
            });
        }
        // Since you added 'role' to Better Auth additionalFields, it's available here
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