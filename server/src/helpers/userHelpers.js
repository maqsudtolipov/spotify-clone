const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const Library = require("../models/libraryModel");

const updateFollowStatus = async (currentUser, candidateUser, action) => {
  const isFollowing = action === "follow";
  const updateOperator = isFollowing ? "$addToSet" : "$pull";
  const countModifier = isFollowing ? +1 : -1;

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: currentUser._id,
      followings: isFollowing ? { $ne: candidateUser.id } : candidateUser.id,
    },
    {
      [updateOperator]: { followings: candidateUser.id },
      $inc: { followingsCount: countModifier },
    },
    { new: true },
  );

  if (!updatedUser && isFollowing) {
    throw new AppError("User already following", 400);
  } else if (!updatedUser) {
    throw new AppError("User not following", 400);
  }

  return User.findOneAndUpdate(
    {
      _id: candidateUser.id,
      followers: isFollowing ? { $ne: currentUser.id } : currentUser.id,
    },
    {
      [updateOperator]: { followers: currentUser.id },
      $inc: { followersCount: countModifier },
    },
    { new: true },
  ).populate("img", "url");
};

exports.updateLibrary = async (userLibraryId, candidateUserId, action) => {
  const updateOperator = action === "follow" ? "$addToSet" : "$pull";
  await Library.findByIdAndUpdate(userLibraryId, {
    [updateOperator]: {
      items: { refId: candidateUserId, itemType: "artist" },
    },
  });
};

exports.updateFollowStatus = updateFollowStatus;
