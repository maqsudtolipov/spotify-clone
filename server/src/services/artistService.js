const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.getArtistById = async (artistInput) => {
  const user = await User.findById(
    artistInput.artistId,
    "id name img role color followersCount createdAt",
  ).populate([
    {
      path: "img",
      select: "url",
    },
    {
      path: "songs",
      select: "id name artist plays duration",
      populate: { path: "song img", select: "url" },
    },
  ]);

  if (!user || user.role !== "artist") {
    throw new AppError("Artist not found", 404);
  }

  return user;
};
