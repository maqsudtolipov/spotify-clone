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
  ).populate([{ path: "img", select: "id url" }]);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

exports.getCurrentUser = async (userInput) => {
  const user = await User.findById(
    userInput.userId,
    "id name email img role followers followersCount followings followingsCount likedPlaylists",
  )
    .populate([
      {
        path: "library",
        select: "items",
        populate: [
          {
            path: "items.refId",
            match: { isDeleted: false },
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
        match: { isDeleted: false },
      },
      { path: "playlists", match: { isDeleted: false }, select: "name" },
      { path: "img", select: "url" },
    ])
    .lean();
  // NOTE: virtual does not work with lean()
  user.id = user._id;

  // TODO: Quick fix, one user is broken
  const filterItems = user.library.items.filter((item) => item.refId);

  // Filter library items
  user.library.items = filterLibraryItems(filterItems);

  return user;
};

exports.updateCurrentUser = async (userInput) => {
  const user = await User.findById(userInput.userId).populate(
    "img",
    "id fileId isDefault",
  );

  const updatedUserData = {};

  if (userInput.name) {
    updatedUserData.name = userInput.name;
  }

  if (userInput.img) {
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

  return User.findByIdAndUpdate(userInput.userId, updatedUserData, {
    new: true,
    runValidators: true,
  })
    .select("name")
    .populate("img", "url");
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

  const updatedCandidate = await userHelpers.updateFollowStatus(
    currentUser,
    candidateUser,
    action,
  );

  if (candidateUser.role === "artist") {
    await userHelpers.updateLibrary(
      followInput.userLibraryId,
      candidateUser.id,
      action,
    );
  }

  return {
    candidateUser: {
      id: updatedCandidate.id,
      name: updatedCandidate.name,
      img: updatedCandidate.img.url,
      itemType: "artist",
      createdAt: updatedCandidate.createdAt,
    },
  };
};
