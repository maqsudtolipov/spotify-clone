const User = require("../models/userModel");

exports.current = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, "id name email");

    res.status(200).json({ status: "success", user });
  } catch (e) {
    next(e);
  }
};
