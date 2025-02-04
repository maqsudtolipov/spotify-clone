const AppError = require("../utils/AppError");
const User = require("../models/userModel");
const Library = require("../models/libraryModel");
const filterLibraryItems = require("../utils/filterLibraryItems");

const updateFollowStatus = async (currentUser, candidateUser, action) => {
  const isFollowing = action === "follow";
  const updateOperator = isFollowing ? "$addToSet" : "$pull";
  const countModifier = isFollowing ? +1 : -1;

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: currentUser._id,
      followings: isFollowing ? {$ne: candidateUser.id} : candidateUser.id,
    },
    {
      [updateOperator]: {followings: candidateUser.id},
      $inc: {followingsCount: countModifier},
    },
    {new: true},
  );

  if (!updatedUser && isFollowing) {
    throw new AppError("User already following", 400);
  } else if (!updatedUser) {
    throw new AppError("User not following", 400);
  }

  const updatedCandidate = await User.findOneAndUpdate(
    {
      _id: candidateUser.id,
      followers: isFollowing ? {$ne: currentUser.id} : currentUser.id,
    },
    {
      [updateOperator]: {followers: currentUser.id},
      $inc: {followersCount: countModifier},
    },
    {new: true},
  );

  return {updatedUser, updatedCandidate};
};

exports.updateLibrary = async (userLibraryId, candidateUserId, action) => {
  const updateOperator = action === "follow" ? "$addToSet" : "$pull";
  let library = await Library.findByIdAndUpdate(
    userLibraryId,
    {
      [updateOperator]: {
        items: {refId: candidateUserId, itemType: "artist"},
      },
    },
    {new: true},
  )
    .populate([
      {
        path: "items.refId",
        select: "name img user createdAt",
        populate: [
          {path: "user", select: "name", strictPopulate: false},
          {path: "img", select: "url"},
        ],
      },
    ])
    .lean();

  if (library) {
    library.id = library._id;
    library.items = filterLibraryItems(library.items);
  }

  return library;
};

exports.updateFollowStatus = updateFollowStatus;
