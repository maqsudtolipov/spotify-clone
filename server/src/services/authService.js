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
const filterLibraryItems = require("../utils/filterLibraryItems");

exports.signUp = async (signUpInput) => {
  const { name, email, password, passwordConfirm, isArtist } = signUpInput;

  // Check required fields
  if (!email || !name || !password || !passwordConfirm) {
    throw new AppError(
      "Please provide name, email, password and passwordConfirm",
      422,
    );
  }

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

exports.login = async (loginInput, res) => {
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

  // Generate and attach tokens
  attachAccessCookie(user.id, res);
  const refreshToken = attachRefreshCookie(user.id, res);
  await RefreshToken.create({ userId: user.id, token: refreshToken });

  return { id: user.id, name: user.name, img: user.img };
};

// Old login - too much client dependant
exports.loginOld = async (email, password, res) => {
  // Find user and populate fields
  const user = await User.findOne(
    { email },
    "id name img password likedPlaylists",
  ).populate([
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
    { path: "likedSongs" },
    { path: "playlists", select: "name" },
  ]);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  // Generate access and refresh tokens
  attachAccessCookie(user.id, res);
  const refreshToken = attachRefreshCookie(user.id, res);

  // Save refresh token to the database
  await RefreshToken.create({ userId: user.id, token: refreshToken });

  const userObject = user.toObject();
  userObject.library.items = filterLibraryItems(user.library.items);

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
