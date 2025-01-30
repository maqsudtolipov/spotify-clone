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
const { getCache, setCache } = require("../services/cacheService");
const File = require("../models/fileModel");

const getDefaultUserImgId = async () => {
  let cachedImgId = getCache("defaultUserImgId");
  if (cachedImgId) return cachedImgId;

  let defaultFile = await File.findOne({ fileId: "user" });

  if (!defaultFile) {
    defaultFile = await File.create({
      fileId: "user",
      name: "defaultUser.jpeg",
      size: 0,
      filePath: "spotify/users/defaultUser.jpeg",
      url: "https://ik.imagekit.io/8cs4gpobr/spotify/users/defaultUser.jpeg",
      isDefault: true,
    });

    setCache("defaultUserImgId", defaultFile.id);
  }

  return defaultFile.id;
};

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

    // Set default img
    userData.img = await getDefaultUserImgId();

    const newUser = await User.create(userData);

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
    // Validate email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 422));
    }

    // Check if the user exists
    const user = await User.findOne(
      { email },
      "id name img password likedSongs",
    ).populate({
      path: "library",
      select: "items",
      populate: {
        path: "items.refId",
        select: "name img user createdAt",
        populate: {
          path: "user",
          select: "name",
        },
        populate: {
          path: "img",
          select: "url",
        },
      },
    });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid email or password", 401));
    }

    // Generate access and refresh tokens
    attachAccessCookie(user.id, res);
    const refreshToken = attachRefreshCookie(user.id, res);

    // Save refresh token to the database
    await RefreshToken.create({
      userId: user.id,
      token: refreshToken,
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

    // Check if the refresh token provided
    if (!refreshToken) {
      return next(new AppError("No refresh token provided", 401));
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
      return next(new AppError("Refresh token is invalid or expired", 401));
    }

    // INFO: this logs out the user from all their devices
    // Delete current refresh token from the database
    await RefreshToken.deleteMany({ userId: decodedRefreshToken.userId });

    // Generate access and refresh tokens
    attachAccessCookie(decodedRefreshToken.userId, res);
    const newRefreshToken = attachRefreshCookie(
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
      return next(new AppError("Refresh token is invalid or expired", 401));
    }

    next(e);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await RefreshToken.deleteMany({ userId: req.user.id });
    await InvalidAccessToken.create({
      token: req.accessToken.token,
      userId: req.user.id,
      expiresAt: new Date(req.accessToken.exp),
    });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
