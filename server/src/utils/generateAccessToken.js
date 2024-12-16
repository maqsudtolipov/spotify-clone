const generateAccessToken = (userId, res) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    subject: "accessToken",
  });

  res.cookie("accessToken", accessToken, {
    expires: process.env.ACCESS_TOKEN_EXPIRATION,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return accessToken;
};

module.exports = generateAccessToken;
