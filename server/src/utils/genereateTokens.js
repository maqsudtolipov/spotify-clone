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
 * @returns {*}
 */
exports.generateRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    subject: "refreshToken",
  });
