const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const ensureAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new AppError("Access token not found", 401));
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    console.log(decodedAccessToken);

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
    }

    next(e);
  }
};

module.exports = { ensureAuthenticated };
