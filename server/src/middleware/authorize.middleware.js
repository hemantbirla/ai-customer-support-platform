import { ROLE_PERMISSIONS } from "../constants/permissions.constants.js";

const authorize = (permission) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "Authentication required.",
        });
      }

      const role = req.user.role;

      const permissions = ROLE_PERMISSIONS[role] || [];

      // Admin automatically has every permission
      if (role === "ADMIN") {
        return next();
      }

      if (!permissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action.",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
