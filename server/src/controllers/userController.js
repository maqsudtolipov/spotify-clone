const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const Library = require("../models/libraryModel");
const userService = require("../services/userService");
const filterLibraryItems = require("../utils/filterLibraryItems");

exports.getAll = async (req, res, next) => {
  try {
    const users = userService.getAllUsers();

    res.status(200).json({status: "success", users});
  } catch (e) {
    next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  const userInput = {
    userId: req.params?.id,
  };
  try {
    const user = userService.getUserById(userInput);

    res.status(200).json({status: "success", user});
  } catch (e) {
    next(e);
  }
};

exports.current = async (req, res, next) => {
  try {
    const userInput = {
      userId: req.params?.id,
    };
    const user = userService.getCurrentUser(userInput);

    res.status(200).json({status: "success", user});
  } catch (e) {
    next(e);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const userInput = {
      userId: req.params?.id,
      name: req.body?.name,
      img: req.file
        ? {
          file: req.file.buffer,
          fileName: req.file.filename,
        }
        : undefined,
    };
    const user = userService.updateCurrentUser(userInput);

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (e) {
    next(e);
  }
};

// FIXME: refactor
exports.followUser = async (req, res, next) => {
  try {
    // Check users exist
    const currentUser = await User.findById(req.user.id);
    const candidateUser = await User.findById(req.params.id).select("role");

    if (!currentUser || !candidateUser) {
      return next(new AppError("User not found", 400));
    }

    if (currentUser.id === candidateUser.id) {
      return next(new AppError("User cannot follow himself", 400));
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: currentUser.id, followings: {$ne: candidateUser.id}},
      {
        $addToSet: {followings: candidateUser.id},
        $inc: {followingsCount: 1},
      },
      {
        new: true,
      },
    );

    let library;
    if (candidateUser.role === "artist") {
      library = await Library.findByIdAndUpdate(
        req.user.library,
        {
          $addToSet: {
            items: {
              refId: candidateUser.id,
              itemType: "artist",
            },
          },
        },
        {
          new: true,
        },
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
      library.id = library._id;

      library.items = filterLibraryItems(library.items);
    }

    if (!updatedUser) {
      return next(new AppError("User already following", 400));
    }

    const updatedCandidate = await User.findOneAndUpdate(
      {_id: candidateUser.id, followers: {$ne: currentUser.id}},
      {
        $addToSet: {followers: currentUser.id},
        $inc: {followersCount: 1},
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        followings: updatedUser.followings,
        candidateFollowersCount: updatedCandidate.followersCount,
        library,
      },
    });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid user id: ${e.value}`, 400));
    }

    next(e);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    // Check both inputs
    const currentUser = await User.findById(req.user.id);
    const candidateUser = await User.findById(req.params.id).select("role");

    if (!currentUser || !candidateUser) {
      return next(new AppError("User not found", 400));
    }

    // Check user is not unfollowing himself
    if (currentUser.id === candidateUser.id) {
      return next(new AppError("User cannot unfollow himself", 400));
    }

    const updatedUser = await User.findOneAndUpdate(
      {_id: currentUser.id, followings: candidateUser.id},
      {
        $pull: {followings: candidateUser.id},
        $inc: {followingsCount: -1},
      },
      {
        new: true,
      },
    );

    let library;
    if (candidateUser.role === "artist") {
      library = await Library.findByIdAndUpdate(
        req.user.library,
        {
          $pull: {
            items: {
              refId: candidateUser.id,
              itemType: "artist",
            },
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
      library.id = library._id;

      library.items = filterLibraryItems(library.items);
    }

    const updatedCandidate = await User.findOneAndUpdate(
      {_id: candidateUser.id, followers: currentUser.id},
      {
        $pull: {followers: currentUser.id},
        $inc: {followersCount: -1},
      },
      {
        new: true,
      },
    );

    if (!updatedUser) {
      return next(new AppError("User not following", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        followings: updatedUser.followings,
        candidateFollowersCount: updatedCandidate.followersCount,
        library,
      },
    });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid user id: ${e.value}`, 400));
    }

    next(e);
  }
};
