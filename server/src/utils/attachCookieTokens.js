const {
  generateAccessToken,
  generateRefreshToken,
} = require("./genereateTokens");

/**
 * It attaches an access token to the response object and returns it
 * @param userId
 * @param res
 * @returns {*}
 */
exports.attachAccessCookie = (userId, res) => {
  const accessToken = generateAccessToken(userId);

  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION)),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
    domain: process.env.NODE_ENV === "production" ? process.env.CLIENT_DOMAIN : "localhost",
  };

  res.cookie("accessToken", accessToken, cookieOptions);

  return accessToken;
};

/**
 * It attaches a refresh token to the response object and returns it
 * @param userId
 * @param res
 * @returns {*}
 */
exports.attachRefreshCookie = (userId, res) => {
  const refreshToken = generateRefreshToken(userId);
  const expiresAt = new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION));

  const cookieOptions = {
    expires: expiresAt,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/refresh-token",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    domain: process.env.NODE_ENV === "production" ? process.env.CLIENT_DOMAIN : "localhost",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return { refreshTokens: refreshToken, expiresAt };
};