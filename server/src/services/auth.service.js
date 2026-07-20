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
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  async register(payload) {
    const { name, email, password, role, avatar } = payload;

    // Check if email already exists
    const existingUser = await authRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(
        STATUS_CODES.CONFLICT,
        MESSAGES.AUTH.EMAIL_ALREADY_EXISTS,
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const user = await authRepository.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      avatar,
    });

    // Remove sensitive fields
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;

    return userObject;
  }

  /**
   * Login user
   * @param {Object} payload
   * @returns {Promise<Object>}
   */
  async login(payload) {
    const { email, password } = payload;

    const user = await authRepository.findByEmail(email.toLowerCase());

    if (!user) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.AUTH.INVALID_CREDENTIALS,
      );
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.AUTH.INVALID_CREDENTIALS,
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

  // Logout user
  async logout(userId) {
    await authRepository.clearRefreshToken(userId);
    return true;
  }

  // Refresh Token
  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.AUTH.INVALID_TOKEN,
      );
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await authRepository.findById(decoded.id);

    if (!user) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.AUTH.INVALID_TOKEN,
      );
    }

    if (user.refreshToken !== refreshToken) {
      throw new ApiError(
        STATUS_CODES.UNAUTHORIZED,
        MESSAGES.AUTH.INVALID_TOKEN,
      );
    }

    const accessToken = generateAccessToken(user);

    return {
      accessToken,
    };
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

// export const loginUser = async () => {};

// export const logoutUser = async () => {};

// export const refreshAccessToken = async () => {};

// export const getUserProfile = async () => {};

// export const updateUserProfile = async () => {};
