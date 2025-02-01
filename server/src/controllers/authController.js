const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const AppError = require("../utils/AppError");
const InvalidAccessToken = require("../models/invalidAccessTokenModel");
const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../utils/attachCookieTokens");
const authService = require("../services/authService");

exports.signUp = async (req, res, next) => {
  try {
    const { email, name, password, passwordConfirm } = req.body;

    if (!email || !name || !password || !passwordConfirm) {
      return next(
        new AppError(
          "Please provide name, email, password and passwordConfirm",
          422,
        ),
      );
    }

    const newUser = await authService.signUp({
      name,
      email,
      password,
      passwordConfirm,
    });

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
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 422));
    }

    const user = await authService.login(email, password, res);

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

    // Check if the refresh token provided
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