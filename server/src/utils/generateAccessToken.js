const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    subject: "accessToken",
  });

  res.cookie("accessToken", accessToken, {
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRATION + 50000)),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: "/",
  });

  return accessToken;
};

module.exports = generateAccessToken;
