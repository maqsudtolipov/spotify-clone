const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const uploadFiles = require("../utils/uploadFiles");
const filterLibraryItems = require("../utils/filterLibraryItems");
const userHelpers = require("../helpers/userHelpers");

exports.getAllUsers = async () => {
  return await User.find({}, "id name email role");
};

exports.getUserById = async (userInput) => {
  const user = await User.findById(
    userInput.userId,
    "id name img color followers followersCount followings followingsCount",
  ).populate([{path: "img", select: "id url"}]);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

exports.getCurrentUser = async (userInput) => {
  const user = await User.findById(
    userInput.userId,
    "id name email img followers followersCount followings followingsCount likedPlaylists",
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
      {path: "playlists", select: "name"},
    ])
    .lean();
  // NOTE: virtual does not work with lean()
  user.id = user._id;

  // Filter library items
  user.library.items = filterLibraryItems(user.library.items);

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

  return await User.findByIdAndUpdate(userInput.userId, updatedUserData, {
    new: true,
    runValidators: true,
  });
};

exports.handleFollowUnfollow = async (followInput, action) => {
  const currentUser = await User.findById(followInput.userId);
  const candidateUser = await User.findById(followInput.candidateUserId).select(
    "role",
  );

  if (!currentUser || !candidateUser) {
    throw new AppError("User not found", 400);
  }

  if (currentUser.id === candidateUser.id) {
    throw new AppError("User cannot follow himself", 400);
  }

  const {updatedUser, updatedCandidate} =
    await userHelpers.updateFollowStatus(currentUser, candidateUser, action);

  let library;
  if (candidateUser.role === "artist") {
    library = await userHelpers.updateLibrary(
      followInput.userLibraryId,
      candidateUser.id,
      action,
    );
  }

  return {
    followings: updatedUser.followings,
    candidateFollowersCount: updatedCandidate.followersCount,
    library,
  };
};
