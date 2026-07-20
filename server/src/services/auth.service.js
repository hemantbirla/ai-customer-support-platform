import bcrypt from "bcrypt";
import authRepository from "../repositories/auth.repository.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

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
}

const authServiceInstance = new AuthService();
export default authServiceInstance;

// export const loginUser = async () => {};

// export const logoutUser = async () => {};

// export const refreshAccessToken = async () => {};

// export const getUserProfile = async () => {};

// export const updateUserProfile = async () => {};
