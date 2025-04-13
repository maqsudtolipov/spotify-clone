const jwt = require("jsonwebtoken");

/**
 * It generates an access token
 * @param userId
 * @returns {*}
 */
exports.generateAccessToken = (userId) =>
  jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
  });

/**
 * It generates a refresh token
 * @param userId
 * @param customExpiresIn It is used for testing custom expiration times
 * @returns {*}
 */
exports.generateRefreshToken = (userId, customExpiresIn) =>
  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: customExpiresIn || process.env.REFRESH_TOKEN_EXPIRATION,
    subject: "refreshToken",
  });
