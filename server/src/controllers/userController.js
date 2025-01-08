const User = require("../models/userModel");

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
    const user = await User.findById(req.user.id, "id name email");

    res.status(200).json({ status: "success", user });
  } catch (e) {
    next(e);
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'You git update me route'
    })
  } catch (e) {
    next(e);
  }
};
