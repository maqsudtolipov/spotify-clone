const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../utils/attachCookieTokens");
const RefreshToken = require("../models/refreshTokenModel");
const InvalidAccessToken = require("../models/invalidAccessTokenModel");

exports.signUp = async (signUpInput) => {
  // Check if the user already exists
  const existingUser = await User.findOne({ email: signUpInput.email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const userInput = {
    ...signUpInput,
    img: await User.getDefaultUserImgId(),
  };

  return User.create(userInput);
};

exports.login = async (email, password, res) => {
  // Find user and populate fields
  const user = await User.findOne({ email }, "id name img password").populate([
    {
      path: "library",
      select: "items",
      populate: [
        {
          path: "items.refId",
          select: "name img user createdAt",
          populate: [
            { path: "user", select: "name", strictPopulate: false },
            { path: "img", select: "url" },
          ],
        },
      ],
    },
    {
      path: "likedSongs",
    },
  ]);

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid email or password", 401));
  }

  // Generate access and refresh tokens
  attachAccessCookie(user.id, res);
  const refreshToken = attachRefreshCookie(user.id, res);

  // Save refresh token to the database
  await RefreshToken.create({ userId: user.id, token: refreshToken });

  const userObject = user.toObject();
  userObject.library.items = userObject.library.items.map((item) => ({
    id: item.refId._id,
    name: item.refId.name,
    user: item.itemType === "playlist" ? item.refId.user.name : undefined,
    img: item.refId.img.url,
    isPinned: item.isPinned,
    itemType: item.itemType,
    createdAt: item.refId.createdAt,
  }));

  return userObject;
};

exports.refreshToken = async (refreshToken, res) => {
  let decodedRefreshToken;

  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );
  } catch (e) {
    throw new AppError("Refresh token is invalid or expired", 401);
  }

  const userRefreshToken = await RefreshToken.findOne({
    token: refreshToken,
    userId: decodedRefreshToken.userId,
  });

  if (!userRefreshToken) {
    throw new AppError("Refresh token is invalid or expired", 401);
  }

  // INFO: this logs out the user from all their devices
  await RefreshToken.deleteMany({ userId: decodedRefreshToken.userId });

  // Generate new tokens
  attachAccessCookie(decodedRefreshToken.userId, res);
  const newRefreshToken = attachRefreshCookie(decodedRefreshToken.userId, res);

  // Save new refresh token to the database
  await RefreshToken.create({
    userId: decodedRefreshToken.userId,
    token: newRefreshToken,
  });
};

exports.logout = async (userId, accessToken) => {
  await RefreshToken.deleteMany({ userId });

  await InvalidAccessToken.create({
    token: accessToken.token,
    userId,
    expiresAt: new Date(accessToken.exp),
  });
};
