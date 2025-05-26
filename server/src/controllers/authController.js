const authService = require("../services/authService");
const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../utils/attachCookieTokens");
const RefreshToken = require("../models/refreshTokenModel");
const validateInput = require("../utils/validateInput");
const { signUpSchema, loginSchema } = require("../validations/authValidations");

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await authService.signupUser(req.body);

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
    const user = await authService.loginUser(req.body);

    // Generate and attach tokens
    attachAccessCookie(user.id, res);
    const { refreshToken, expiresAt } = attachRefreshCookie(user.id, res);

    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    });

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
    const userId = await authService.refreshTokens(refreshToken, res);

    // Generate new tokens
    attachAccessCookie(userId, res);
    const { refreshToken: newRefreshToken, expiresAt } = attachRefreshCookie(
      userId,
      res,
    );

    // Save new refresh token to the database
    await RefreshToken.create({
      userId: userId,
      token: newRefreshToken,
      expiresAt,
    });

    res.status(200).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user.id, req.accessToken);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
