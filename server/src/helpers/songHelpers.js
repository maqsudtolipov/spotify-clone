const Song = require("../models/songModel");
const AppError = require("../utils/AppError");
const Playlist = require("../models/playlistModel");

exports.addOrRemoveSongFromPlaylist = async (
  songId,
  playlistId,
  userId,
  action,
) => {
  const isAdding = action === "add";
  const updateOperator = isAdding ? "$addToSet" : "$pull";

  const song = await Song.findById(songId);
  if (!song) {
    throw new AppError("Song not found", 404);
  }

  const playlist = await Playlist.findOne({
    _id: playlistId,
    isDeleted: false,
    songs: isAdding
      ? {
          $ne: songId,
        }
      : songId,
  }).select("+isLikedSongs");
  if (!playlist || String(playlist.user) !== userId) {
    throw new AppError("Playlist not found", 404);
  }

  if (playlist.isLikedSongs) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  await Playlist.findByIdAndUpdate(playlistId, {
    [updateOperator]: { songs: song.id },
    $inc: {
      duration: isAdding ? +song.duration : -song.duration,
      length: isAdding ? +1 : -1,
    },
  });
};
