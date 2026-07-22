import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

const SALT_ROUNDS = 12;

class AuthService {
  /**
   * Register a new user
   */
  async register(payload) {
    const { name, email, password, role, avatar } = payload;

    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(
        STATUS_CODES.CONFLICT || 409,
        MESSAGES?.AUTH?.EMAIL_ALREADY_EXISTS || "Email already exists",
      );
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await authRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      avatar,
    });

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;

    return userObject;
  }

  /**
   * Login user
   */
  async login(payload) {
    const { email, password } = payload;

    // Standardize email check
    const user = await authRepository.findByEmail(email.toLowerCase());

    if (!user) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED || 401,
        MESSAGES?.AUTH?.INVALID_CREDENTIALS || "Invalid email or password",
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED || 401,
        MESSAGES?.AUTH?.INVALID_CREDENTIALS || "Invalid email or password",
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await authRepository.updateRefreshToken(user._id, refreshToken);
    await authRepository.updateLastLogin(user._id);

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return {
      user: userResponse,
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST || 400,
        "Refresh token is required",
      );
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await authRepository.findById(decoded.id);

    if (!user) {
      throw new ApiError(STATUS_CODES.UNAUTHORIZED || 401, "User not found");
    }

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED || 401,
        MESSAGES?.AUTH?.INVALID_TOKEN || "Invalid refresh token",
      );
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await authRepository.updateRefreshToken(user._id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * Logout user
   */
  async logout(userId) {
    await authRepository.clearRefreshToken(userId);
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
