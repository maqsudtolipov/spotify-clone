const jwt = require("jsonwebtoken");

const generateRefreshToken = (userId, res) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    subject: "refreshToken",
  });

  res.cookie("refreshToken", refreshToken, {
    expires: new Date(
      Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRATION),
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/api/auth/refresh-token",
  });

  return refreshToken;
};

module.exports = generateRefreshToken;
