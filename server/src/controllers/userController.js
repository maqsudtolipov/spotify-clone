const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const Library = require("../models/libraryModel");
const userService = require("../services/userService");
const filterLibraryItems = require("../utils/filterLibraryItems");
const userHelpers = require("../helpers/userHelpers");

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

exports.followUser = async (req, res, next) => {
  try {
    const followInput = {
      userId: req.user.id,
      userLibraryId: req.user.library,
      candidateUserId: req.params.id,
    };
    const data = userService.handleFollowUnfollow(followInput, "follow");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    next(e);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const followInput = {
      userId: req.user.id,
      userLibraryId: req.user.library,
      candidateUserId: req.params.id,
    };
    const data = userService.handleFollowUnfollow(followInput, "unfollow");

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (e) {
    next(e);
  }
};
