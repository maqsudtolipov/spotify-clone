const Playlist = require("../models/playlistModel");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.createPlaylist = async (playlistInput) => {
  // Create a new playlist
  const newPlaylist = await Playlist.create({
    name: playlistInput.name,
    img: playlistInput.img,
    user: playlistInput.userId,
  });

  // Attach playlist id to user playlists
  await User.findByIdAndUpdate(
    playlistInput.userId,
    {
      $addToSet: {
        playlists: newPlaylist.id,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  // TODO: Add playlists to user's library

  return newPlaylist;
};

exports.updatePlaylist = async (playlistInput) => {
  const playlist = await Playlist.findById(playlistInput.playlistId);

  if (!playlist) {
    throw new AppError("Playlist not found", 404);
  }
};
