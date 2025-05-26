const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const RefreshToken = require("../models/refreshTokenModel");
const InvalidAccessToken = require("../models/invalidAccessTokenModel");

exports.signupUser = async (signUpInput) => {
  const { name, email, password, passwordConfirm, isArtist } = signUpInput;

  // Check if the user already exists
  const existingUser = await User.findOne({ email: signUpInput.email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Prepare user data
  const newUser = {
    name,
    email,
    password,
    passwordConfirm,
    img: await User.getDefaultUserImgId(),
    role: isArtist ? "artist" : "user",
  };

  return User.create(newUser);
};

exports.loginUser = async (loginInput) => {
  const { email, password } = loginInput;

  // Check required fields
  if (!email || !password) {
    throw new AppError("Please provide email and password", 422);
  }

  const user = await User.findOne({ email }).select("id name password");

  // Check if the user exists
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return { id: user.id, name: user.name, img: user.img };
};

exports.refreshTokens = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("No refresh token provided", 401, "AuthReset");
  }

  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (e) {
    throw new AppError("Refresh token is invalid or expired", 401, "AuthReset");
  }

  const userRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
    userId: decodedRefreshToken.userId,
  });
  if (!userRefreshToken) {
    throw new AppError("Refresh token is invalid or expired", 401, "AuthReset");
  }

  // INFO: this logs out the user from all their devices
  await RefreshToken.deleteMany({ userId: decodedRefreshToken.userId });

  return decodedRefreshToken.userId;
};

exports.logoutUser = async (userId, accessToken) => {
  await RefreshToken.deleteMany({ userId });

  await InvalidAccessToken.create({
    token: accessToken.token,
    userId,
    expiresAt: new Date(accessToken.exp),
  });
};
