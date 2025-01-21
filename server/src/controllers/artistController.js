const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getArtistById = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.params.id,
      "id name img role color followersCount",
    ).populate("songs", "id name artist song img plays duration");

    if (!user || user.role !== "artist") {
      return next(new AppError("Artist not found", 404));
    }

    res.status(200).json({ status: "success", artist: user });
  } catch (e) {
    if (e.name === "CastError") {
      return next(new AppError(`Invalid artist id: ${e.value}`, 400));
    }

    next(e);
  }
};
