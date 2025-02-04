const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const uploadFiles = require("../utils/uploadFiles");

exports.getAllUsers = async () => {
  return await User.find({}, "id name email role");
};

exports.getUserById = async (userInput) => {
  const user = await User.findById(
    userInput.userId,
    "id name img color followers followersCount followings followingsCount",
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }
};

exports.getCurrentUser = async (userInput) => {
  const user = await User.findById(
    userInput.userId,
    "id name email img followers followersCount followings followingsCount",
  )
    .populate([
      {
        path: "library",
        select: "items",
        populate: [
          {
            path: "items.refId",
            select: "name img user createdAt",
            populate: [
              {path: "user", select: "name", strictPopulate: false},
              {path: "img", select: "url"},
            ],
          },
        ],
      },
      {
        path: "likedSongs",
      },
    ])
    .lean();
  // NOTE: virtual does not work with lean()
  user.id = user._id;

  // Filter library items
  user.library.items = user.library.items.map((item) => ({
    id: item.refId._id,
    name: item.refId.name,
    user: item.itemType === "playlist" ? item.refId.user.name : undefined,
    img: item.refId.img.url,
    isPinned: item.isPinned,
    itemType: item.itemType,
    createdAt: item.refId.createdAt,
  }));

  return user;
};

exports.updateCurrentUser = async (userInput) => {
  const user = await User.findById(userInput.userId).populate(
    "img",
    "id fileId url",
  );

  const updatedUserData = {};

  if (userInput.name) {
    updatedUserData.name = userInput.name;
  }

  if (userInput.file) {
    const imgFile = await uploadFiles(
      {
        file: userInput.img.file,
        fileName: userInput.img.fileName,
        folder: "users/",
      },
      user.img.isDefault,
      user.img.fileId,
      user.img.id,
    );
    updatedUserData.img = imgFile.id;
  }

  return await User.findByIdAndUpdate(
    userInput.userId,
    updatedUserData,
    {
      new: true,
      runValidators: true,
    },
  );
};

