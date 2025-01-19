const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getArtistById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, "id name img role");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    console.log(user);

    res.status(200).json({ status: "success", user });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid user id: ${e.value}`, 400));
    }

    next(e);
  }
};
