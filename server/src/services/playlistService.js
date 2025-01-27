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

  if (String(playlist.user) !== playlistInput.userId) {
    throw new AppError("You don't have permission to perform this action", 403);
  }

  console.log(playlistInput)

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistInput.playlistId,
    {
      name: playlistInput.name,
      description: playlistInput.description,
      isPublic: playlistInput.isPublic,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedPlaylist;
};
