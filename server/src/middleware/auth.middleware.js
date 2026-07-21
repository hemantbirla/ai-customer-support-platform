import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import { verifyAccessToken } from "../utils/jwt.js"; // 💡 Use your utility helper!

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(401, "Authentication required"));
    }

    const token = authHeader.split(" ")[1];

    // Use your centralized verification helper
    const decoded = verifyAccessToken(token);

    const userId = decoded.id || decoded._id;

    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error.message);

    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    }

    return next(new ApiError(401, "Invalid token"));
  }
};

export default authMiddleware;
