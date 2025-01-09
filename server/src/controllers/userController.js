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

exports.current = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, "id name email img");

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

// Follows
// - check inputs
//   - check both ids provided
//   - prevent duplicate followers
//   - prevent duplicate followings
//   - prevent user following himself

exports.followUser = async (req, res, next) => {
  try {
    console.log(req.user, req.params);

    // Check both inputs
    const currentUser = await User.findById(req.user.id);
    const candidateUser = await User.findById(req.params.id);

    if (!currentUser || !candidateUser) {
      return next(new AppError("Please provide user id", 400));
    }

    // Check user is not following himself
    if (currentUser.id === candidateUser.id) {
      return next(new AppError("User cannot follow himself", 400));
    }

    // Add candidate id to cur users followings list
    if (!currentUser.followings.includes(candidateUser.id)) {
      currentUser.followings.push(candidateUser.id);
      await currentUser.save();
    }

    // Add cur user id to candidate's follower list
    if (!candidateUser.followers.includes(currentUser.id)) {
      candidateUser.followers.push(currentUser.id);
      await candidateUser.save();
    }

    res.status(200).json({ status: "success" });
  } catch (e) {
    next(e);
  }
};
