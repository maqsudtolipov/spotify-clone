const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const InvalidAccessToken = require("../models/invalidAccessTokenModel");

const ensureAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new AppError("Access token not found", 401));
  }

  if (await InvalidAccessToken.findOne({ token: accessToken })) {
    return next(
      new AppError("Access token invalid", 401, "AccessTokenInvalid"),
    );
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    // Check if the user exists
    const user = await User.findById(
      decodedAccessToken.userId,
      "id likedSongs library",
    );
    if (!user) {
      return next(
        new AppError("The user belonging to this token does not exist", 401),
      );
    }

    // TODO: Check if the user changed their password after the token was issued

    req.user = {
      id: user.id,
      likedSongs: String(user.likedSongs),
      library: String(user.library),
    };
    req.accessToken = { token: accessToken, exp: decodedAccessToken.exp };

    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Access token expired", code: "AccessTokenExpired" });
    } else if (e instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Access token invalid", code: "AccessTokenInvalid" });
    } else {
      next(e);
    }
  }
};

module.exports = ensureAuthenticated;
