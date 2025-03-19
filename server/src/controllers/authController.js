const AppError = require("../utils/AppError");
const authService = require("../services/authService");

exports.signUp = async (req, res, next) => {
  try {
    const inputData = req.body;
    const newUser = await authService.signUp(inputData);

    res.status(201).json({
      status: "success",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.name,
      },
    });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const inputData = req.body;
    const user = await authService.login(inputData, res);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new AppError("No refresh token provided", 401));
    }

    await authService.refreshToken(refreshToken, res);

    res.status(200).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logout(req.user.id, req.accessToken);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
