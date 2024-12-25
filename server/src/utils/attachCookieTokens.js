const {
  generateAccessToken,
  generateRefreshToken,
} = require("./genereateTokens");

/**
 * It attaches a access token to the response object and returns it
 * @param userId
 * @param res
 * @returns {*}
 */
exports.attachAccessCookie = (userId, res) => {
  const accessToken = generateAccessToken();

  res.cookie("accessToken", accessToken, {
    expires: new Date(
      Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION + 50000),
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return accessToken;
};

/**
 * It attaches a refresh token to the response object and returns it
 * @param userId
 * @param res
 * @returns {*}
 */
exports.attachRefreshCookie = (userId, res) => {
  const refreshToken = generateRefreshToken();

  res.cookie("refreshToken", refreshToken, {
    expires: new Date(
      Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION + 50000),
    ),
    httpOnly: true,
    secure: true,
    path: "/api/auth/refresh-token",
  });

  return refreshToken;
};
