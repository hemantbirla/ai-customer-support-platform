import User from "../models/User.js";

class AuthRepository {
  /**
   * Find user by email
   * @param {string} email
   * @returns {Promise<User|null>}
   */
  async findByEmail(email) {
    return User.findOne({ email }).select("+password +refreshToken");
  }

  /**
   * Find user by ID
   * @param {string} userId
   * @returns {Promise<User|null>}
   */
  async findById(userId) {
    return User.findById(userId);
  }

  /**
   * Create new user
   * @param {Object} userData
   * @returns {Promise<User>}
   */
  async create(userData) {
    return User.create(userData);
  }

  /**
   * Save refresh token
   * @param {string} userId
   * @param {string} refreshToken
   * @returns {Promise<User|null>}
   */
  async updateRefreshToken(userId, refreshToken) {
    return User.findByIdAndUpdate(userId, { refreshToken }, { new: true });
  }

  /**
   * Update last login
   * @param {string} userId
   * @returns {Promise<User|null>}
   */
  async updateLastLogin(userId) {
    return User.findByIdAndUpdate(
      userId,
      {
        lastLogin: new Date(),
      },
      { new: true },
    );
  }

  /**
   * Update profile
   * @param {string} userId
   * @param {Object} payload
   * @returns {Promise<User|null>}
   */
  async updateProfile(userId, payload) {
    return User.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true,
    });
  }
}

export default new AuthRepository();
