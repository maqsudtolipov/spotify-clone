const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const {
  attachAccessCookie,
  attachRefreshCookie,
} = require("../utils/attachCookieTokens");
const RefreshToken = require("../models/refreshTokenModel");

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

exports.login = async (req, res, next) => {
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
