const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");
const AppError = require("../utils/AppError");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");

exports.signUp = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    };
    const { email, name, password, passwordConfirm } = userData;

    // Check if all required fields provided
    if (!email || !name || !password || !passwordConfirm) {
      return next(
        new AppError(
          "Please provide name, email, password and passwordConfirm",
          422,
        ),
      );
    }

    // Check if the email already exists
    const user = await User.findOne({ email });
    if (user) {
      return next(new AppError("Email already exists", 409));
    }

    const newUser = await User.create(userData);
    res.status(201).json({ status: "success", data: newUser });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    // Validate email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 422));
    }

    // Check if the user exists
    const user = await User.findOne({ email }, "id name password");
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate access and refresh tokens
    generateAccessToken(user.id, res);
    const refreshToken = generateRefreshToken(user.id, res);

    // Save refresh token to the database
    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
    });

    res.status(200).json({
      status: "success",
      user: {
        id: user.id,
        name: user.name,
      },
      refreshToken,
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
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const userRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
      userId: decodedRefreshToken.userId,
    });

    if (!userRefreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token is invalid or expired" });
    }

    // INFO: this logs out the user from all their devices
    // Delete current refresh token from the database
    await RefreshToken.deleteMany({ userId: decodedRefreshToken.userId });

    // Generate access and refresh tokens
    generateAccessToken(decodedRefreshToken.userId, res);
    const newRefreshToken = generateRefreshToken(
      decodedRefreshToken.userId,
      res,
    );

    // Save new refresh token to the database
    await RefreshToken.create({
      userId: decodedRefreshToken.userId,
      token: newRefreshToken,
    });

    res.status(200).json({ status: "success" });
  } catch (e) {
    if (
      e instanceof jwt.TokenExpiredError ||
      e instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }

    next(e);
  }
};
