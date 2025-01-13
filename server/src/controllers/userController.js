const User = require("../models/userModel");
const imagekit = require("../utils/ImageKit");
const AppError = require("../utils/AppError");

exports.getAll = async (req, res, next) => {
  try {
    const users = await User.find({}, "id name email role");

    res.status(200).json({ status: "success", users });
  } catch (e) {
    next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id,
      "id name email img followers followersCount followings followingsCount",
    );

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.status(200).json({ status: "success", user });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid user id: ${e.value}`, 400));
    }

    next(e);
  }
};

exports.current = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.user.id,
      "id name email img followers followersCount followings followingsCount",
    );

    res.status(200).json({ status: "success", user });
  } catch (e) {
    next(e);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    const inputData = {
      name: req.body.name,
    };

    if (req.file) {
      const imgKit = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.filename,
        folder: "users/",
      });
      inputData.img = imgKit.url;
    }

    const newUser = await User.findByIdAndUpdate(req.user.id, inputData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      user: newUser,
    });
  } catch (e) {
    next(e);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    // Check users exist
    const currentUser = await User.findById(req.user.id);
    const candidateUser = await User.findById(req.params.id);

    if (!currentUser || !candidateUser) {
      return next(new AppError("User not found", 400));
    }

    // Check user is not following himself
    if (currentUser.id === candidateUser.id) {
      return next(new AppError("User cannot follow himself", 400));
    }

    const newUser = await User.findOneAndUpdate(
      { _id: currentUser.id, followings: { $ne: candidateUser.id } },
      {
        $push: { followings: candidateUser.id },
        $inc: { followingsCount: 1 },
      },
    );

    await User.findOneAndUpdate(
      { _id: candidateUser.id, followers: { $ne: currentUser.id } },
      {
        $push: { followers: currentUser.id },
        $inc: { followersCount: 1 },
      },
    );

    if (!newUser) {
      return next(new AppError("User already following", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        followings: newUser.followings,
        followingsCount: newUser.followingsCount,
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
    const candidateUser = await User.findById(req.params.id);

    if (!currentUser || !candidateUser) {
      return next(new AppError("User not found", 400));
    }

    // Check user is not unfollowing himself
    if (currentUser.id === candidateUser.id) {
      return next(new AppError("User cannot unfollow himself", 400));
    }

    const newUser = await User.findOneAndUpdate(
      { _id: currentUser.id, followings: candidateUser.id },
      {
        $pull: { followings: candidateUser.id },
        $inc: { followingsCount: -1 },
      },
      {
        new: true,
      },
    );

    await User.findOneAndUpdate(
      { _id: candidateUser.id, followers: currentUser.id },
      {
        $pull: { followers: currentUser.id },
        $inc: { followersCount: -1 },
      },
    );

    if (!newUser) {
      return next(new AppError("User already following", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        followings: newUser.followings,
        followingsCount: newUser.followingsCount,
      },
    });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid user id: ${e.value}`, 400));
    }

    next(e);
  }
};
