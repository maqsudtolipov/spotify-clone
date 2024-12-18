const AppError = require("../utils/AppError");

const ensureAuthenticated = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    return next(new AppError("Access token not found", 401));
  }

  next();
};

module.exports = { ensureAuthenticated };
