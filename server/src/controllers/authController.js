const bcrypt = require("bcryptjs");
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

    // Save refresh token in the database
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
  res.status(200).json({ message: "This route not complete yet" });
};
